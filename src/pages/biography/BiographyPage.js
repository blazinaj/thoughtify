import useSettings from '../../utils/hooks/useSettings';
import Page from '../../utils/components/Page';
import {Container, Grid} from '@mui/material';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import {BiographyDisplay} from "../../views/Biography/BiographyDisplay";
// import {BiographyDisplay} from '../../views/BiographyDisplay/BiographyDisplay';

const BiographyPage = () => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Thoughtify Biography">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Biography"
          subHeading={"View your Thoughts as an AI-Generated Biography."}
          icon={'prime:book'}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BiographyDisplay />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default BiographyPage;
