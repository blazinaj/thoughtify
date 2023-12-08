import {createContext, useContext, useEffect, useState} from 'react';
import {AccountSetupPage} from '../pages/user/AccountSetupPage';
import {useLocation, useNavigate} from 'react-router-dom';
import {setupUserAccount} from '../api/users/setupUserAccount';
import {DataStore} from '@aws-amplify/datastore';
import {Auth, Hub} from "aws-amplify";
import {getUser} from "../api/users/getUser";

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

  const onAccountSetupComplete = async ({ user, cognitoUser }) => {
    console.log('Account Setup Complete', { user, cognitoUser });
    setUser(user);

    setShowAccountSetup(false);
    navigate('/thoughts');
  };

  /**
   * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
   * @returns {Promise<void>}
   */
  const fetchUser = async ({ username }) => {
    const cognitoUsername = username;

    console.log('Fetching User Object', { cognitoUsername });
    // const user = await DataStore.query(User, (user) => user.cognitoSub.eq(cognitoUsername));
    const user = await getUser({ username: cognitoUsername });

    console.log('CURRENT USER OBJECT: ', user);
    // console.log({user2})

    // When the cognito user changes, fetch the user object.
    // If the user object doesn't exist, then create it.
    if (cognitoUsername) {
      if (user) {
        return user;
      }
      
        console.log('NO CURRENT USER OBJECT, INITIATING ACCOUNT SETUP');

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

      console.log({
        state,
        data
      })
      console.log({ event })
      if (event === 'signIn') {

        console.log("User has signed in")
        // Redirect the user to the /dashboard route upon successful sign-in
        await DataStore.start();
        console.log('Fetching User from Database')
        const user = await fetchUser({ username: state.payload.data.username });
        console.log('User Fetched from Database', { user });
        setCognitoUser(state.payload.data)
        setUser(user)
        setIsInitialized(true);
        navigate('/thoughts');
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
            console.log('User is signed in');
            console.log({ user });
            const userObject = await fetchUser({
                username: user.username
            })
            console.log({ userObject })
              setUser(userObject)
            setCognitoUser(user);
            setIsInitialized(true);
            // navigate('/thoughts');

                if (location.pathname === '/') {
                    navigate('/thoughts');
                }

            } catch (error) {
            console.log('User is not signed in');
            setIsInitialized(true);
            }
        };

        checkUser();
    }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        isInitialized,
        owner: user?.username,
        onDeleteUser,
        cognitoUser,
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
