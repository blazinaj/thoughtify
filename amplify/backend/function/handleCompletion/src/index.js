/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {Configuration, OpenAIApi} = require("openai");


exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const { prompt, seed, responseFormat } = event.body

    const configuration = new Configuration({
        organization: 'org-Gesve0eSdjX4qWCOl3fuhct0',
        // apiKey: process.env.OPENAI_API_KEY,
        apiKey: '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'
    });

    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-1106',
            messages: [{ role: 'system', content: prompt }],
            seed,
            response_format: responseFormat
        });

        const response = completion.data.choices[0].message.content;

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
