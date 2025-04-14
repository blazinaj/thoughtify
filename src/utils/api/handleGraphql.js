import {SignatureV4} from "@aws-sdk/signature-v4";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
import {HttpRequest} from "@aws-sdk/protocol-http";
// eslint-disable-next-line import/no-named-default
import {default as fetch, Request} from "node-fetch";
import crypto from "@aws-crypto/sha256-js";
import {aws_appsync_graphqlEndpoint} from "../../aws-exports.js";

const AWS_REGION = process.env.AWS_REGION || 'us-west-2';
const { Sha256 } = crypto;

export const handleGraphql = async ({ query, variables }) => {

  // eslint-disable-next-line camelcase
  const GRAPHQL_ENDPOINT = aws_appsync_graphqlEndpoint

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify(body)
  };
}