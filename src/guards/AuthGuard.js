import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

/**
 * AuthGuard is a custom component that wraps the AWS Amplify Authenticator component.
 * It is used to provide a custom UI for the login form and to provide a custom
 * user context provider for the application.
 *
 * AuthGuard initializes the UserContextProvider for the rest of the Application.
 * @param children
 * @param isPassedToWithAuthenticator
 * @param signOut
 * @param user
 * @returns {JSX.Element}
 * @constructor
 */
const AuthGuard = ({ children, isPassedToWithAuthenticator, signOut, user }) => {
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return children;
};

/**
 * Custom Header logo on top of the login form
 * @type {StyledComponent<MUIStyledCommonProps<Theme>, JSX.IntrinsicElements[string], {}>}
 */
const HeaderLogo = styled('img')(({ theme }) => ({
  borderRadius: '5px'
}));

/**
 * Custom components for AWS Amplify Authenticator UI
 * @type {{Header(): JSX.Element}}
 */
const components = {
  // Custom Header logo on top of the login form
  Header() {
    return (
      <div>
        <HeaderLogo src={'/static/brand/Thoughtify-Logo.svg'} alt="logo" />
      </div>
    );
  }
};

export default withAuthenticator(AuthGuard, { components });
