import {handleCompletion} from "./handleCompletion.js";
import {listQuery} from "./listQuery.js";
import {getThoughtAttributes} from "./getThoughtAttributes.js";

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
 *
 * Returns the thought extract object like:
 * {
 *     overallTone: 'positive',
 *     emotions: ['happy', 'excited'],
 *     people: ['John Doe'],
 *     projects: ['Project A'],
 *     categories: ['Work'],
 *     reminders: ['Call John'],
 *     questions: ['What is the deadline?'],
 *     places: ['New York'],
 *     events: ['Meeting'],
 *     tasks: [
 *       {
 *         name: 'Task 1',
 *         status: 'NOT_STARTED'
 *       },
 *       {
 *         name: 'Task 2',
 *         status: 'IN_PROGRESS'
 *       }
 *     ]
 *
 * }
 * @returns {Promise<void>}
 */
export const generateThoughtExtract = async ({thought, owner}) => {

    const newThought = thought;

    const query = /* GraphQL */ `
        query LIST_THOUGHTS {
            listThoughts {
                items {
                    id,
                    date,
                    input,
                    output,
                    extract,
                    overallTone,
                    people,
                    projects,
                    categories,
                    emotions,
                    reminders,
                    questions,
                    places,
                    events,
                }
            }
        }
    `;

    const existingThoughts = await listQuery({
        query,
        owner
    })

    const existingAttributes = getThoughtAttributes({
        thoughts: existingThoughts,
    })

    const _prompt = `
<existing-attributes>  
    ${
        Object.entries(existingAttributes).map(([key, values]) => {
            return `<attribute>${key}</attribute>: <values>${values.join(', ')}</values>\n`;
        })
    }
</existing-attributes>      
<instructions>
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
</instructions>
<new-thought>
  ${newThought.input}
</new-thought>
`;

    const response = await handleCompletion({
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