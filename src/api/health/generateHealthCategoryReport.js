import { handleCompletion } from '../../utils/openai/functions/generate';

export const generateHealthCategoryReport = async ({ category, thoughts }) => {
  const prompt = `
      Generate a health report for the ${category} health category based on the following user's thoughts:
      
      ${thoughts
        .map((thought) => {
          return `${thought?.date || thought.createdAt} - ${thought?.extract?.summary || thought.input}`;
        })
        .join('\n')}
      
      Example:
      
      "${category}": {
        "overall_status": "good", // good, fair, mixed, poor
        "description": "...",
      }
      
      Output the health report as a health category. First person. Javascript parseable JSON object.
      
    `;

  const completion = await handleCompletion({
    prompt,
    seed: 404
  });

  return {
    category,
    description: JSON.parse(completion)[category]
  };
};
