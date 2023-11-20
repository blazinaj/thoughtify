import {createJournalTimeline} from "./createJournalTimeline";
import {handleCompletion} from "../../../utils/openai/functions/generate";

export const generateJournalEntry = async ({thoughts, journalEntry}) => {
  // for each grouping of thoughts, use completion to create a 'Journal Entry'
  const fetchJournal = async () => {
    const timeline = await createJournalTimeline('day');

    const journal = [];

    for (const group of timeline) {
      const thoughts = group.thoughts;
      const prompt = `
        Generate a journal entry using the following thoughts:
        
        ${thoughts
      .map((thought) => {
        return thought?.extract?.summary || thought?.input;
      })
      .join('\n')}
      `;
      const completion = await handleCompletion({
        prompt,
        seed: 202,
        responseFormat: null
      });

      journal.push({
        date: group.date,
        entry: completion
      });
    }

    return journal;
  };

  return await fetchJournal();
}