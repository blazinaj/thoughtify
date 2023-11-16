import { createContext, useContext, useEffect, useState } from 'react';
import { Hub } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const initialState = {
  cognitoUser: null
};

const logger = {
  info: (message) => console.log(message)
};

const CognitoContext = createContext(initialState);

const CognitoContextProvider = ({ children }) => {
  const [cognitoUser, setCognitoUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // fetch user attributes, subscribe to user attribute events
  useEffect(() => {
    try {
      const listener = (data) => {
        switch (data?.payload?.event) {
          case 'configured':
            logger.info('the Auth module is configured');
            break;
          case 'signIn':
            logger.info('user signed in');
            console.log({ data: data.payload.data });
            Auth.currentAuthenticatedUser()
              .then(setCognitoUser)
              .finally(() => {
                // if location is the marketing page, navigate to application home

                console.log({ location });

                if (location === '/') {
                  navigate('/home');
                }
              });
            break;
          case 'signIn_failure':
            logger.error('user sign in failed');
            break;
          case 'signUp':
            logger.info('user signed up');
            console.log({ data: data.payload.data });
            Auth.currentAuthenticatedUser().then(setCognitoUser);
            break;
          case 'signUp_failure':
            logger.error('user sign up failed');
            break;
          case 'confirmSignUp':
            logger.info('user confirmation successful');
            break;
          case 'completeNewPassword_failure':
            logger.error('user did not complete new password flow');
            break;
          case 'autoSignIn':
            logger.info('auto sign in successful');
            break;
          case 'autoSignIn_failure':
            logger.error('auto sign in failed');
            break;
          case 'forgotPassword':
            logger.info('password recovery initiated');
            break;
          case 'forgotPassword_failure':
            logger.error('password recovery failed');
            break;
          case 'forgotPasswordSubmit':
            logger.info('password confirmation successful');
            break;
          case 'forgotPasswordSubmit_failure':
            logger.error('password confirmation failed');
            break;
          case 'verify':
            logger.info('TOTP token verification successful');
            break;
          case 'tokenRefresh':
            logger.info('token refresh succeeded');
            break;
          case 'tokenRefresh_failure':
            logger.error('token refresh failed');
            break;
          case 'cognitoHostedUI':
            logger.info('Cognito Hosted UI sign in successful');
            break;
          case 'cognitoHostedUI_failure':
            logger.error('Cognito Hosted UI sign in failed');
            break;
          case 'customOAuthState':
            logger.info('custom state returned from CognitoHosted UI');
            break;
          case 'customState_failure':
            logger.error('custom state failure');
            break;
          case 'parsingCallbackUrl':
            logger.info('Cognito Hosted UI OAuth url parsing initiated');
            break;
          case 'userDeleted':
            logger.info('user deletion successful');
            setCognitoUser(null);
            break;
          case 'updateUserAttributes':
            logger.info('user attributes update successful');
            break;
          case 'updateUserAttributes_failure':
            logger.info('user attributes update failed');
            break;
          case 'signOut':
            logger.info('user signed out');
            setCognitoUser(null);
            break;
          default:
            logger.info('unknown event type');
            break;
        }
      };

      const unlisten = Hub.listen('auth', listener);

      return () => unlisten();
    } catch (e) {
      console.error(e);
    }
  }, []);

  /**
   * Fetch cognito user on page load and set to state.
   * This will trigger a getUser call.
   */
  useEffect(() => {
    console.log('Initial Page Load: Loading Current Authenticated Cognito User..');
    Auth.currentAuthenticatedUser().then((cognitoUser) => {
      console.log('Loaded Currently Authenticated Cognito User: ', cognitoUser);
      setCognitoUser(cognitoUser);
    });
  }, []);

  return (
    <CognitoContext.Provider
      value={{
        cognitoUser
      }}
    >
      {children}
    </CognitoContext.Provider>
  );
};

const useCognitoContext = () => useContext(CognitoContext);

export { CognitoContextProvider, CognitoContext, useCognitoContext };
