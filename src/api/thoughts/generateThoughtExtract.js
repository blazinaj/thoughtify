import {DataStore} from "@aws-amplify/datastore";
import {Thought} from "../../models";
import {handleCompletion} from "../../utils/openai/functions/generate";

/**
 * Related thoughts
 * Emotions
 * People
 * Projects
 * Categories
 * Reminders
 * Questions
 * @returns {Promise<void>}
 */
export const generateThoughtExtract = async (newThought) => {
    const existingThoughts = await DataStore.query(Thought);

    const _prompt = `
      Existing Thoughts:
      
      ${existingThoughts
    .map((thought) => {
        return `${thought.extract ? JSON.stringify(thought.extract) : thought.input}`;
    })
    .join('\n')}
    
      Analyze this person's new thought and extract the following:
      
      overallTone // positive, negative, neutral
      emotions
      people
      projects
      categories
      reminders
      questions
      
      New Thought:
      ${newThought.input}
      
      Format the response as a javascript parseable JSON object string
      
    `;
    const response = await handleCompletion({
        prompt: _prompt,
        response_format: { type: 'json_object' },
        seed: 101
    });

    return response;
};