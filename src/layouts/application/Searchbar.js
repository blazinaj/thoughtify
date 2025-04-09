import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/styles';
import { ClickAwayListener, Grid, Slide } from '@mui/material';
import { MIconButton } from '../../demo/components/@material-extend';
import { alpha } from '@mui/material/styles';
import { ApplicationSearchbar } from './ApplicationSearchbar';
import { ThoughtExtracts } from '../../pages/thoughts/components/ThoughtExtracts/components/ThoughtExtracts';
// import {Scrollbar} from "../";
// components

// ----------------------------------------------------------------------

const APPBAR_MOBILE = '80vh';
const APPBAR_DESKTOP = '50vh';

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  // display: 'flex',
  position: 'absolute',
  paddingTop: '2em',
  // alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.95)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <MIconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </MIconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Grid
              container
              spacing={3}
              sx={{
                mt: {
                  md: '1em',
                  lg: '1em'
                }
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} order={{ xs: 2, sm: 2, md: 1, lg: 1 }}>
                <ApplicationSearchbar handleClose={handleClose} />
              </Grid>
            </Grid>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
