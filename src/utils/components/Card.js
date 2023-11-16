import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Card as MUICard } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';
import { Add, DeleteForever, MoreVert, Refresh } from '@mui/icons-material';
import Zoom from '@mui/material/Zoom';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { ModalButton } from '../hooks/useModal/hooks/useModal';
import { getIcon } from '../functions/getIcon';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Card({
  title,
  subTitle,
  children,
  style = {},
  route,
  refreshFunction,
  formComponent,
  formButtonText = <Add />,
  formModalTitle,
  formModalSubTitle,
  className
}) {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <MUICard className={`classes.root ${className || ''}`} variant="outlined" style={style}>
      <CardHeader
        action={
          <ButtonGroup>
            {formComponent && (
              <ModalButton buttonText={formButtonText} title={formModalTitle} subTitle={formModalSubTitle}>
                {React.cloneElement(formComponent)}
              </ModalButton>
            )}
            {refreshFunction && (
              <IconButton onClick={refreshFunction} size="large">
                <Refresh />
              </IconButton>
            )}
          </ButtonGroup>
        }
        title={title}
        subheader={subTitle}
      />
      <CardContent>{children}</CardContent>
    </MUICard>
  );
}

const getActions = ({ refreshFunction, deleteFunction, formComponent, copyFunction, printFunction }) => {
  const actions = [];

  if (formComponent) {
    actions.push({ icon: <Add />, name: 'Create' });
  }

  if (copyFunction) {
    actions.push({ icon: <FileCopyIcon />, name: 'Copy' });
  }

  if (printFunction) {
    actions.push({ icon: <PrintIcon />, name: 'Print' });
  }

  if (deleteFunction) {
    actions.push({ icon: <DeleteForever />, name: 'Delete' });
  }

  return actions;
};

export const SpeedDials = ({ refreshFunction, deleteFunction, formComponent, duplicationFunction }) => {
  const [direction, setDirection] = React.useState('left');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const actions = getActions({ refreshFunction, deleteFunction, formComponent, duplicationFunction });

  return (
    <SpeedDial
      ariaLabel="speed-dieal"
      FabProps={{
        size: 'small',
        color: '#abc123'
      }}
      hidden={false}
      icon={
        open ? (
          <Zoom children={open ? <Refresh /> : <MoreVert />} in={open} />
        ) : (
          <Zoom children={open ? <Refresh /> : <MoreVert />} in={!open} />
        )
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={direction}
      onClick={() => refreshFunction && refreshFunction()}
    >
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
      ))}
    </SpeedDial>
  );
};
