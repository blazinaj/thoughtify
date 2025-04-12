import { JournalEntryThoughts, Thought, ThoughtAttributes } from '../../../models';
import { DataStore } from '@aws-amplify/datastore';
import ThoughtInputField from './ThoughtInputField';
import { generateThoughtExtract } from '../../../api/thoughts/generateThoughtExtract';
import { getWeek } from 'date-fns';

/**
 * Input Field for Thoughts.
 * Includes Speech to Text.
 *
 * Displays the AI-generated form of the thought
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtInput = ({ journalEntry }) => {
  const onSubmit = async (input) => {
    const newThought = await DataStore.save(
      new Thought({
        ...input
      })
    );

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
