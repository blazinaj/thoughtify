import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField
} from '@mui/material';
import { Icon } from '@iconify/react';
import roundSend from '@iconify/icons-ic/round-send';
import { useForm } from '../../../utils/hooks/useForm';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ThoughtInputMicButton } from './ThoughtInputMicButton';
import { ThoughtInputAttachmentButton } from './ThoughtInputAttachmentButton';
import prettyBytes from 'pretty-bytes';

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%'
}));

// ----------------------------------------------------------------------

/**
 * Input field for submitting Thoughts.
 */
export default function ThoughtInputField({ disabled, onSubmit, showDateSelector = false, dateConfig = {}, ...other }) {
  const [loading, setLoading] = useState(false);

  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition({
    clearTranscriptOnListen: true,
    transcribing: true
  });
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  /**
   * State for the input field of the Thought.
   */
  const [message, setMessage] = useState('');

  const [attachments, setAttachments] = useState([]);

  /**
   * Handles the change of the input field for the Thought.
   * @param event
   */
  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  /**
   * Handles the Enter key for the input field
   * @param event
   */
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  /**
   * Form for selecting the date of a thought
   * @type {{display: *, input: {}}}
   */
  const form = useForm({
    fieldConfig: {
      date: {
        inputType: 'date',
        dateConfig,
        defaultValue: dateConfig.defaultValue
      }
    },
    disableResetButton: true,
    disableSubmitButton: true
  });

  /**
   * Handles the submission of the Thought input field.
   * @returns {Promise<void|string>}
   */
  const handleSend = async () => {
    setLoading(true);

    SpeechRecognition.stopListening();
    resetTranscript();

    if (!message) {
      return '';
    }
    if (onSubmit) {
      await onSubmit({
        input: message,
        date: showDateSelector ? new Date(form.input.date).toISOString() : new Date().toISOString(),
        attachments
      });

      setAttachments([]);
      setMessage('');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      startListening();
    }
  };

  const handleAttachment = () => {};

  const fileRef = useRef(null);

  const handleAttachmentButtonClick = () => {
    fileRef?.current?.click();
  };

  return (
    <RootStyle {...other}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <TextField
            id={'thought-input-field'}
            disabled={disabled || loading}
            value={message}
            onKeyUp={handleKeyUp}
            onChange={handleChangeMessage}
            placeholder="Save a thought..."
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Stack direction="row" spacing={0.5} mr={1.5}>
                    <ThoughtInputMicButton
                      toggleListening={toggleListening}
                      disabled={!browserSupportsSpeechRecognition}
                      listening={listening}
                    />
                    <ThoughtInputAttachmentButton onClick={handleAttachmentButtonClick} />
                  </Stack>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    id={'thought-input-submit'}
                    color="primary"
                    disabled={!message || loading}
                    onClick={handleSend}
                    sx={{ mx: 1 }}
                    size="large"
                  >
                    <Icon icon={loading ? 'svg-spinners:8-dots-rotate' : roundSend} width={24} height={24} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              height: '100%',
              width: showDateSelector ? '80%' : '100%'
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: attachments?.length > 0 ? undefined : 'none'
          }}
        >
          <input
            ref={fileRef}
            type={'file'}
            style={{ display: 'none' }}
            onChange={(event) => {
              const files = event.target.files;
              if (files.length > 0) {
                // add the URL at this time
                //URL.createObjectURL(attachment)
                setAttachments((prevState) => [
                    ...prevState,
                  ...Array.from(files)
                ].map((file) => {
                  file.url = URL.createObjectURL(file);
                    return file;
                }));
              }
            }}
          />
          <List>
            {attachments.map((attachment, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    disabled={loading}
                    onClick={() => {
                      setAttachments((prevState) => prevState.filter((_, i) => i !== index));
                    }}
                  >
                    <Icon icon="material-symbols:cancel-outline-rounded" width={24} height={24} />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={attachment.url} />
                </ListItemAvatar>
                <ListItemText primary={attachment.name} secondary={prettyBytes(attachment.size)} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
