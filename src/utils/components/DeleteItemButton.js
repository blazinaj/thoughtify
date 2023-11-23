import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { deleteItem } from '../functions/deleteItem';
import {Button, Typography} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {sentenceCase} from "change-case";

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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    if (onBeforeDelete) {
      await onBeforeDelete(item);
    }

    if (model && item) {
      await deleteItem(model, item);
    }

    setIsDeleting(false);

    if (onAfterDelete) {
      await onAfterDelete(item);
    }

    setDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Are you sure you want to delete this {sentenceCase(model.name || "Item")}?</DialogTitle>
        <DialogContent>
          {
            isDeleting && (
              <Typography>
                Deleting...
              </Typography>
            )
          }
        </DialogContent>
         <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="error">
            No
          </Button>
          <Button onClick={async () => handleDelete()} color="success" disabled={isDeleting}>
            Yes
          </Button>
         </DialogActions>
      </Dialog>
      <IconButton aria-label="delete" onClick={() => setDialogOpen(true)} size="large">
        <Delete />
      </IconButton>
    </>
  );
};
