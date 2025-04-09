import useSettings from '../../utils/hooks/useSettings';
import Page from '../../utils/components/Page';
import { Container } from '@mui/material';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import { BiographyDisplay } from './components/BiographyDisplay';

/**
 * BiographyPage component
 * @returns {JSX.Element}
 * @constructor
 */
const BiographyPage = () => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Thoughtify Biography">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Biography"
          subHeading={'View your Thoughts as an AI-Generated Biography.'}
          icon={'prime:book'}
        />
        <BiographyDisplay />
      </Container>
    </Page>
  );
};

export default BiographyPage;
