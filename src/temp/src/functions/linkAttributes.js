import {listQuery} from "./listQuery.js";
import {OpenAI} from "openai";

/**
 * Uses openAI to link attributes in the database to the attribute strings extracted from the thought
 *
 * This queries existing projects, tasks, and people in the database to determine if the thought is linked to an existing object
 * If not, it creates a new object in the database
 *
 * Also performs upserts as necessary. Such as if the thought is linked to an existing project, but the project name has changed, it will update the project name in the database
 * Upserts status of tasks and projects as well
 * Upserts relationships of people as well
 *
 * @param thought
 * @param thoughtExtract
 * @param owner
 * @param projectId
 * @returns {Promise<Array<ResponseOutputItem>>}
 */
export const linkAttributes = async ({thought, thoughtExtract, owner, projectId}) => {

    const openai = new OpenAI({
        // dangerouslyAllowBrowser: true,
        organization: 'org-Gesve0eSdjX4qWCOl3fuhct0',
        // apiKey: process.env.OPENAI_API_KEY,
        apiKey: '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'
    });

    const currentProjects = await listQuery({
        query: /* GraphQL */ `
            query LIST_PROJECTS {
                listProjects {
                    items {
                        id
                        name
                        status
                        tasks {
                            items {
                                id
                                taskId
                                task {
                                    id
                                    name
                                    status
                                }
                            }
                        }
                    }
                }
            }
        `,
        owner
    })

    const currentTasks = await listQuery({
        query: /* GraphQL */ `
            query LIST_TASKS {
                listTasks {
                    items {
                        id
                        name
                        status
                        projects {
                            items {
                                id
                                projectId
                                project {
                                    id
                                    name
                                    status
                                }
                            }
                        }
                    }
                }
            }
        `,
    })

    const currentPeople = await listQuery({
        query: /* GraphQL */ `
            query LIST_PEOPLE {
                listPeople {
                    items {
                        id
                        name
                        relationship
                    }
                }
            }
        `,
    })

    // create_project, create_task, update_task
    const tools = [
        // create
        {
            type: 'function',
            name: 'create_project',
            description: 'Creates a new Project',
            parameters: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'The project name'
                    },
                    status: {
                        type: 'string',
                        description:
                            'Current project status. Mark completed if all tasks are complete, in progress if some tasks are complete or in progress, and not started if no tasks are complete or in progress',
                        enum: ['IN_PROGRESS', 'COMPLETED', 'NOT_STARTED']
                    }
                },
                required: ['name', 'status'],
                additionalProperties: false
            }
        },
        {
            type: 'function',
            name: 'create_task',
            description: 'Creates a new Task',
            parameters: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'The task name'
                    },
                    status: {
                        type: 'string',
                        description: 'Current task status'
                    },
                    projectId: {
                        type: 'string',
                        description: 'The project id'
                    }
                },
                required: ['name', 'status', 'projectId']
            }
        },

        // upsert
        {
            type: 'function',
            name: 'upsert_person',
            description: 'Creates a new Person',
            parameters: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The person id if this is an update to an existing person. If not, leave blank'
                    },
                    name: {
                        type: 'string',
                        description: 'The persons name'
                    },
                    relationship: {
                        type: 'string',
                        description: 'The person relationship. [FRIEND, FAMILY, COLLEAGUE, ACQUAINTANCE, PARTNER, SIBLING, CHILD, PARENT]',

                    }
                },
                required: ['name', 'relationship']
            }
        },


        // update
        {
            type: 'function',
            name: 'update_project',
            description: 'Updates an existing Project',
            parameters: {
                type: 'object',
                properties: {
                    projectId: {
                        type: 'string',
                        description: 'The project id to update'
                    },
                    name: {
                        type: 'string',
                        description: 'The project name'
                    },
                    status: {
                        type: 'string',
                        description: 'Current project status. Mark COMPLETED if all tasks are complete, IN_PROGRESS if some tasks are complete or in progress, and NOT_STARTED if no tasks are complete or in progress'
                    },
                },
                required: ['name', 'status', 'projectId']
            }
        },
        {
            type: 'function',
            name: 'update_task',
            description: 'Updates an existing Task',
            parameters: {
                type: 'object',
                properties: {
                    taskId: {
                        type: 'string',
                        description: 'The task id'
                    },
                    name: {
                        type: 'string',
                        description: 'The task name'
                    },
                    status: {
                        type: 'string',
                        description: 'Current task status'
                    },
                    projectId: {
                        type: 'string',
                        description: 'The project id'
                    }
                },
                required: ['name', 'status', 'projectId']
            }
        }

        // merge
    ];

    const response = await openai.responses.create({
        model: 'gpt-4o',
        input: [
            { role: 'developer', content: 'Analyze this persons thought and determine what actions to take' },
            {
                role: 'developer',
                content: `Current Projects: \n${JSON.stringify(currentProjects, null, 2)}`
            },
            {
                role: 'developer',
                content: `Current Tasks: \n${JSON.stringify(currentTasks, null, 2)}`
            },
            {
                role: 'developer',
                content: `Current People: \n${JSON.stringify(currentPeople, null, 2)}`
            },
            { role: 'developer', content: `Project ID: \n${projectId}` },
            { role: 'developer', content: thought.input }
        ],
        tools
    });

    const outputs = response.output;

    // for (const output of outputs) {
    //     const { name , arguments: args } = output;
    //
    //       let functionArguments = args;
    //       if (typeof functionArguments === 'string') {
    //         functionArguments = JSON.parse(functionArguments);
    //       }
    //
    //     switch (name) {
    //         case 'create_project':
    //             // create a new project
    //
    //
    //             // create ProjectThought link
    //
    //             break;
    //         case 'create_task':
    //             // create a new task
    //             break;
    //         case 'update_project':
    //             // update an existing project
    //             break;
    //         case 'update_task':
    //             // update an existing task
    //             break;
    //         case 'upsert_person':
    //             // upsert a person
    //             break;
    //         default:
    //             console.log(`Unknown function: ${name}`);
    //     }
    // }

    return outputs;

    // handle each attribute such as emotions, people, projects, categories, reminders, questions, places, events
    // looks for existing attributes in the database to link to the thought, e.g. a 'person' or a 'projeect'
    // if not found, create a new attribute in the database
    // links the thought to the attribute
    // returns the thought with the linked attributes

}