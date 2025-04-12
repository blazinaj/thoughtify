import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { DataStore } from '@aws-amplify/datastore';
import { saveItem } from '../functions/saveItem';
import { useForm } from '../hooks/useForm';

/**
 * A button that opens a dialog with a form for creating a database item
 *
 * @param itemParam
 * @param text
 * @param description
 * @param detailsComponent
 * @param title
 * @param model
 * @param onBeforeSubmit
 * @param onAfterSubmit
 * @param fieldConfig
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateItemButton = ({
  item: itemParam = {},
  formButtonIcon,
  text = 'Create Item',
  description,
  detailsComponent,
  title = 'Create an Item',
  model,
  onBeforeSubmit,
  onAfterSubmit,
  fieldConfig = {},
  children
}) => {
  const [open, setOpen] = useState(false);

  const submit = () => {
    // eslint-disable-next-line no-unused-expressions
    onBeforeSubmit && onBeforeSubmit(item);

    saveItem(model, item, DataStore)
      .then((newItem) => {
        setOpen(false);
        setItem(itemParam || {});

        // eslint-disable-next-line no-unused-expressions
        onAfterSubmit && onAfterSubmit(item);
      })
      .catch((e) => {
        console.error('Could not create item. ', e);
      });
  };

  const cancel = () => {
    setOpen(false);
  };

  const [item, setItem] = useState(itemParam || {});

  const displayComponent = detailsComponent || children;

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)} startIcon={formButtonIcon}>
        {text}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent style={{ paddingTop: '1em' }}>
          {description && <DialogContentText>{description}</DialogContentText>}
          {displayComponent ? (
            React.cloneElement(displayComponent, { item, setItem, toggleModal: () => setOpen(false) })
          ) : (
            <DefaultForm item={item} fieldConfig={fieldConfig} setItem={setItem} model={model} />
          )}
        </DialogContent>
        {model && (
          <DialogActions>
            <Button onClick={cancel} color="primary">
              Cancel
            </Button>
            <Button onClick={submit} color="primary">
              Submit
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

const DefaultForm = ({ item, setItem, fieldConfig, model }) => {
  const form = useForm({
    model,
    fieldConfig,
    disableSubmitButton: true,
    disableResetButton: true
  });

  return form.display;
};
