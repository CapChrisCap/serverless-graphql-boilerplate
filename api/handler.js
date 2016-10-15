'use strict'; // eslint-disable-line strict

const handle = require('./graphql/index').default;

module.exports.graphql = (event, context, callback) => {
  console.log('Received event: ');
  console.log(event);

  handle(event.body.query, event.body.variables)
    .then((response) => {
      console.log('response received');
      console.log(response);

      callback(null, JSON.stringify({
        statusCode: 200,
        body: JSON.stringify(response),
      }));
    })
    .catch((error) => callback(error));
};
