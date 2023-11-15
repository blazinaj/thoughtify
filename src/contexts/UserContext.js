import {createContext, useContext, useEffect, useState} from "react";
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

  const [showAccountSetup, setShowAccountSetup] = useState(false);

  const navigate = useNavigate();

  /**
   * Whether or not the user context has been initialized. If not, then don't render the application.
   */
  const [isInitialized, setIsInitialized] = useState(true);

  const initiateAccountSetup = async () => {
    setShowAccountSetup(true);
  }

  const onAccountSetupComplete = async ({user, cognitoUser}) => {

    console.log("Account Setup Complete", {user, cognitoUser})
    setUser(user)

    setShowAccountSetup(false);
    navigate('/thoughts')
  }

  /**
   * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
   * @returns {Promise<void>}
   */
  const fetchUser = async ({username}) => {

    const cognitoUsername = username;

    console.log("Fetching User Object", {cognitoUsername})
    const user = await DataStore.query(
        User,
        user => user.cognitoSub.eq(cognitoUsername)
    )

    // When the cognito user changes, fetch the user object.
    // If the user object doesn't exist, then create it.
    if (cognitoUsername) {

      if (user[0]) {
        console.log("CURRENT USER OBJECT: ", user)
        setUser(user[0])
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