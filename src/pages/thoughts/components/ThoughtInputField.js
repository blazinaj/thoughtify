import {styled} from '@mui/material/styles';
import {useState} from 'react';
import {Box, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import {Icon} from '@iconify/react';
import micFill from '@iconify/icons-eva/mic-fill';
import roundSend from '@iconify/icons-ic/round-send';
import {useForm} from "../../../utils/hooks/useForm";

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%'
}));

// ----------------------------------------------------------------------

/**
 * Input field for submitting Thoughts.
 */
export default function ThoughtInputField({ disabled, onSubmit, showDateSelector = false, dateConfig = {}, ...other }) {

    /**
     * State for the input field of the Thought.
     */
    const [message, setMessage] = useState('');

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
        inputType: "date",
        dateConfig,
        defaultValue: dateConfig.defaultValue,
      }
    },
    disableResetButton: true,
    disableSubmitButton: true,
  })

    /**
     * Handles the submission of the Thought input field.
     * @returns {Promise<void|string>}
     */
  const handleSend = async () => {
    if (!message) {
      return '';
    }
    if (onSubmit) {
      onSubmit({
        input: message,
        date: showDateSelector ? new Date(form.input.date).toISOString() : new Date().toISOString(),
      });
    }
    return setMessage('');
  };
  
  return (
    <RootStyle {...other}>
      <TextField
        disabled={disabled}
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder="Save a thought..."
        multiline
        InputProps={{
          startAdornment: (
              <InputAdornment position="start">
                  <Stack direction="row" spacing={0.5} mr={1.5}>
                <IconButton disabled={disabled} size="small">
                  <Icon icon={micFill} width={24} height={24} />
                </IconButton>
              </Stack>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{ mx: 1 }} size="large">
                <Icon icon={roundSend} width={24} height={24} />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          height: '100%',
          width: "100%"
      }}
      />

      {
        showDateSelector && (
            <Box
              sx={{
                width: "100%"
              }}
            >
              {form.display}
            </Box>
          )
      }
    </RootStyle>
  );
}