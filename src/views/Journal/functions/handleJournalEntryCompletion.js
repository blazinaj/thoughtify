import {handleCompletion} from "../../../utils/openai/functions/generate";
import {JournalEntry} from "../../../models";

export const handleJournalEntryCompletion = async ({thoughts, cadence = JournalEntry.DAILY}) => {
  console.log('handling journal entry completion')
  const prompt = `
    Generate a ${cadence} journal entry which summarizes the following thoughts:
    
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

  return completion;
}