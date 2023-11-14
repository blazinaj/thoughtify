import {tutorChatCompletion} from "./tutorChatCompletion";

/**
 * Suggest 3 different possible follow-up questions to prompt the user with based on the previous conversation
 *
 * @param messages
 * @param response
 * @param lesson
 * @param selectedTopic
 * @returns {Promise<{followUps: any, response}>}
 */
export const tutorMessageFollowUps = async ({messages, response, lesson, selectedTopic}) => {

  // suggest 3 different possible follow-up questions to prompt the user with..
  const {response: followUpResponse} = await tutorChatCompletion({
    messages: [
      ...messages,
      {
        content: lesson ? `You are helping the user with the following lesson: ${lesson.name}${selectedTopic?.name && ` and the specific topic is: ${selectedTopic}`}.` : `You are a general tutor`,
        role: "system",
      },
      {
        content: `Pretend you are now the user. Suggest 3 possible follow-up questions to ask the AI based on the last AI response. Response with a JSON parseable array of strings`,
        role: "system"
      }
    ],
  })

  const followUps = JSON.parse(followUpResponse.content);

  return {
    response,
    followUps,
  }
}