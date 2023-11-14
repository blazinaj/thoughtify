import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { deleteItem } from '../functions/deleteItem';

/**
 * A button that allows the user to delete an item from the database
 *
 * @param item
 * @param model
 * @param onBeforeDelete
 * @param onAfterDelete
 * @returns {JSX.Element}
 * @constructor
 */
export const DeleteItemButton = ({ item, model, onBeforeDelete, onAfterDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    onBeforeDelete && onBeforeDelete(item);
    await deleteItem(model, item);
    onAfterDelete && onAfterDelete(item);
  };

  return <>
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Deleting an Item</DialogTitle>
      <DialogContent>
        <DialogContentText>...</DialogContentText>
      </DialogContent>
      {/* <DialogActions> */}
      {/*  <Button onClick={cancel} color="primary"> */}
      {/*    Cancel */}
      {/*  </Button> */}
      {/*  <Button onClick={submit} color="primary"> */}
      {/*    Submit */}
      {/*  </Button> */}
      {/* </DialogActions> */}
    </Dialog>
    <IconButton
      aria-label="delete"
      onClick={() => handleDelete()}
      size="large"
    >
      <Delete />
    </IconButton>
  </>;
};
