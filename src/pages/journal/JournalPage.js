import useSettings from '../../utils/hooks/useSettings';
import Page from '../../utils/components/Page';
import { Box, Button, Container, Grid, useMediaQuery } from '@mui/material';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import JournalTimeline from './components/JournalTimeline';
import ButtonGroup from '@mui/material/ButtonGroup';
import { JournalCadence } from '../../models';
import { useState } from 'react';
import { useTheme } from '../../theme/useTheme';

/**
 * Displays Journal Entries for the user.
 * A Journal Entry is a collection of thoughts that are grouped together by a date based on the cadence.
 * The cadence can be daily, weekly, monthly, or yearly.
 * The journal entries are created automatically by the AI based on the user's thoughts.
 * @returns {JSX.Element}
 * @constructor
 */
const JournalPage = () => {
  const { themeStretch } = useSettings();

  const [cadence, setCadence] = useState(JournalCadence.DAILY || 'DAILY');

  const { theme } = useTheme();

  const smallToMid = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const cadenceOptions = [
    'CURRENT',
    JournalCadence.DAILY,
    JournalCadence.WEEKLY,
    JournalCadence.MONTHLY,
    JournalCadence.YEARLY,
    'BIOGRAPHY'
  ];

  return (
    <Page title="Thoughtify Journal">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          icon={'carbon:book'}
          heading="Journal"
          subHeading={'View your Thoughts in an AI-Generated Journal format at the cadence of your choosing.'}
          action={
            <Box display="flex" justifyContent="left">
              <ButtonGroup orientation={smallToMid ? 'vertical' : 'horizontal'} size={'small'}>
                {cadenceOptions.map((cadenceEnum) => {
                  return (
                    <Button
                      key={cadenceEnum}
                      onClick={() => {
                        setCadence(cadenceEnum);
                      }}
                      variant={cadence === cadenceEnum ? 'contained' : 'outlined'}
                      size={'small'}
                    >
                      {cadenceEnum}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Box>
          }
        />
        <Grid container spacing={3}>
          <Grid item xs={12} key={`journal-timeline-container-${cadence}`}>
            <JournalTimeline cadence={cadence} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default JournalPage;
