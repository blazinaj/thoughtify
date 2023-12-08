import Page from '../../utils/components/Page';
import {Container} from '@mui/material';
import useSettings from '../../utils/hooks/useSettings';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import Thoughts from "./components/Thoughts";

/**
 * This page displays the details of a course for a Teacher
 * @returns {JSX.Element}
 * @constructor
 */
const ThoughtsPage = () => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Thoughtify">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thoughts"
          subHeading={"Collect your Thoughts and extract Insights"}
          icon={'mingcute:thought-line'}
        />
        <Thoughts/>
      </Container>
    </Page>
  );
};

export default ThoughtsPage;
