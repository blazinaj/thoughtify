import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DefaultModalButton } from '../components/DefaultModalButton';
import { useGUID } from '../../useGUID';
import CloseIcon from "@mui/icons-material/Close";
import {Box, Button, IconButton, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {getIcon} from "../../../functions/getIcon";

export const useModal = ({
  title,
  subTitle,
  children,
  buttonText = 'Open',
  button: buttonInput = <DefaultModalButton text={buttonText} />,
  width,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(!isOpen);

  const [id] = useGUID();

  const modal = (
    <Dialog
      id={id}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <AppBar sx={{ position: 'relative', paddingBottom: "1em" }}>
        {
          title && (
            <DialogTitle
              id="form-dialog-title"
            >
              {
                icon && (
                  <Box
                    component="flex"
                    alignContent={"bottom"}
                    justifyContent={"bottom"}
                    sx={{
                      marginRight: "0.5em",
                      marginTop: "1em",
                    }}
                  >
                    {
                      icon && (
                        getIcon(icon)
                      )
                    }
                  </Box>
                )
              }
              {title}
            </DialogTitle>
          )
        }
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </AppBar>
      <DialogContent>
        {subTitle && <DialogContentText>{subTitle}</DialogContentText>}
        <br style={{ marginBottom: '1em' }} />
        {
          children && React.cloneElement(
            children,
            {
              handleClose,
            }
          )
        }
      </DialogContent>
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
