const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = process.env.SUBSCRIPTION_TABLE_NAME;
const topic = "updates";

const getEndpoint = (data) => (JSON.parse(data.webPush) && JSON.parse(data.webPush).endpoint) || null;

const insertSubscription = async (data) => {
    const endpoint = getEndpoint(data);
    return await dynamodb
        .put({
            TableName: tableName,
            Item: {
                topic,
                endpoint,
                webPush: data.webPush,
            },
        })
        .promise();
};

const deleteSubscription = async (endpoint) =>
    await dynamodb
        .delete({
            TableName: tableName,
            Key: {
                topic,
                endpoint,
            },
        })
        .promise();

exports.handler = async (event) => {
    const body = {};
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    switch (event.resource) {
        case "/notifications/subscribe":
            const data = JSON.parse(event.body);
            switch (event.requestContext.httpMethod) {
                case "POST":
                    if (!data.webPush) {
                        statusCode = 400;
                        body.message = `invalid parameters`;
                        break;
                    }

                    await insertSubscription(data);
                    body.message = `Subscription to ${topic} saved`;
                    break;

                case "PUT":
                    if (!data.webPush) {
                        statusCode = 400;
                        body.message = `invalid parameters`;
                        break;
                    }

                    await insertSubscription(data);
                    if (data.oldEndpoint) {
                        await deleteSubscription(data.oldEndpoint);
                    }

                    body.message = `Subscription to ${topic} updated`;
                    break;

                case "DELETE":
                    if (!data.webPush) {
                        statusCode = 400;
                        body.message = `invalid parameters`;
                        break;
                    }

                    const endpoint = getEndpoint(data);
                    await deleteSubscription(endpoint);
                    body.message = `Subscription to ${topic} deleted`;
                    break;
            }
            break;
        default:
            statusCode = 404;
            body.message = `Unsupported route or method`;
    }

    return {
        statusCode,
        body: JSON.stringify(body),
        headers,
    };
};