import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import attach2Fill from '@iconify/icons-eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, Button, Card, IconButton, TextField } from '@mui/material';
import { Post } from '../../../../../models';
import { DataStore } from '@aws-amplify/datastore';
import { useUserContext } from '../../../../../contexts/UserContext';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const { user } = useUserContext();

  const [value, setValue] = useState('');

  const onSubmit = async (input) => {
    if (user?.cognitoSub) {
      const d = DataStore.save(
        new Post({
          title: input.title,
          userID: user?.cognitoSub
        })
      );
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        multiline
        fullWidth
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Share what you are thinking here..."
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
          }
        }}
      />

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
            <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
          </IconButton>
          <IconButton size="small" onClick={handleAttach}>
            <Icon icon={attach2Fill} width={24} height={24} />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          onClick={async () => {
            await onSubmit({ title: value });
          }}
        >
          Post
        </Button>
      </Box>

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Card>
  );
}
