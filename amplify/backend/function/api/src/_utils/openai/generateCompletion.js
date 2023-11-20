import {Configuration, OpenAIApi} from "openai";

/**
 * Uses openAI to generate text based on a prompt
 * @param prompt
 * @param seed
 * @param responseFormat
 * @returns {Promise<*>}
 */
export const generateCompletion = async ({ prompt, seed, responseFormat = { type: 'json_object' } }) => {
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

    console.log({ completion });

    const response = completion.data.choices[0].message.content;

    return response;
  } catch (e) {
    console.log(e);
  }
};