const webpush = require("web-push");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

const topic = "updates";

webpush.setVapidDetails(
    process.env["VAPID_SUBJECT"],
    process.env["VAPID_PUBLIC_KEY"],
    process.env["VAPID_PRIVATE_KEY"],
);

const tableName = process.env["SUBSCRIPTION_TABLE_NAME"];

const getSubscriptions = async () => {
    const params = {
        ExpressionAttributeValues: {":topic": {S: topic}},
        KeyConditionExpression: "topic = :topic",
        ProjectionExpression: "webPush",
        FilterExpression: "attribute_exists(webPush)",
        TableName: tableName,
    };

    return new Promise((ok, err) => {
        dynamodb.query(params, function(e, data) {
            if (e) err(e);
            else ok(data);
        });
    });
};

exports.handler = async (event) => {
    const snsRecord = event.Records[0].Sns;
    const {title, text} = JSON.parse(snsRecord.Message);
    const snsId = snsRecord.MessageId;
    const {Items} = await getSubscriptions();
    const promises = [];
    Items.forEach(d => {
        const subscription = JSON.parse(d.webPush.S);
        const result = webpush.sendNotification(subscription, JSON.stringify({title, text, snsId}));
        promises.push(result);
    });

    await Promise.all(promises);
    const result = promises.reduce((total, value) => {
        const response = value.statusCode;
        total[response] = (total[response] || 0) + 1;
        return total;
    }, {});
    console.log(result);

    // TODO add functionality to delete on 410
};