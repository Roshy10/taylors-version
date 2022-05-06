const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS({apiVersion: "2012-11-05"});
const topic = "updates";

const subscriptionTableName = process.env["SUBSCRIPTION_TABLE_NAME"];
const notificationTableName = process.env["NOTIFICATION_TABLE_NAME"];
const dispatchQueueUrl = process.env["DISPATCH_QUEUE_URL"];

const getSubscriptions = async () => {
    const params = {
        ExpressionAttributeValues: {":topic": topic},
        KeyConditionExpression: "topic = :topic",
        ProjectionExpression: "webPush",
        FilterExpression: "attribute_exists(webPush)",
        TableName: subscriptionTableName,
    };

    return new Promise((ok, err) => {
        dynamodb.query(params, function(e, data) {
            if (e) err(e);
            else ok(data);
        });
    });
};

const logNotification = async (messageId, subscriptionCount, messageDetails) => {
    const params = {
        TableName: notificationTableName,
        Item: {
            messageId,
            eventType: "queue",
            subscriptionCount,
            messageDetails,
        },
    };

    return await dynamodb.put(params).promise();
};

const queueNotification = (subscription, notificationData) => {
    const params = {
        QueueUrl: dispatchQueueUrl,
        MessageBody: JSON.stringify({
            subscription,
            notificationData,
        }),
    };
    return new Promise((resolve, reject) => {
        sqs.sendMessage(params, function(err, data) {
            if (err) {
                console.log("Queue Error", err);
                reject(err);
            } else {
                console.log("Queue Success", data.MessageId);
                resolve(data);
            }
        });
    });
};

exports.handler = async (event) => {
    const snsRecord = event.Records[0].Sns;
    const {title, text} = JSON.parse(snsRecord.Message);
    const snsId = snsRecord.MessageId;
    const {Items} = await getSubscriptions();
    await logNotification(snsId, Items.length, snsRecord);

    const promises = [];
    Items.forEach(d => {
        const subscription = JSON.parse(d.webPush);
        const result = queueNotification(subscription, {title, text, snsId});
        promises.push(result);
    });
    await Promise.all(promises);
};