import { handleCompletion } from '../../utils/openai/functions/generate'

/**
 * Description: export the function getBiography which calls the openAI API to return a biography object, 
 * 
 * @param {object[]} thoughts - the thoughts parameter is an array of objects passed in by the API call based upon the users previous history.
 * @returns {object} - returns the mapped out thoughts 
 */
  export const getBiography = async (thoughts) => {
    if (!thoughts || thoughts.length === 0) {
      return;
    }

    const prompt = `
      Generate a biography based on the following user's thoughts:
      
      ${thoughts
        .map((thought) => {
          return `${thought.date || thought.createdAt} - ${thought?.extract?.summary || thought.input}`;
        })
        .join('\n')}
      
      Output the biography as a collection of pages. Javascript parseable JSON array of strings.
    
    `;

    const completion = await handleCompletion({
      prompt,
      maxTokens: 2000,
      seed: 303,
      responseFormat: { type: 'json_object' }
    });

    const biography = completion;

    const parsedBiography = JSON.parse(biography);

    return parsedBiography;
  };