import {JournalEntryThoughts, Thought} from '../../../models';
import {DataStore} from '@aws-amplify/datastore';
import ThoughtInputField from './ThoughtInputField';
import {generateThoughtExtract} from "../../../api/thoughts/generateThoughtExtract";
import {getWeek} from "date-fns";



/**
 * Input Field for Thoughts.
 * Includes Speech to Text.
 *
 * Displays the AI-generated form of the thought
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtInput = ({journalEntry}) => {

  const onSubmit = async (input) => {
    console.log('saving thought', input);
    const newThought = await DataStore.save(
      new Thought({
        ...input
      })
    );

    if (journalEntry?.id) {
      console.log({journalEntry, newThought})
      await DataStore.save(
        new JournalEntryThoughts({
          journalEntryId: journalEntry.id,
          thoughtId: newThought.id
        })
      )
    }

    const extract = await generateThoughtExtract(newThought);

    await DataStore.save(
      Thought.copyOf(newThought, (updated) => {
        updated.extract = extract;
      })
    );
  };

  const getDates = (date, cadence) => {
    const minDate = new Date(date);
    const maxDate = new Date(date);
    switch (cadence) {
      case 'DAILY':
        break;
      case 'WEEKLY':
        // first day of the week
        minDate.setDate(minDate.getDate() - getWeek(minDate).day);
        break;
      case 'MONTHLY':
        // first of the month
        minDate.setDate(1);
        break;
      case 'YEARLY':
        // first of the year
        minDate.setMonth(0);
        minDate.setDate(1);
        break;
      default:
        break;
    }
    return {
        minDate,
        maxDate
    };
  }

  return <ThoughtInputField
      onSubmit={onSubmit}
      showDateSelector={!!journalEntry}
      dateConfig={{
        ...getDates(journalEntry?.date, journalEntry?.cadence),
        defaultValue: new Date(journalEntry?.date)
      }}
  />;
};
