import {SpeechToText} from "./SpeechToText";

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

  return (
    <div>

      <SpeechToText/>

    </div>
  )
}