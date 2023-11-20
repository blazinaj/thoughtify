import {queryExistingThoughts} from "./queryExistingThoughts.js";
import {generateCompletion} from "../../_utils/openai/generateCompletion.js";

/**
 * Similar thoughts
 * Emotions
 * People
 * Projects
 * Categories
 * Reminders
 * Questions
 * @returns {Promise<void>}
 */
export const generateThoughtExtract = async ({thought, owner}) => {
  const existingThoughts = await queryExistingThoughts({owner});

  const _prompt = `
      Existing Thoughts:
      
      ${existingThoughts
        .map((thought) => {
          return `${thought.extract ? JSON.stringify(thought.extract) : thought.input}`;
        })
        .join('\n')}
    
      Analyze this person's new thought and extract the following:
      
      summary
      similar_thoughts
      emotions
      people
      projects
      categories
      reminders
      questions
      
      New Thought:
      ${thought.input}
      
      Format the response as a javascript parseable JSON object string
      
    `;
  const response = await generateCompletion({
    prompt: _prompt,
    response_format: { type: 'json_object' },
    seed: 101
  });

  return response;
};