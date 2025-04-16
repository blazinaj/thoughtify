import { Predictions } from '@aws-amplify/predictions';
import { useEffect, useState } from 'react';
import { Thought } from '../../../models';
import { DataStore } from '@aws-amplify/datastore';
import MicrophoneStream from 'microphone-stream';
import { Buffer } from 'buffer';
import { TextField } from '@mui/material';

Buffer.from('anything', 'base64');
// eslint-disable-next-line global-require
window.Buffer = window.Buffer || require('buffer').Buffer;

export function SpeechToText(props) {
  const [response, setResponse] = useState(
    "Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking."
  );

  function AudioRecorder(props) {
    const [recording, setRecording] = useState(false);
    const [micStream, setMicStream] = useState();
    const [audioBuffer] = useState(
      (function () {
        let buffer = [];
        function add(raw) {
          buffer = buffer.concat(...raw);
          return buffer;
        }
        function newBuffer() {
          console.log(' buffer');
          buffer = [];
        }

        return {
          reset: () => {
            newBuffer();
          },
          addData: (raw) => {
            return add(raw);
          },
          getData: () => {
            return buffer;
          }
        };
      })()
    );
    const [timerInterval, setTimerInterval] = useState(null);
    const [transcriptLength, setTranscriptLength] = useState(0);

    // eslint-disable-next-line
    const [inputMessageText, setInputMessageText] = useState('');
    // eslint-disable-next-line
    const [recordedAudio, setRecordedAudio] = useState(null);
    useEffect(() => {
      if (recordedAudio) {
      }
    }, [recordedAudio]);

    async function startRecording() {
      console.log('start recording');
      audioBuffer.reset();

      window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
        // eslint-disable-next-line new-cap
        const startMic = new MicrophoneStream();
        startMic.setStream(stream);
        // startMic.on('data', (chunk) => {
        //   // const raw = MicrophoneStream.toRaw(chunk);
        //   // if (raw == null) {
        //   //   return;
        //   // }
        //   // audioBuffer.addData(raw);
        //
        // });

        // const audioContext = new AudioContext();
        // const micSource = audioContext.createMediaStreamSource(stream);
        // const destination = audioContext.createMediaStreamDestination();
        // micSource.connect(destination);
        //
        // const df = destination.stream;
        //
        // setTimerInterval(
        //   setInterval(() => {
        //     setTranscriptLength((t) => t + 1);
        //   }, 1000)
        // );
        //
        // const recorder = new MediaRecorder(destination.stream, { mimeType: "audio/webm" }); // or "audio/mp4"
        //
        // recorder.addEventListener("dataavailable", async (event) => {
        //   if (event.data.size > 0) {
        //     console.log("recorder data available");
        //     console.log({event})
        //     const raw = MicrophoneStream.toRaw(event.data);
        //     console.log({raw})
        //     audioBuffer.addData([event.data]);
        //
        //     convertFromBuffer(raw);
        //   }
        // });
        //
        // recorder.start(1000)
        //
        // setRecording(true);
        setMicStream(stream);
      });
    }

    async function stopRecording() {
      console.log('stop recording');
      const { finishRecording } = props;

      // if (micStream) {
      //   micStream.getTracks().forEach((track) => track.stop());
      // }

      micStream.stop();
      setMicStream(null);
      setRecording(false);

      const resultBuffer = audioBuffer.getData();

      console.log({ resultBuffer });

      // clearInterval(timerInterval);

      if (typeof finishRecording === 'function') {
        finishRecording(resultBuffer);
      }
    }

    return (
      <div className="audioRecorder">
        <div>
          {recording && <button onClick={stopRecording}>Stop recording</button>}
          {!recording && <button onClick={startRecording}>Start recording</button>}
          <TextField
            variant="outlined"
            placeholder="Transcribe results"
            minRows={10}
            value={inputMessageText}
            readOnly={true}
            multiline
            maxRows={Infinity}
            id="input1"
          />
        </div>
      </div>
    );
  }

  function convertFromBuffer(bytes) {
    setResponse('Converting text...');

    Predictions.convert({
      transcription: {
        source: {
          // bytes: new Blob(bytes)
          bytes
        },
        language: 'en-US' // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
      }
    })
      .then((result) => {
        const { transcription } = result;
        const { fullText } = transcription;

        console.log({ fullText });

        if (fullText && fullText !== '') {
          // save Thought
          DataStore.save(
            new Thought({
              input: fullText
            })
          );
        }

        setResponse(fullText);
      })
      .catch((err) => setResponse(JSON.stringify(err, null, 2)));
  }

  return (
    <div className="Text">
      <div>
        <h3>Speech to text</h3>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <AudioRecorder finishRecording={convertFromBuffer} />

        <p>{response}</p>
      </div>
    </div>
  );
}
