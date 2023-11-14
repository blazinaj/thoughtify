import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DefaultModalButton } from '../components/DefaultModalButton';
import { useGUID } from '../../useGUID';

export const useModal = ({
  title,
  subTitle,
  children,
  buttonText = 'Open',
  button: buttonInput = <DefaultModalButton text={buttonText} />,
  width
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(!isOpen);

  const [id] = useGUID();

  const modal = (
    <Dialog id={id} open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="lg">
      {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {subTitle && <DialogContentText>{subTitle}</DialogContentText>}
        <br style={{ marginBottom: '1em' }} />
        {children}
      </DialogContent>
      {/* <DialogActions> */}
      {/*  <Button onClick={handleClose} color="primary"> */}
      {/*    Cancel */}
      {/*  </Button> */}
      {/*  <Button onClick={handleClose} color="primary"> */}
      {/*    Subscribe */}
      {/*  </Button> */}
      {/* </DialogActions> */}
    </Dialog>
  );

  const onButtonClick = () => {
    console.log('opening modal');
    setIsOpen((op) => !op);
  };

  const button = React.cloneElement(buttonInput, { onClick: onButtonClick });

  const modalButton = (
    <span>
      {modal}
      {button}
    </span>
  );

  return {
    button,
    modalButton,
    modal,
    setIsOpen,
    isOpen
  };
};

export const ModalButton = (props) => useModal(props).modalButton;
