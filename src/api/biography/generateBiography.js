import {DataStore} from "@aws-amplify/datastore";
import {Biography, JournalCadence, Thought} from "../../models";
import {handleCompletion} from "../../utils/openai/functions/generate";
import {isBiographyUpToDate} from "./isBiographyUpToDate";
import {getLatestBiography} from "./getLatestBiography";

export const generateBiography = async () => {
    const biographies = await DataStore.query(Biography);

    const isUpToDate = isBiographyUpToDate({ biographies, cadence: JournalCadence.DAILY });

    if (isUpToDate) {
        // eslint-disable-next-line consistent-return
        return JSON.parse(getLatestBiography({ biographies }).entry);
    }

    const thoughts = await DataStore.query(Thought);

    const prompt = `
      Generate a biography based on the following user's thoughts:
      
      ${thoughts
    .map((thought) => {
        return `${thought?.date || thought.createdAt} - ${thought?.extract?.summary || thought.input}`;
    })
    .join('\n')}
      
      Output the biography as a collection of pages. Javascript parseable JSON array of strings.
     
    `;

    const completion = await handleCompletion({
        prompt,
        maxTokens: 4096,
        seed: 303,
        responseFormat: { type: 'json_object' }
    });

    const parsedBiography = JSON.parse(completion);

    await DataStore.save(
        new Biography({
            date: new Date().toISOString(),
            entry: completion,
            cadence: JournalCadence.DAILY
        })
    );

    return parsedBiography;
};
