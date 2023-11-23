import {JournalCadence} from "../../../models";
import {endOfWeek, getWeek, startOfWeek} from "date-fns";

export const formatDate = (dateParam, groupBy = JournalCadence.DAILY) => {

  let date = new Date(dateParam);

  if (groupBy === JournalCadence.DAILY) {
    date = new Date(dateParam).toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } else if (groupBy === JournalCadence.WEEKLY) {
    date = `${startOfWeek(new Date(dateParam)).toLocaleDateString()} - ${endOfWeek(new Date(dateParam)).toLocaleDateString()}`
  } else if (groupBy === JournalCadence.MONTHLY) {
    date = new Date(dateParam).toLocaleString('default', { month: 'long' });
  } else if (groupBy === JournalCadence.YEARLY) {
    date = new Date(dateParam).getFullYear();
  }

  return date;
}

// creates a timeline item for each date entry (grouped by day, month, or year)
// creates a group for each Day
// [{ date: "2021-10-10", thoughts: [thought1, thought2, thought3] }]
export const createJournalTimeline = async (thoughts, groupBy = JournalCadence.DAILY) => {
  // const thoughts = await DataStore.query(Thought);
  const groups = [];
  thoughts.forEach((thought) => {
    let date = new Date(thought?.date || thought.createdAt);

    if (groupBy === JournalCadence.DAILY) {
      date = new Date(thought?.date || thought.createdAt).toLocaleDateString();
    } else if (groupBy === JournalCadence.WEEKLY) {
      date = `${startOfWeek(new Date(thought?.date || thought.createdAt))} - ${endOfWeek(new Date(thought?.date || thought.createdAt))}`
    } else if (groupBy === JournalCadence.MONTHLY) {
      date = new Date(thought?.date || thought.createdAt).toLocaleString('default', { month: 'long' });
    } else if (groupBy === JournalCadence.YEARLY) {
      date = new Date(thought?.date || thought.createdAt).getFullYear();
    }

    let group = groups.find((group) => {
      return group.formattedDate === date;
    });
    if (!group) {
      group = {
        date: new Date(thought?.date || thought.createdAt),
        formattedDate: date,
        thoughts: []
      };
      groups.push(group);
    }
    group.thoughts.push(thought);
  });

  return groups;
};