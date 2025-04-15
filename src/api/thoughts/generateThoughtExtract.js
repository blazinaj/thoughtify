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
      
    `;

  const response = await invokeLambda(`handleCompletion-${process.env.REACT_APP_AMPLIFY_ENVIRONMENT || 'staging'}`, {
    prompt: _prompt,
    seed: 101,
    response_format: { type: 'json_object' },
    format: {
      type: 'json_schema',
      name: 'thought_extract',
      schema: {
        type: 'object',
        properties: {
          overallTone: {
            type: 'string',
            enum: ['positive', 'negative', 'neutral'],
            description: 'The overall tone of the thought'
          },
          emotions: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The emotions expressed in the thought'
            }
          },
          people: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The people mentioned in the thought'
            }
          },
          projects: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The projects mentioned in the thought'
            }
          },
          categories: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The categories mentioned in the thought'
            }
          },
          reminders: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The reminders mentioned in the thought'
            }
          },
          questions: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The questions mentioned in the thought'
            }
          },
          places: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The places mentioned in the thought'
            }
          },
          events: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The events mentioned in the thought'
            }
          },
          tasks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'The task name'
                },
                status: {
                  type: 'string',
                  enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']
                }
              },
              required: ['name', 'status'],
              description: 'The tasks mentioned in the thought',
              additionalProperties: false
            }
          }
        },
        required: [
          'overallTone',
          'emotions',
          'people',
          'projects',
          'categories',
          'reminders',
          'questions',
          'places',
          'events',
          'tasks'
        ],
        additionalProperties: false
      }
    }
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
