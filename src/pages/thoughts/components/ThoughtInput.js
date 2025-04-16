import {
  JournalEntryThoughts,
  Project,
  ProjectTasks,
  ProjectThoughts,
  Task,
  Thought,
  ThoughtAttributes
} from '../../../models';
import { DataStore } from '@aws-amplify/datastore';
import ThoughtInputField from './ThoughtInputField';
import { generateThoughtExtract } from '../../../api/thoughts/generateThoughtExtract';
import { handleThought } from '../../../api/thoughts/handleThought';
import { Storage } from '@aws-amplify/storage';
import { useUserContext } from '../../../contexts/UserContext';

/**
 * Input Field for Thoughts.
 * Includes Speech to Text.
 *
 * Displays the AI-generated form of the thought
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtInput = ({ journalEntry, projectId }) => {
  const { owner, user } = useUserContext();

  const onSubmit = async ({ input, date, attachments }) => {
    const attachmentResults = [];

    // handle file attachments with aws-amplify storage
    for (const attachment of attachments) {
      const file = attachment.file;

      const filename = `${user.owner}/thoughts/attachments/${attachment.name}`;
      const result = await Storage.put(filename, attachment, {
        contentType: attachment.type,
        region: 'us-west-2'
      });
      attachmentResults.push({
        id: result.key,
        url: result.key,
        type: attachment.type,
        name: attachment.name,
        size: attachment.size
      });
    }

    const newThought = await DataStore.save(
      new Thought({
        input,
        date,
        attachments: attachmentResults
      })
    );

    if (projectId) {
      await DataStore.save(
        new ProjectThoughts({
          projectId,
          thoughtId: newThought.id
        })
      );
    }

    if (journalEntry?.id) {
      await DataStore.save(
        new JournalEntryThoughts({
          journalEntryId: journalEntry.id,
          thoughtId: newThought.id
        })
      );
    }

    let extract = await generateThoughtExtract(newThought);

    if (typeof extract === 'string') {
      extract = JSON.parse(extract);
    }

    await DataStore.save(
      Thought.copyOf(newThought, (updated) => {
        for (const attribute of Object.values(ThoughtAttributes)) {
          const attributeValue = extract?.[attribute];
          if (extract?.[attribute]) {
            updated[attribute] = attributeValue;
          }
        }
        return updated;
      })
    );

    try {
      // handle projects
      const projects = extract?.projects;
      if (projects) {
        const res = await handleThought({
          thought: newThought,
          projects,
          projectId
        });
        for (const output of res) {
          const { arguments: args, type, name } = output;
          if (type !== 'function_call') {
            // eslint-disable-next-line no-continue
            continue;
          }
          let functionArguments = args;
          if (typeof functionArguments === 'string') {
            functionArguments = JSON.parse(functionArguments);
          }
          let projectId;

          if (name === 'create_project') {
            const project = await DataStore.save(
              new Project({
                name: functionArguments.name,
                status: functionArguments.status
              })
            );
            projectId = project.id;
          }

          // create new project thought
          await DataStore.save(
            new ProjectThoughts({
              projectId: functionArguments?.projectId || projectId,
              thoughtId: newThought.id
            })
          );

          if (name === 'create_task') {
            const task = await DataStore.save(
              new Task({
                name: functionArguments.name,
                status: functionArguments.status
              })
            );
            // create new project task
            await DataStore.save(
              new ProjectTasks({
                projectId: functionArguments.projectId || projectId,
                taskId: task.id
              })
            );
          }

          if (name === 'update_task') {
            const task = await DataStore.query(Task, functionArguments.taskId);
            // if (task.length > 0) {
            await DataStore.save(
              Task.copyOf(task, (updated) => {
                updated.name = functionArguments.name;
                updated.status = functionArguments.status;
              })
            );

            // }
          }

          if (name === 'update_project') {
            const project = await DataStore.query(Project, functionArguments.projectId);
            if (project.length > 0) {
              await DataStore.save(
                Project.copyOf(project[0], (updated) => {
                  updated.name = functionArguments.name;
                  updated.status = functionArguments.status;
                })
              );
            }
          }
        }
      }
    } catch (e) {
      console.error('Error with handling project sync', e);
    }
  };

  /**
   * Sets the min date and max date to fall into the range of the selected journal entry
   * @param date
   * @param cadence
   * @returns {{minDate: Date, maxDate: Date}}
   */
  const getDates = (date, cadence) => {
    const minDate = new Date(date);
    const maxDate = new Date(date);
    const todayDate = new Date();
    switch (cadence) {
      case 'DAILY':
        break;
      case 'WEEKLY':
        // set the min date to first day of the week of the 'date' param
        minDate.setDate(minDate.getDate() - minDate.getDay());
        // set the max date to the last day of the week of the 'date' param, or today, whichever is earlier
        maxDate.setDate(maxDate.getDate() + (6 - maxDate.getDay()));
        if (maxDate > todayDate) {
          maxDate.setDate(todayDate.getDate());
        }

        break;
      case 'MONTHLY':
        // first of the month of the date
        minDate.setDate(1);
        // set the max date to the last day of the month of the 'date' param, or today, whichever is earlier
        maxDate.setMonth(maxDate.getMonth() + 1);
        maxDate.setDate(0);
        if (maxDate > todayDate) {
          maxDate.setDate(todayDate.getDate());
        }
        break;
      case 'YEARLY':
        // first of the year of the date
        minDate.setMonth(0);
        minDate.setDate(1);
        // set the max date to the last day of the year of the 'date' param, or today, whichever is earlier
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setMonth(0);
        maxDate.setDate(0);
        if (maxDate > todayDate) {
          maxDate.setDate(todayDate.getDate());
        }
        break;
      default:
        break;
    }

    // default date is the journal date, or today if today is in the date range
    const defaultDate = new Date(date);
    if (todayDate >= minDate && todayDate <= maxDate) {
      defaultDate.setDate(todayDate.getDate());
    }
    return {
      minDate,
      maxDate,
      defaultValue: defaultDate
    };
  };

  return (
    <ThoughtInputField
      onSubmit={onSubmit}
      showDateSelector={!!journalEntry}
      dateConfig={{
        ...getDates(journalEntry?.date, journalEntry?.cadence)
      }}
    />
  );
};
