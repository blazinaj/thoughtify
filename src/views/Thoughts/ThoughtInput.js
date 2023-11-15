import {SpeechToText} from "./SpeechToText";
import {Grid} from "@mui/material";
import {useForm} from "../../utils/hooks/useForm";
import {Thought} from "../../models";
import {DataStore} from "@aws-amplify/datastore";
import {generate, handleCompletion} from "../../utils/openai/functions/generate";

/**
 * Input Field for Thoughts.
 * Includes Speech to Text.
 *
 * Displays the AI-generated form of the thought
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtInput = () => {

  // const transcribe = async () => {
  //   Predictions.convert({
  //     transcription: {
  //       source: {
  //         bytes
  //       }
  //       // language: "en-US",
  //     }
  //   })
  //   .then(({ transcription: { fullText } }) => console.log({ fullText }))
  //   .catch((err) => console.log({ err }));
  // }

  /**
   * Similar thoughts
   * Emotions
   * People
   * Projects
   * Categories
   * @returns {Promise<void>}
   */
  const getThoughtExtract = async (newThought) => {

    const existingThoughts = await DataStore.query(Thought)

    const _prompt = `
      Existing Thoughts:
      
      ${existingThoughts.map((thought) => {
          return `${thought.extract ? JSON.stringify(thought.extract) : thought.input}`
        }).join("\n")
      }
    
      Analyze this person's new thought and extract the following:
      
      Summary
      Similar thoughts
      Emotions
      People
      Projects
      Categories
      
      New Thought:
      ${newThought.input}
      
      Format the response as a javascript parseable JSON object string
      
    `
    const response = await handleCompletion({
      prompt: _prompt,
      response_format: { type: "json_object" },
      seed: 101,
    })

    console.log({response})

    // update the thought in the datastore
    await DataStore.save(
      Thought.copyOf(newThought, updated => {
        updated.extract = response
      })
    )

  }

  const form = useForm({
    model: Thought,
    fieldConfig: {
      input: {
        type: 'textarea',
        label: 'Thought',
      }
    },
    callback: getThoughtExtract,
  })

  return (
    <div>

      <Grid container spacing={2}>
        <Grid item lg={12}>
          {form.display}
        </Grid>
      </Grid>

      {/*<SpeechToText/>*/}

    </div>
  )
}