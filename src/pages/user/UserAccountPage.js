import Page from "../../demo/components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../demo/components/HeaderBreadcrumbs";
import {UserAccount} from "../../views/User/UserAccount";
import useSettings from "../../utils/hooks/useSettings";

/**
 * Displays the User Account Settings page
 * @returns {JSX.Element}
 * @constructor
 */
const UserAccountPage = () => {

  const { themeStretch } = useSettings();

  return (
    <Page title="Edify - Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User Account Settings"
          links={[
            { name: 'User', href: '/user' },
            { name: 'Settings', href: '/user/account' }
          ]}
        />
        <UserAccount/>
      </Container>
    </Page>
  )
}

export default UserAccountPage;