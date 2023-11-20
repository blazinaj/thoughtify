import express from 'express'
import bodyParser from 'body-parser'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import {generateThoughtExtract} from "./thoughts/generateThoughtExtract";
import {updateThought} from "./graphql/mutations";
import {handleGraphql} from "./_utils/graphql/handleGraphql";


// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Thoughts *
 **********************/
app.post('/thoughts/generateThoughtExtract', function(req, res) {
  console.log(req);

  const thought = req.body.thought;
  const owner = req.body.owner;

  generateThoughtExtract({
    thought,
    owner
  }).then(extract => {
    const mutation = updateThought;
    const variables = {
      input: {
        id: thought.id,
        extract
      }
    }

    handleGraphql({
      query: mutation,
      variables
    }).then(response => {
      res.json(response)
    })

  })

  // Add your code here
  // res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
