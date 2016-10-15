# Reduced Serverless GraphQL Boilerplate (without application)

This starter kit is an opinionated set of tools combined to help you get started building a Serverless application with an GraphQL endpoint and deploy them to production in minutes. Most of the code is used from the [serverless-graphql](https://github.com/serverless/serverless-graphql) project. 

This example uses the following technologies:

- Serverless
- GraphQL-js
- Webpack
- Jest



You need to have node 6 or higher installed. Next, ensure you have serverless installed and your AWS credentials are still configured. A installation can be found [here](https://github.com/serverless/serverless#quick-start). 

Now, you should receive something like this, when you enter `sls info`: 
```bash
  Serverless Error ---------------------------------------

     The command you entered did not catch on any hooks

  Get Support --------------------------------------------
     Docs:          docs.serverless.com
     Bugs:          github.com/serverless/serverless/issues

  Your Environment Infomation -----------------------------
     OS:                 darwin
     Node Version:       6.8.1
     Serverless Version: 1.0.2
```

Ensure, that your serverless version is >= 1.0 and your node version is >= 6. You can see those information in the last two lines of the console output. 

## Install & Run

If you have met all prerequisites, you can create your new lambda service with this boilerplate: 

```
sls install \
 --url https://github.com/CapChrisCap/serverless-graphql-boilerplate
cd serverless-graphql-boilerplate
```

Next, install all dependencies to run the deployment process and the tests. 
```
npm install
```

Congratulation, you finished all preparations and you start your first deployment: 
```
npm run deploy
```

For testing the resource, you can use the [GraphiQL](https://github.com/graphql/graphiql) browser IDE. 

Important: If you receive the error, that your AWS credentials are not specified yet, please refer to this [guide](https://github.com/serverless/serverless/blob/master/docs/02-providers/aws/01-setup.md). 

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

## Troubleshooting

### Bucket not found

If this error occured during the deployment process, then remove first the stage and region parameter for your serverless.yaml and add them later. It is possible that S3 is not avaible in your region and therefore the creation is not possible. For further logs take a look at the AWS service CloudFornation. 

### Something went wrong: getting the logs

You can see logs on different places with serverless. You have to diffence the following situations: 

#### Something went wrong before `serverless deploy` is called
 
 In this situation, someting went wrong with your compiled code. To ensure that you have full ES6 support, we use Babel and Webpack to precompile your code. Therefore, take a look at your console/terminal. They will give you hopefully all information you need. 
  
#### Something went wrong during the serverless deployment process

This situation passes most frequently. Thereby, it is noticable that all events are saved in the AWS service Cloudfornation. This service will give you all information you need. 
  
#### Something went wrong during the Lambda execution

In this situation, you have to take a look at the AWS Service CloudWatch because in this service, all your logs are stored during the lambda execution (in particular the console logs --> use the console for debugging :-) ). 

