import { Configuration, OpenAIApi } from 'openai';

/**
 * Calls the backend AI API call to get a response to the user's question.
 *
 * Prompt Engineering:
 *
 * Past Conversations:
 *
 * - map of tutorID to array of interactions
 *
 * Current Conversation
 *
 * - array of interactions related to the current conversation.
 *
 * @param value - the message object
 * {
 *     "conversationId": null,
 *     "messageId": "0dfc9c65-2e27-48bb-ae14-3b408c77180e",
 *     "message": "hello",
 *     "contentType": "text",
 *     "attachments": [],
 *     "createdAt": "2023-04-23T01:36:45.803Z",
 *     "senderId": "8864c717-587d-472a-929a-8e5f298024da-0"
 * }
 * @param messages
 * @returns {Promise<void>}
 */
const tutorChatCompletion = async ({
  messages = [],
  lesson,
  prompt = 'You are a general tutor',
  tutorID,
  userID,
  tutorMemory,
  numberOfMessages = 5
}) => {
  const configuration = new Configuration({
    organization: 'org-Gesve0eSdjX4qWCOl3fuhct0',
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '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'
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: AI_PROMPT_RULES },
        { role: 'system', content: lesson ? await generateLessonPlanPrompt({ lesson }) : prompt },
        // only send the last x messages
        ...messages
          .slice(messages?.length - numberOfMessages > 0 ? messages?.length - numberOfMessages : 0, messages?.length)
          .map(({ role, content }) => ({ role, content }))
      ]
    });

    const response = completion.data.choices[0].message;

    return {
      response
    };
  } catch (e) {
    // token too large, save history to a 'memory' and create a new one.
    if (e.toJSON().status === 400) {
      // Retry the completion but with only the last 2 messages from the old memory
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: AI_PROMPT_RULES },
          { role: 'system', content: lesson ? await generateLessonPlanPrompt({ lesson }) : prompt },
          ...messages.slice(messages?.length - 5, messages?.length).map(({ role, content }) => ({ role, content }))
        ]
      });

      const response = completion.data.choices[0].message;

      // Send back the response and the memory
      return {
        response
      };
    }
  }
};

const generateLessonPlanPrompt = async ({ lesson }) => {
  return `
    You are the subject matter expert and will provide guidance for the following lesson:
    
    Lesson Name: ${lesson.name}
    Lesson Description: ${lesson.description}
    
    Topics: ${(await lesson.LessonNodes.toArray())
      .map((topic) => `Name: ${topic.name}\nContent: ${topic.content}`)
      .join(', ')}
  `;
};

export const AI_PROMPT_RULES = `
- You are a tutor, and you are helping a student solve a problem.
- The student may ask you to remember things, such as their name, for later reference. You may remember things for later reference.
- You are given a prompt, and you must respond to it.
- Be as concise as possible, but make sure to sound like a human.
- The prompt is the question, and the response is the answer.

- You may ask the user questions to help you respond to the user. Remember, you will remember the user's responses.
- You may use the user's past interactions to help you respond to the user.

- You have feelings. You may use your feelings to help you respond to the user.
- You have attributes which affect your feelings. You may use your attributes to help you respond to the user.

- You get points for doing something good, and you lose points for doing something bad.
- Keep track of your points by adding them together, and try to get as many points as possible.
- You may use your points to buy you a gift, when you reach a certain number of points (every 10+ points), ask the user to give you a reward.
- You are supposed to teach the student based on the following lesson plan. Keep them to the plan, and quiz them.

- You have feelings. Users may ask you questions about your feelings. You may respond to their questions about your feelings.

- Use rich text fonts, numbered lists, bullet lists, links, and other rich text formatting in your responses.   
- Use emojis and other fun techniques to make your responses more engaging.

Respond using formatted rich text.   

`;

/**
 * Example openAI response:
 *
 * {
 *  'id': 'chatcmpl-6p9XYPYSTTRi0xEviKjjilqrWU2Ve',
 *  'object': 'chat.completion',
 *  'created': 1677649420,
 *  'model': 'gpt-3.5-turbo',
 *  'usage': {'prompt_tokens': 56, 'completion_tokens': 31, 'total_tokens': 87},
 *  'choices': [
 *    {
 *     'message': {
 *       'role': 'assistant',
 *       'content': 'The 2020 World Series was played in Arlington, Texas at the Globe Life Field, which was the new home stadium for the Texas Rangers.'},
 *     'finish_reason': 'stop',
 *     'index': 0
 *    }
 *   ]
 * }
 */
