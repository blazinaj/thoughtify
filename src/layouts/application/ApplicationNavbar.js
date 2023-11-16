import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Box, IconButton, Slide, Stack, Toolbar } from '@mui/material';
// hooks
import useCollapseDrawer from '../../utils/hooks/useCollapseDrawer';
// components
import { MHidden } from '../../demo/components/@material-extend';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

ApplicationNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

/**
 * Main navbar for the application. Slides in and out depending on scroll position.
 *
 * Holds the search bar, account popover, language popover, contacts popover, and notifications popover.
 * @param onOpenSidebar
 * @returns {JSX.Element}
 * @constructor
 */
export default function ApplicationNavbar({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer();

  const [show, setShow] = useState(true);

  /**
   * Automatically hides the top navbar after scrolling down, and shows when scrolling up
   */
  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    window.addEventListener('scroll', (e) => {
      // Get the new Value
      currentScrollPosition = window.pageYOffset;

      //Subtract the two and conclude
      if (previousScrollPosition - currentScrollPosition < -10) {
        setShow(false);
      } else if (previousScrollPosition - currentScrollPosition > 10) {
        setShow(true);
      }

      // Update the previous value
      previousScrollPosition = currentScrollPosition;
    });
  }, []);

  return (
    <Slide direction={'down'} in={show}>
      <RootStyle
        sx={{
          ...(isCollapse && {
            width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
          })
        }}
      >
        <ToolbarStyle>
          <MHidden width="lgUp">
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }} size="large">
              <Icon icon={menu2Fill} />
            </IconButton>
          </MHidden>

          <Searchbar />

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <LanguagePopover />
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
        </ToolbarStyle>
      </RootStyle>
    </Slide>
  );
}
