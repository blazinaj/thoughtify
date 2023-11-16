import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { IconButton, Input, InputAdornment, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import micFill from '@iconify/icons-eva/mic-fill';
import roundSend from '@iconify/icons-ic/round-send';

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  border: '1px solid lightGrey',
  borderRadius: '16px',
  width: '100%'
  // marginBottom: "3em"
}));

// ----------------------------------------------------------------------

export default function ThoughtInputField({ disabled, onSend, onFocus, onSubmit, ...other }) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!message) {
      return '';
    }
    if (onSubmit) {
      onSubmit({
        input: message
      });
    }
    return setMessage('');
  };

  return (
    <RootStyle {...other}>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder="Save a thought..."
        startAdornment={
          <InputAdornment position="start">
            <Stack direction="row" spacing={0.5} mr={1.5}>
              <IconButton disabled={disabled} size="small">
                <Icon icon={micFill} width={24} height={24} />
              </IconButton>
            </Stack>
          </InputAdornment>
        }
        sx={{ height: '100%' }}
      />

      <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{ mx: 1 }} size="large">
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </RootStyle>
  );
}
