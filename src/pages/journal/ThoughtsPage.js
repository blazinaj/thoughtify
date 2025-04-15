import Page from '../../utils/components/Page';
import { Box, Button, Container, useMediaQuery } from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import Thoughts from '../thoughts/components/Thoughts';
import ButtonGroup from '@mui/material/ButtonGroup';
import { JournalCadence } from '../../models';
import { useState } from 'react';
import { useTheme } from '../../theme/useTheme';
import Scrollbar from '../../demo/components/Scrollbar';

/**
 * Displays the main Thoughts page for the user.
 * @returns {JSX.Element}
 * @constructor
 */
const ThoughtsPage = () => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'} id={'thoughts-page'}>
        <HeaderBreadcrumbs
          heading="Journal"
          subHeading={'Collect your Thoughts and extract Insights'}
          icon={'carbon:book'}
        />
        <Thoughts/>
      </Container>
    </Page>
  );
};

export default ThoughtsPage;
