import Page from "../../utils/components/Page";
import {Container, Grid} from "@mui/material";
import useSettings from "../../utils/hooks/useSettings";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {ThoughtInput} from "../../views/Thoughts/ThoughtInput";
import {ThoughtGallery} from "../../views/Thoughts/ThoughtGallery";
import {ThoughtExtracts} from "../../views/Thoughts/ThoughtExtracts";

/**
 * This page displays the details of a course for a Teacher
 * @returns {JSX.Element}
 * @constructor
 */
const ThoughtsPage = () => {

  const {themeStretch} = useSettings();

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thoughts"
          links={[
            // {name: 'Home', href: 'thoughts'},
          ]}
        />
        <Grid container spacing={3}>

          <Grid item xs={12}>

            <ThoughtInput/>

          </Grid>

          <Grid item xs={12}>

            <ThoughtExtracts/>

          </Grid>

          <Grid item xs={12}>

            <ThoughtGallery/>

          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}

export default ThoughtsPage;