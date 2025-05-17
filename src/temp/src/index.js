import {generateThoughtExtract} from "./functions/generateThoughtExtract.js";
import {linkAttributes} from "./functions/linkAttributes.js";

 export const handler = async (event) => {
  // console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
      const thought = event.arguments.input;

      // pulls attribute strings from thought
      const thoughtExtract = await generateThoughtExtract({
          thought,
      })

      // console.log(`Thought Extract: ${JSON.stringify(thoughtExtract)}`)

      // links thought to attribute database objects or creates new objects. Performs upserts as necessary.
      const linkedAttributes = await linkAttributes({
          thought,
          thoughtExtract,
      })

      // console.log(`Linked Attributes: ${JSON.stringify(linkedAttributes)}`)


      return {
          statusCode: 200,
            body: JSON.stringify({
            thoughtExtract,
                linkedAttributes
            },
            )
      }
  }
    catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
            error: 'An error occurred while processing the request.',
            }),
        };
    }
};