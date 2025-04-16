import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import attach from '@iconify/icons-eva/attach-2-fill';

export const ThoughtInputAttachmentButton = ({ disabled, toggleListening, onClick }) => {
  return (
    <IconButton disabled={disabled} size="small" onClick={onClick}>
      <Icon icon={attach} width={24} height={24} />
    </IconButton>
  );
};
