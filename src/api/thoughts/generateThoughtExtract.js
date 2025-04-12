import { DataStore } from '@aws-amplify/datastore';
import { Thought } from '../../models';
import { handleCompletion } from '../../utils/openai/functions/generate';
import { invokeLambda } from '../../utils/functions/invokeLambda';

/**
 * Uses openAI to generate a thought extract for a new thought.
 *
 * An extract pulls out the following information from a thought:
 *
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
      places
      events
      
      New Thought:
      ${newThought.input}
      
      Format the response as a javascript parseable JSON object string like: 
      {
        "overallTone": "...",
        "emotions": ["..."],
        "people": ["..."],
        "projects": ["..."],
        "categories": ["..."],
        "reminders": ["..."],
        "questions": ["..."]
      }
      
    `;

  const response = await invokeLambda(`handleCompletion-${process.env.REACT_APP_AMPLIFY_ENVIRONMENT || 'staging'}`, {
    prompt: _prompt,
    seed: 101,
    response_format: { type: 'json_object' }
  });

  if (response.statusCode !== 200) {
    console.error('Error with OpenAI API request', response);
    throw new Error('Error with OpenAI API request');
  }

  // Parse the response to get the JSON object
  const { body } = response;

  const parsedResponse = JSON.parse(body);

  return parsedResponse;
};
