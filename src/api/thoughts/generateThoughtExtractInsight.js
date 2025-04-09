import { DataStore } from '@aws-amplify/datastore';
import { Thought } from '../../models';
import { handleCompletion } from '../../utils/openai/functions/generate';

/**
 * Generate insights of related thoughts based on the attribute selected.
 *
 * Example: type: "people", value: "John Doe"
 *          {
 *              "timeline": [...],
 *              "relatedThoughts": [...],
 *              "relatedPeople": [...],
 *              "relatedProjects": [...],
 *              "relatedCategories": [...],
 *              "relatedReminders": [...],
 *              "relatedQuestions": [...]
 *          }
 * @param type
 * @param value
 * @returns {Promise<any>}
 */
export const generateThoughtExtractInsight = async (type, value) => {
  const thoughts = await DataStore.query(Thought);

  const extractType = type;
  const extractValue = value;

  const prompt = `
    
      Based on the following User's Thoughts:
      
      ${thoughts
        .map((thought) => {
          return `${thought?.date || thought.createdAt} - ${
            thought?.extract ? JSON.stringify(thought.extract) : thought.input
          }`;
        })
        .join('\n')}
      
      Extract the following information related to the ${extractType}: ${extractValue}
      
      timeline: Timeline Summary of Thoughts that mention: ${extractValue}
      relatedThoughts: A list of thoughts that mention: ${extractValue}
      relatedPeople: A list of people mentioned in thoughts that mention: ${extractValue}
      relatedProjects: A list of projects mentioned in thoughts that mention: ${extractValue}
      relatedCategories: A list of categories mentioned in thoughts that mention: ${extractValue}
      relatedReminders: A list of reminders mentioned in thoughts that mention: ${extractValue}
      relatedQuestions: A list of questions mentioned in thoughts that mention: ${extractValue}
      
      Example Output:
      "{'timeline': [{'timestamp': '...', 'summary': "..."}], 'relatedThoughts': [...], "relatedPeople": [...], "relatedProjects": [...], "relatedCategories": [...], "relatedReminders": [...], "relatedQuestions": [...] }"
      
      Format the response as a javascript parseable JSON array of objects
    
    `;

  const response = await handleCompletion({
    prompt,
    responseFormat: { type: 'json_object' },
    seed: 505
  });

  return JSON.parse(response);
};
