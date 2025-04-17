/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["OPENAI_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {OpenAI} = require("openai");
const aws = require('aws-sdk');

export const handleCompletion = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const { prompt, input, format, model = 'gpt-4o' } = event;

    // const { Parameters } = await (new aws.SSM())
    // .getParameters({
    //     Names: ["OPENAI_API_KEY"].map(secretName => process.env[secretName]),
    //     WithDecryption: true,
    // })
    // .promise();
    //
    // const apiKey = Parameters.find(param => param.Name === 'OPENAI_API_KEY').Value;

    const configuration = {
        organization: 'org-Gesve0eSdjX4qWCOl3fuhct0',
        apiKey: "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",
    };

    const openai = new OpenAI(configuration);

    try {

        const completion = await openai.responses.create({
            model,
            input: input ?? [{ role: 'developer', content: prompt }],
            text: {
                format,
            }
        });

        const response = completion.output_text;

        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },
            body: JSON.stringify(response),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error with OpenAI API request',
                message: e.message,
            })
        }
    }
};
