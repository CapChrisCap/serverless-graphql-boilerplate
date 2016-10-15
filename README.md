# Reduced Serverless GraphQL Boilerplate (without application)

This starter kit is an opinionated set of tools combined to help you get started building a Serverless application with an GraphQL endpoint and deploy them to production in minutes.

This example uses the following technologies:

- Serverless
- GraphQL-js
- Webpack
- Jest

## Install & Run

You need to have node 6 or higher installed.

```
npm install -g serverless
npm install
```

## Developing

For developing, the [serverless-offline](https://www.npmjs.com/package/serverless-offline) module is recommended because it acts faster and is cheaper (for free :-) ) than developing live on the AWS console. See the [options](https://www.npmjs.com/package/serverless-offline#usage-and-command-line-options) for more information about the local configuration. 

```
npm install -g serverless-offline
sls offline start --port [YOUR_CUSTOM_PORT]
```

## Testing

We use Jest as a test runner. To run all tests use (ensure you have `npm install` called)

```
npm run test
```

## Security

At Serverless we keep our keys encrypted in the repository. We recommend you to do the same. In our case deploying to a staging and production system is done via a continuous integration system which has knows about the secret to decrypt the necessary file with the environment variables. For demo purposes this repository has an unencrypted file for environment variables at `foundation/environment/security.env.local` and `foundation/environment/security.env.prod`.

## Multiple package.json

In order to keep the total amount of code uploaded to AWS Lambda small the `api` directory containing the Serverless service has it's own `package.json`. This speeds up uploading and also should reduce the cold start time of Lambda functions. You don't have to run `npm install` manually at any point. It will only happen during deploy, but you need make sure every library you are consuming in your GraphQL endpoint is add a#s depdendency there.

### `package.json`

- depdendencies: depdendencies used by the front-end
- devDepdendencies: depdendencies used to package the front-end application & running the local environment

### `api/package.json`

- depdendencies: depdendencies used on AWS Lambda
