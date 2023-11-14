import {useState} from 'react';
import {Outlet} from 'react-router-dom';
// material
import {styled, useTheme} from '@mui/material/styles';
// hooks
import useCollapseDrawer from '../../utils/hooks/useCollapseDrawer';
//
import ApplicationNavbar from './ApplicationNavbar';
import ApplicationSidebar from './ApplicationSidebar';
import LoadingScreen from "../../demo/components/LoadingScreen";
import {useUserContext} from "../../contexts/UserContext";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

/**
 * Main layout for the application.
 *
 * Displays a header, sidebar, and marketing content.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function ApplicationLayout() {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);

  const {isInitialized} = useUserContext();

  if (!isInitialized) {
    return <LoadingScreen />
  }

  return (
    <RootStyle>
      <ApplicationNavbar onOpenSidebar={() => setOpen(true)} />
      <ApplicationSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...(collapseClick && {
            ml: '102px'
          })
        }}
      >
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
