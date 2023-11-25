import {handleCompletion} from "../../../utils/openai/functions/generate";
import {JournalEntry} from "../../../models";

export const handleJournalEntryCompletion = async (
    {
      thoughts,
      cadence = JournalEntry.DAILY || "DAILY",
      journalEntry,
      tone = "neutral, factual",
        date,
    }) => {
  console.log('handling journal entry completion')

  let prompt;

  const monthlyPrompt = `
    This is a monthly journal entry for the month of: ${date}. Write it as if you are summarizing your thoughts for the month.
  `

    const weeklyPrompt = `
    This is a weekly journal entry for the week of: ${date}. Write it as if you are summarizing your thoughts for the week.
    
    `

    const dailyPrompt = `
    This is a daily journal entry for the day of: ${date}. Write it as if you are summarizing your thoughts for the day.
    `

  const annualPrompt = `
    This is an annual journal entry for the year of: ${date}. Write it as if you are summarizing your thoughts for the year.
  `

  const getCadencePrompt = (cadence) => {
    switch (cadence) {
      case JournalEntry.DAILY:
        return dailyPrompt;
      case JournalEntry.WEEKLY:
        return weeklyPrompt;
      case JournalEntry.MONTHLY:
        return monthlyPrompt;
      case JournalEntry.YEARLY:
        return annualPrompt;
      default:
        return dailyPrompt;
    }
  }

  if (journalEntry) {
    prompt = `
        ${getCadencePrompt(cadence)}
      Update this ${cadence} journal entry and incorporate the following new thoughts:
      
      Journal Entry: ${journalEntry}
      
      New Thoughts: 
      ${thoughts
        .map((thought) => {
          return thought?.extract?.summary || thought?.input;
        })
        .join('\n')
      }
      
      Tone: ${tone}
      
      Be short and to the point.
      
      Journal Entry:
      
    `
  }
  else {
    prompt = `
    ${getCadencePrompt(cadence)}
    Generate a ${cadence} journal entry which summarizes the following thoughts:
    
    ${thoughts
    .map((thought) => {
      return thought?.extract?.summary || thought?.input;
    })
    .join('\n')}
    
    Tone: ${tone}
    
    Be short and to the point.
    
    Journal Entry: 
    
  `;
  }

  const seeds = {
    [JournalEntry.DAILY]: 101,
    [JournalEntry.WEEKLY]: 102,
    [JournalEntry.MONTHLY]: 103,
    [JournalEntry.YEARLY]: 104,
  }

  const completion = await handleCompletion({
    prompt,
    seed: seeds[cadence] || 500,
    responseFormat: null
  });

  return completion;
}