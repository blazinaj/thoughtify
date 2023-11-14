import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { isNullOrUndefined } from '../functions/isNullOrUndefined';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function useSnackbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [message, setMessage] = useState('👍');
  const [color, setColor] = useState('success');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const toast = ({ message, color, log = false }) => {
    log && console.log(message);
    !isNullOrUndefined(message) && setMessage(message);
    !isNullOrUndefined(message) && setColor(color);
    setOpen(true);
  };

  const display = (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={color}
        action={
          <>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return {
    display,
    toast
  };
}

const SnackbarContext = React.createContext({});
