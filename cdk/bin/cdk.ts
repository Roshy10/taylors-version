#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import StaticDeployment from "../lib/StaticDeployment";
import Notifications from "../lib/Notifications";
import * as cloudfront from "@aws-cdk/aws-cloudfront";

/**
 * This stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "subdomain": "www"
 *   }
 * }
 **/
class TaylorsVersionSiteStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
        super(parent, name, props);

        const domainName = this.node.tryGetContext('domain');
        const siteSubDomain = this.node.tryGetContext('subdomain');

        const siteDomain = siteSubDomain
            ? siteSubDomain + '.' + domainName
            : domainName;
        new cdk.CfnOutput(this, 'Site', {value: 'https://' + siteDomain});

        const {apiDomain} = new Notifications(this, "Backend")

        new StaticDeployment(this, "Distribution", {
            zoneName: domainName,
            siteFqdn: siteDomain,
            contentSource: [s3deploy.Source.asset('../dist')],
            additionalBehaviors: [
                {
                    pathPattern: "/prod/notifications/*",
                    origin: new origins.HttpOrigin(apiDomain),
                    behaviorOptions: {
                        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
                        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL
                    }
                }
            ]
        })
    }
}

const app = new cdk.App();

const prodStack = new TaylorsVersionSiteStack(app, 'TaylorsVersionProd', {
    env: {
        region: process.env.CDK_DEPLOY_REGION,
        account: process.env.CDK_DEPLOY_ACCOUNT
    }
});
cdk.Tags.of(prodStack).add('project', "taylors-version")

const stagingStack = new TaylorsVersionSiteStack(app, 'TaylorsVersionStaging', {
    env: {
        region: process.env.CDK_DEPLOY_REGION,
        account: process.env.CDK_DEPLOY_ACCOUNT
    }
});
cdk.Tags.of(stagingStack).add('project', "taylors-version")

const adhocStack = new TaylorsVersionSiteStack(app, 'TaylorsVersionAdhoc', {
    env: {
        region: process.env.CDK_DEPLOY_REGION,
        account: process.env.CDK_DEPLOY_ACCOUNT
    }
});
cdk.Tags.of(adhocStack).add('project', "taylors-version")

app.synth();