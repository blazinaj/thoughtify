import useSettings from "../../utils/hooks/useSettings";
import Page from "../../utils/components/Page";
import {Container, Grid} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import JournalTimeline from "../../views/Journal/JournalTimeline";
import {Biography} from "../../views/Biography/Biography";

const BiographyPage = () => {

  const {themeStretch} = useSettings();

  return (
    <Page title="Thoughtify Biography">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Biography"
          links={[
            // {name: 'Home', href: 'journal'},
          ]}
        />
        <Grid container spacing={3}>

          <Grid item xs={12}>

            <Biography/>

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BiographyPage;