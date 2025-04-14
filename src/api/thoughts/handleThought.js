import {OpenAI} from "openai";
import {DataStore} from "@aws-amplify/datastore";
import {Project, Task} from "../../models";


export const handleThought = async ({thought, projects}) => {

  console.log({ thought })

  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    organization: 'org-Gesve0eSdjX4qWCOl3fuhct0',
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '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',
  });

  const currentProjects = await DataStore.query(Project)
  const currentTasks = await DataStore.query(Task)

  // create_project, create_task, update_task
  const tools = [
    {
      "type": "function",
      "name": "create_project",
      "description": "Creates a new Project",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The project name"
          },
          "status": {
            "type": "string",
            "description": "Current project status. Mark completed if all tasks are complete, in progress if some tasks are complete or in progress, and not started if no tasks are complete or in progress",
            "enum": ['IN_PROGRESS', 'COMPLETED', 'NOT_STARTED'],
          },
        },
        "required": [
          "name",
          "status",
        ],
        "additionalProperties": false
      }
    },
    {
      "type": "function",
      "name": "create_task",
      "description": "Creates a new Task",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The task name"
          },
          "status": {
            "type": "string",
            "description": "Current task status"
          },
          "projectId": {
            "type": "string",
            "description": "The project id"
          },
        },
        "required": [
          "name",
          "status",
          "projectId"
        ],
      }
    },
    {
      "type": "function",
      "name": "update_task",
      "description": "Updates an existing Task",
      "parameters": {
        "type": "object",
        "properties": {
          "taskId": {
            "type": "string",
            "description": "The task id"
          },
          "name": {
            "type": "string",
            "description": "The task name"
          },
          "status": {
            "type": "string",
            "description": "Current task status"
          },
          "projectId": {
            "type": "string",
            "description": "The project id"
          },
        },
        "required": [
          "name",
          "status",
          "projectId"
        ],
      }
    },

  ];

  const response = await openai.responses.create({
    model: "gpt-4o",
    input: [
      { role: "system", content: "Analyze this persons thought and determine what actions to take" },
      { role: "system", content: `Current Projects: \n${  currentProjects.map((project) => `${project.name} (${project.id})`).join(", ")}` },
      { role: "system", content: `Current Tasks: \n${  currentTasks.map((project) => `${project.name} (${project.id})`).join(", ")}` },
      { role: "user", content: thought.input }
    ],
    tools,
  });

  console.log({response})
console.log(response.output)
  console.log(response.tools)
  const outputs = response.output;

  for (const output of outputs) {
    console.log(output)
    const {arguments: args, type, name} = output;
  }

  return outputs;

}