import { createContext, useContext, useEffect, useState } from 'react';
import { AccountSetupPage } from '../pages/user/AccountSetupPage';
import { useLocation, useNavigate } from 'react-router-dom';
import { setupUserAccount } from '../api/users/setupUserAccount';
import { DataStore } from '@aws-amplify/datastore';
import { Auth, Hub } from 'aws-amplify';
import { getUser } from '../api/users/getUser';
import introJs from 'intro.js';

const initialState = {
  user: null,
  isInitialized: false,
  owner: null,
  attributes: null
};

const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
  const [cognitoUser, setCognitoUser] = useState(null);

  /**
   * TODO: sync user object with database changes
   * Holds the internal user object.
   */
  const [user, setUser] = useState(null);

  const [showAccountSetup, setShowAccountSetup] = useState(false);

  const navigate = useNavigate();

  /**
   * Whether or not the user context has been initialized. If not, then don't render the application.
   */
  const [isInitialized, setIsInitialized] = useState(true);

  const initiateAccountSetup = async () => {
    setShowAccountSetup(true);
  };

  const startOnboarding = async () => {
    return introJs()
      .setOptions({
        steps: [
          {
            title: 'Welcome to Thoughtify! 👋',
            intro: 'Thoughtify empowers your Thoughts. Lets get started!'
          },
          {
            title: 'Collect Your Thoughts',
            intro: 'Whenever you can, add your Thoughts here. This is your personal space to collect your Thoughts.',
            element: '#thoughts-page'
          },
          {
            title: 'Your First Thought',
            intro: 'Get started with your first Thought. We will help you along the way.',
            element: '#thought-input-container'
          },
          {
            title: 'Explore your Thoughts!',
            intro: 'Click on the Thought to see more details about it.',
            element: '#journal-timeline-entry-0'
            //id={`journal-timeline-entry-${index}`}
          }
        ]
      })
      .onbeforechange((targetElement) => {
        if (targetElement.id === 'journal-timeline-entry-0') {
          //
          const input = document.querySelector('#thought-input-submit');
          // click
          if (input) {
            input.click();
          }
        }
      })
      .onafterchange((targetElement) => {
        // thought input, fill in an example thought
        if (targetElement.id === 'thought-input-container') {
          // type the input like a user
          const inputValue = 'I just started onboarding with Thoughtify!';
          const input = document.querySelector('#thought-input-field');
          if (input) {
            // use async to type one letter at a time
            // input.value = '';
            const typeLetter = (letter, delay) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  input.value += letter;
                  resolve();
                }, delay);
              });
            };
            const typeInput = async () => {
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < inputValue.length; i++) {
                await typeLetter(inputValue[i], 100);
              }
            };

            typeInput();
          }
        }
      })
      .start();
  };

  const onAccountSetupComplete = async ({ user, cognitoUser }) => {
    setUser(user);

    setShowAccountSetup(false);
    navigate('/journal');
    startOnboarding();
  };

  /**
   * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
   * @returns {Promise<void>}
   */
  const fetchUser = async ({ username }) => {
    const cognitoUsername = username;

    const user = await getUser({ username: cognitoUsername });

    // When the cognito user changes, fetch the user object.
    // If the user object doesn't exist, then create it.
    if (cognitoUsername) {
      if (user) {
        return user;
      }

      await initiateAccountSetup();
    }
  };

  const onDeleteUser = () => {
    alert('User is deleted');
  };

  // subscribe to auth events
  useEffect(() => {
    // Add an event listener to handle changes in authentication state
    const listener = async (state, data) => {
      const event = state.payload.event;
      if (event === 'signIn') {
        // Redirect the user to the /dashboard route upon successful sign-in
        await DataStore.start();
        const user = await fetchUser({ username: state.payload.data.username });
        setCognitoUser(state.payload.data);
        setUser(user);
        setIsInitialized(true);
        navigate('/journal');
      }

      if (event === 'signUp') {
        await initiateAccountSetup();
      }
    };

    const unsubscribe = Hub.listen('auth', listener);

    return () => {
      // Unsubscribe from the event when the component is unmounted
      unsubscribe();
    };
  }, []);

  const location = useLocation();

  // on page load, check if the user is already signed in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userObject = await fetchUser({
          username: user.username
        });
        setUser(userObject);
        setCognitoUser(user);
        setIsInitialized(true);

        if (location.pathname === '/') {
          navigate('/journal');
        }

        // only for testing
        // startOnboarding()
      } catch (error) {
        setIsInitialized(true);
      }
    };

    checkUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isInitialized,
        owner: user?.username,
        onDeleteUser,
        cognitoUser
      }}
    >
      {showAccountSetup ? (
        <AccountSetupPage
          cognitoUser={cognitoUser}
          setupUserAccount={setupUserAccount}
          onComplete={onAccountSetupComplete}
        />
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, UserContext, useUserContext };
