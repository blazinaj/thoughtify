import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import React from 'react';
import {useModal} from '../../../utils/hooks/useModal';
import {ThoughtAttachments} from './ThoughtAttachments';
import {AudioFile as Audio, FilePresent as File, Photo, Videocam as Video} from '@mui/icons-material';
import prettyBytes from 'pretty-bytes';

export const ThoughtAttachmentsList = ({ attachments }) => {
  return (
    <List>
      {attachments.map((attachment, index) => (
        <AttachmentListItem key={index} attachment={attachment} />
      ))}
    </List>
  );
};

export const AttachmentListItem = ({ attachment }) => {
  const modal = useModal({
    title: 'Attachment',
    children: <ThoughtAttachments attachments={[attachment]} />,
    fullScreen: true,
  });

  const getFileTypeIcon = (file) => {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return <Photo />;
      case 'video':
        return <Video />;
      case 'audio':
        return <Audio />;
      default:
        return <File />;
    }
  };

  return (
    <ListItem
    // secondaryAction={
    //     <IconButton edge="end" aria-label="delete" onClick={() => {
    //         // setAttachments((prevState) => prevState.filter((_, i) => i !== index));
    //     }}
    //     >
    //         <Icon icon="material-symbols:cancel-outline-rounded" width={24} height={24} />
    //     </IconButton>
    // }
    >
      {modal.modal}
      <ListItemButton onClick={() => modal.setIsOpen(true)}>
        <ListItemIcon>{getFileTypeIcon(attachment)}</ListItemIcon>
        <ListItemText primary={attachment.name} secondary={prettyBytes(attachment.size)} />
      </ListItemButton>
    </ListItem>
  );
};
