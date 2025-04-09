// material
import {styled} from '@mui/material/styles';
// components
import Page from '../../demo/components/Page';
import {LandingMinimal} from '../../demo/components/_external-pages/landing';
import LandingHero from './LandingHero';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

/**
 * The Main landing page for the website.
 *
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function LandingPage() {
  return (
    <RootStyle title="Thoughtify" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingMinimal />
      </ContentStyle>
    </RootStyle>
  );
}
