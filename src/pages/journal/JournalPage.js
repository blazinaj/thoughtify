import useSettings from "../../utils/hooks/useSettings";
import Page from "../../utils/components/Page";
import {Container, Grid} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import JournalTimeline from "../../views/Journal/JournalTimeline";

const JournalPage = () => {

  const {themeStretch} = useSettings();

  return (
    <Page title="Thoughtify Journal">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Journal"
          links={[
            // {name: 'Home', href: 'journal'},
          ]}
        />
        <Grid container spacing={3}>

          <Grid item xs={12}>

            <JournalTimeline/>

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default JournalPage;