import Page from "../../utils/components/Page";
import {Box, Container, Grid} from "@mui/material";
import {useDatastore} from "../../utils/hooks/useDatastore";
import {useParams} from "react-router-dom";
import useSettings from "../../utils/hooks/useSettings";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {Thought} from "../../models";
import {ThoughtDataCard} from "../../views/Thoughts/ThoughtDataCard";
import {ThoughtInput} from "../../views/Thoughts/ThoughtInput";

/**
 * This page displays the details of a course for a Teacher
 * @returns {JSX.Element}
 * @constructor
 */
const ThoughtsPage = () => {

  const {themeStretch} = useSettings();

  const {id} = useParams()

  const datastore = useDatastore({
    model: Thought,
    itemId: id,
  })


  return (
    <Page title="Thoughts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thoughts"
          links={[
            {name: 'Thoughts', href: 'thoughts'},
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              Thoughts..
            </Box>
          </Grid>

          <Grid item xs={12}>

            <ThoughtInput/>

          </Grid>

          <Grid item xs={12}>
            <ThoughtDataCard/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default ThoughtsPage;