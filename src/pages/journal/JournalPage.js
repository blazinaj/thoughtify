import useSettings from '../../utils/hooks/useSettings';
import Page from '../../utils/components/Page';
import {Box, Button, Container, Grid} from '@mui/material';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import JournalTimeline from '../../views/Journal/JournalTimeline';
import ButtonGroup from "@mui/material/ButtonGroup";
import {JournalCadence} from "../../models";
import {useState} from "react";

const JournalPage = () => {
  const { themeStretch } = useSettings();

  const [cadence, setCadence] = useState(JournalCadence.DAILY);

  return (
    <Page title="Thoughtify Journal">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Journal"
          links={
            [
              // {name: 'Home', href: 'journal'},
            ]
          }
        />
        <Grid container spacing={3}>
          <Grid item xs={12} alignItems={"center"}>
            <Box
              // alignItems={"center"}
              display="flex"
              justifyContent="left"
            >
              <ButtonGroup>
                {
                  Object.values(JournalCadence).map((cadenceEnum) => {
                    return (
                      <Button
                        key={cadenceEnum}
                        onClick={() => {
                          setCadence(cadenceEnum);
                        }}
                        variant={cadence === cadenceEnum ? 'contained' : 'outlined'}
                      >
                        {cadenceEnum}
                      </Button>
                    )
                  })
                }
              </ButtonGroup>
            </Box>

          </Grid>
          <Grid item xs={12} key={`journal-timeline-container-${cadence}`}>
            <JournalTimeline cadence={cadence} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default JournalPage;
