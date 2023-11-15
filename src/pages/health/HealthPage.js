import useSettings from "../../utils/hooks/useSettings";
import Page from "../../utils/components/Page";
import {Container, Grid} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import JournalTimeline from "../../views/Journal/JournalTimeline";
import {Health} from "../../views/Health/Health";

const JournalPage = () => {

  const {themeStretch} = useSettings();

  return (
    <Page title="Thoughtify Health">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Health"
          links={[
            // {name: 'Home', href: 'journal'},
          ]}
        />
        <Grid container spacing={3}>

          <Grid item xs={12}>

            <Health/>

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default JournalPage;