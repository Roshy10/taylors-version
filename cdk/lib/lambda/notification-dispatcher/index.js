const webpush = require("web-push");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const topic = "updates";

webpush.setVapidDetails(
    process.env["VAPID_SUBJECT"],
    process.env["VAPID_PUBLIC_KEY"],
    process.env["VAPID_PRIVATE_KEY"],
);

const expiredResponseCodes = ["404", "410"];

const subscriptionTableName = process.env["SUBSCRIPTION_TABLE_NAME"];

const deleteSubscription = async (endpoint) => {
    console.info("deleting expired subscription from database", endpoint);
    return await dynamodb
        .delete({
            TableName: subscriptionTableName,
            Key: {
                topic,
                endpoint,
            },
        })
        .promise();
};
const handleFailures = (failures) => failures.map(deleteSubscription);

exports.handler = async (event) => {
    const messages = event.Records;
    const promises = [];
    const responses = [];

    const handlePushSuccess = (messageIndex) => (result) => {
        const notificationId = JSON.parse(messages[messageIndex].body)?.notificationData.snsId;
        const statusCode = result.statusCode;
        // log result into cloudwatch
        console.info({notificationId, statusCode});
        responses[messageIndex] = result;
    };

    messages.forEach((d, messageIndex) => {
        const message = JSON.parse(d.body);
        const resultPromise = webpush.sendNotification(message.subscription, JSON.stringify(message.notificationData));
        resultPromise
            .then(handlePushSuccess(messageIndex))
            .catch(handlePushSuccess(messageIndex));
        promises.push(resultPromise);
    });
    await Promise.allSettled(promises);

    const enrichedResponses = responses
        .map((result, index) => {
            const messageBody = JSON.parse(messages[index].body);
            return {
                responseCode: result.statusCode.toString(),
                subscription: messageBody.subscription,
                snsId: messageBody.notificationData.snsId,
            };
        });

    // notifications which we know are no longer valid
    const expiredSubscriptions = enrichedResponses
        .filter((messageInfo) => expiredResponseCodes.includes(messageInfo.responseCode))
        .map((messageInfo) => messageInfo.subscription.endpoint);
    // unsubscribe expired subscriptions
    const expirationPromises = handleFailures(expiredSubscriptions);

    // notifications which failed for an unknown reason
    const failures = enrichedResponses
        .filter((messageInfo) => messageInfo.responseCode > "299" && !expiredResponseCodes.includes(messageInfo.responseCode))
        .map((message) => ({itemIdentifier: message.itemIdentifier}));

    // make sure database transactions are complete and successful
    await Promise.all(expirationPromises);

    // for messages which failed to send we should add them to the queue again and retry
    return {batchItemFailures: failures};
};