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
import { getWeek } from 'date-fns';
import { invokeLambda } from '../../../utils/functions/invokeLambda';
import { handleThought } from '../../../api/thoughts/handleThought';

/**
 * Input Field for Thoughts.
 * Includes Speech to Text.
 *
 * Displays the AI-generated form of the thought
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const CommentInput = ({ journalEntry, itemId, model }) => {
  const onSubmit = async (input) => {
    const comment = {
      // AWSDateTime
      date: new Date().toISOString(),
      content: input.input
    };

    // update the project 'comments' field
    if (itemId && model) {
      const item = await DataStore.query(model, itemId);
      if (item) {
        await DataStore.save(
          model.copyOf(item, (updated) => {
            updated.comments = [...item.comments, comment];
          })
        );
      }
    }

    // now, based on the content of the comment, perform updates on this item
    // for example, if the comment contains a task, create a new task for this project
    // or if it says to change a status, do that.
  };

  return <ThoughtInputField onSubmit={onSubmit} />;
};
