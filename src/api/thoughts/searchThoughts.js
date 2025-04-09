import { DataStore } from '@aws-amplify/datastore';
import { Thought } from '../../models';
import { handleCompletion } from '../../utils/openai/functions/generate';

export const searchThoughts = async ({ searchTerm }) => {
  const existingThoughts = await DataStore.query(Thought);

  const _prompt = `
      Existing Thoughts:
      
      ${existingThoughts
        .map((thought) => {
          return `${thought.extract ? JSON.stringify(thought.extract) : thought.input}`;
        })
        .join('\n')}
    
      Search the existing thoughts for the following search term:
      
      ${searchTerm}
      
      Format the response as a javascript parseable JSON array of thought objects
      
    `;
  const response = await handleCompletion({
    prompt: _prompt,
    response_format: { type: 'json_object' },
    seed: 101
  });

  return response;
};
