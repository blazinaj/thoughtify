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
      
      Output the health report as a health category. First person. 
      
    `;

  //   'mental_health',
  //     'emotional_health',
  //     'physical_health',
  //     'social_health',
  //     'diet',
  //     'spiritual_health'
  const completion = await handleCompletion({
    prompt,
    format: {
      type: 'json_schema',
      name: 'health_category_report',
      schema: {
        type: 'object',
        properties: {
          mental_health: {
            type: 'object',
            additionalProperties: false,
            required: ['overall_status', 'description'],
            properties: {
              overall_status: {
                type: 'string',
                enum: ['good', 'fair', 'mixed', 'poor']
              },
              description: {
                type: 'string',
                description: 'A detailed description of the mental health status.'
              }
            }
          },
          emotional_health: {
            type: 'object',
            additionalProperties: false,
            required: ['overall_status', 'description'],
            properties: {
              overall_status: {
                type: 'string',
                enum: ['good', 'fair', 'mixed', 'poor']
              },
              description: {
                type: 'string',
                description: 'A detailed description of the emotion health status.'
              }
            }
          },
          physical_health: {
            type: 'object',
            additionalProperties: false,
            required: ['overall_status', 'description'],
            properties: {
              overall_status: {
                type: 'string',
                enum: ['good', 'fair', 'mixed', 'poor']
              },
              description: {
                type: 'string',
                description: 'A detailed description of the physical health status.'
              }
            }
          },
          social_health: {
            type: 'object',
            additionalProperties: false,
            required: ['overall_status', 'description'],
            properties: {
              overall_status: {
                type: 'string',
                enum: ['good', 'fair', 'mixed', 'poor']
              },
              description: {
                type: 'string',
                description: 'A detailed description of the social health status.'
              }
            }
          },
          diet: {
            type: 'object',
            additionalProperties: false,
            required: ['overall_status', 'description'],
            properties: {
              overall_status: {
                type: 'string',
                enum: ['good', 'fair', 'mixed', 'poor']
              },
              description: {
                type: 'string',
                description: 'A detailed description of the diet status.'
              }
            }
          },
          spiritual_health: {
            type: 'object',
            additionalProperties: false,
            required: ['overall_status', 'description'],
            properties: {
              overall_status: {
                type: 'string',
                enum: ['good', 'fair', 'mixed', 'poor']
              },
              description: {
                type: 'string',
                description: 'A detailed description of the spiritual health status.'
              }
            }
          }
        },
        required: ['mental_health', 'emotional_health', 'physical_health', 'social_health', 'diet', 'spiritual_health'],
        additionalProperties: false
      }
    },
    model: 'gpt-4o'
  });

  return {
    category,
    description: JSON.parse(completion)[category]
  };
};
