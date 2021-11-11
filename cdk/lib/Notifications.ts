#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as path from 'path';

/**
 * Notifications backend
 *
 * receives requests to be signed up for notifications and saves them in a database
 */
class Notifications extends cdk.Construct {
    apiDomain: string;

    constructor(parent: cdk.Construct, name: string) {
        super(parent, name);

        // Notification Database
        const subscriptionTable = new dynamodb.Table(this, 'SubscriptionTable', {
            partitionKey: {name: 'topic', type: dynamodb.AttributeType.STRING},
            sortKey: {name: "endpoint", type: dynamodb.AttributeType.STRING},
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            pointInTimeRecovery: true,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
        });

        // sns to create notifications
        const notificationTopic = new sns.Topic(this, "NotificationTopic");

        // lambda to send notifications
        const notificationDispatcher = new lambda.Function(this, 'NotificationDispatcher', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambda/notification-dispatcher')),
            environment: {
                "SUBSCRIPTION_TABLE_NAME": subscriptionTable.tableName,
                "VAPID_SUBJECT": process.env.VAPID_SUBJECT || "",
                "VAPID_PUBLIC_KEY": process.env.VAPID_PUBLIC_KEY || "",
                "VAPID_PRIVATE_KEY": process.env.VAPID_PRIVATE_KEY || "",
            }
        });
        subscriptionTable.grantReadData(notificationDispatcher)
        notificationTopic.addSubscription(new subs.LambdaSubscription(notificationDispatcher))

        // lambda to save incoming subscriptions
        const subscriptionHandler = new lambda.Function(this, 'SubscriptionHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambda/notification-subscription-handler')),
            environment: {"SUBSCRIPTION_TABLE_NAME": subscriptionTable.tableName}
        });
        subscriptionTable.grantWriteData(subscriptionHandler)

        const api = new apigateway.LambdaRestApi(this, 'NotificationsApi', {
            handler: subscriptionHandler,
            proxy: false
        });
        const notificationApi = api.root.addResource('notifications');
        const subscribeApi = notificationApi.addResource('subscribe');
        subscribeApi.addMethod('POST'); // POST /notifications/subscribe
        subscribeApi.addMethod('PUT'); // PUT /notifications/subscribe
        subscribeApi.addMethod('DELETE'); // DELETE /notifications/subscribe


        // isolate the API gateway domain name and return it
        const apiEndPointUrlWithoutProtocol = cdk.Fn.select(1, cdk.Fn.split("://", api.url));
        const apiDomain = cdk.Fn.select(0, cdk.Fn.split("/", apiEndPointUrlWithoutProtocol));
        new cdk.CfnOutput(this, 'ApiDomain', {value: apiDomain});
        this.apiDomain = apiDomain;
    }
}

export default Notifications;