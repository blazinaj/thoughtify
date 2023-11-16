import { Configuration, OpenAIApi } from 'openai';
import { AI_PROMPT_RULES } from '../../../api/tutors/tutorChatCompletion';

const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

/**
 * Uses openAI to generate text based on a prompt
 * @param prompt
 * @param temperature
 * @param model
 * @param maxTokens
 * @param n
 * @returns {Promise<*>}
 */
export const generate = async ({ prompt, temperature = 0.6, model = 'text-davinci-003', maxTokens = 1000, n = 1 }) => {
  if (!configuration.apiKey) {
    // status 500
    console.error({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md'
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
      n
    });

    // res.status(200).json({ result: completion.data.choices[0].text });

    return completion;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
};

/**
 * Uses openAI to generate text based on a prompt
 * @param prompt
 * @param temperature
 * @param model
 * @param maxTokens
 * @returns {Promise<*>}
 */
export const generateImage = async ({ prompt, n = 1, size = '256x256' }) => {
  if (!configuration.apiKey) {
    // status 500
    console.error({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md'
      }
    });
    return;
  }

  try {
    const image = await openai.createImage({
      prompt,
      n,
      size
    });

    // res.status(200).json({ result: completion.data.choices[0].text });

    /**
     * Response looks like this
     * {
        "created": 1589478378,
        "data": [
          {
            "url": "https://..."
          },
          {
            "url": "https://..."
          }
        ]
      }
     */
    return image.data.data;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
};

export const handleCompletion = async ({ prompt, seed, responseFormat = { type: 'json_object' } }) => {
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
