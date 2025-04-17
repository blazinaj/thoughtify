import {SignatureV4} from "@aws-sdk/signature-v4";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
import {Sha256} from "@aws-crypto/sha256-js";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {default as fetch, Request} from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_THOUGHTIFY_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

export const mutateQuery = async ({ query, variables }) => {
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
        body: JSON.stringify({ query }),
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

    return body
}