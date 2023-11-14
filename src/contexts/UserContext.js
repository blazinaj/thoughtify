import {createContext, useContext, useEffect, useState} from "react";
import {Auth} from "@aws-amplify/auth";
import {AccountSetup} from "../views/User/AccountSetup";
import {useNavigate} from "react-router-dom";
import {setupUserAccount} from "../api/users/setupUserAccount";
import {DataStore} from "@aws-amplify/datastore";
import {User} from "../models";
import {useCognitoContext} from "./CognitoContext";
import {getUser as fetchUser2} from "../api/users/getUser";

const initialState = {
  user: null,
  personalTutor: null,
  tokenWallet: null,
  isInitialized: false,
  owner: null,
  attributes: null,
};

const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {

  const {cognitoUser} = useCognitoContext();

  /**
   * TODO: sync user object with database changes
   * Holds the internal user object.
   */
  const [user, setUser] = useState(null)

  /**
   * The currently selected tutor for the user.
   */
  const [personalTutor, setPersonalTutor] = useState(null)

  /**
   * The user's token wallet
   */
  const [tokenWallet, setTokenWallet] = useState(null)

  const [showAccountSetup, setShowAccountSetup] = useState(false);

  const navigate = useNavigate();

  /**
   * Whether or not the user context has been initialized. If not, then don't render the application.
   */
  const [isInitialized, setIsInitialized] = useState(true);

  const initiateAccountSetup = async () => {
    setShowAccountSetup(true);
  }

  const onAccountSetupComplete = async ({user, cognitoUser, tokenWallet, personalTutor}) => {

    console.log("Account Setup Complete", {user, cognitoUser, tokenWallet, personalTutor})
    setUser(user)
    setTokenWallet(tokenWallet)
    setPersonalTutor(personalTutor)

    setShowAccountSetup(false);
    navigate('/learn/catalog')
  }

  /**
   * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
   * @returns {Promise<void>}
   */
  const fetchUser = async ({username}) => {

    const cognitoUsername = username;

    console.log("Fetching User Object", {cognitoUsername})

    // When the cognito user changes, fetch the user object.
    // If the user object doesn't exist, then create it.
    if (cognitoUsername) {

      const fetchQuery = await fetchUser2({
        username,
      })

      console.log({fetchQuery})


      // const user = await DataStore.query(User, cognitoUsername)
      const user = fetchQuery;

      // const user = userResult?.[0] || userResult;

      if (user) {
        console.log("CURRENT USER OBJECT: ", user)
        const userQuery = await DataStore.query(
          User,
          username
        )
        console.log({userQuery})
        setUser(user)
      }
      else {

        console.log("NO CURRENT USER OBJECT, INITIATING ACCOUNT SETUP")

        await initiateAccountSetup();

      }
    }
  }

  const onDeleteUser = () => {
    alert('User is deleted')
  }

  useEffect(() => {
    console.log("Current Cognito User Has changed: ", cognitoUser?.username)
    if (cognitoUser?.username) {
      fetchUser({username: cognitoUser?.username}).then(() => {
        setIsInitialized(true)
      })
    }
  }, [cognitoUser?.username])

  return (
    <UserContext.Provider
      value={{
        user,
        personalTutor,
        tokenWallet,
        isInitialized,
        owner: user?.username,
        onDeleteUser,
      }}
    >
      {
        showAccountSetup ?
          <AccountSetup
            cognitoUser={cognitoUser}
            setupUserAccount={setupUserAccount}
            onComplete={onAccountSetupComplete}
          /> : children
      }
    </UserContext.Provider>
  );
}

const useUserContext = () => useContext(UserContext)

export { UserContextProvider, UserContext, useUserContext };