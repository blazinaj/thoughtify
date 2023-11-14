import {Icon} from '@iconify/react';
import {useSnackbar} from 'notistack';
import {useRef, useState} from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {alpha, styled} from '@mui/material/styles';
import {Box, Button, Divider, MenuItem, Typography} from '@mui/material';
// routes
// hooks
import useAuth from '../../utils/hooks/useAuth';
import useIsMountedRef from '../../utils/hooks/useIsMountedRef';
// components
import {MIconButton} from '../../demo/components/@material-extend';
import MyAvatar from '../../demo/components/MyAvatar';
import MenuPopover from '../../demo/components/MenuPopover';
import {Auth} from "@aws-amplify/auth";
import {DataStore} from "@aws-amplify/datastore";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '/user/account',
  }
];

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
  margin: "1em",
}));

// ----------------------------------------------------------------------

/**
 * The user menu in header after logged in
 *
 * Contains menu options for Home, Profile, and Settings
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {

      console.log('Clearing Datastore..')
      await DataStore.clear()

      await Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err))
        .finally(() => {

        })
      navigate('/');
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <MyAvatar />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
