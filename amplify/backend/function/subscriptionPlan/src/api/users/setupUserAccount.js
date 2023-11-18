import {handleGraphql} from "../_utils/handleGraphql.js";

export const setupUserAccount = async ({ cognitoUser, userData }) => {
  console.log('Setting up a new User Account for the Cognito User', { cognitoUser, userData });

  const username = cognitoUser?.username;
  const cognitoSub = cognitoUser?.attributes.sub;
  const firstName = cognitoUser?.attributes.given_name;
  const lastName = cognitoUser?.attributes.family_name;
  const email = cognitoUser?.attributes.email;
  const phone = cognitoUser?.attributes.phone_number;
  const profileImage = cognitoUser?.attributes.profileImage;

  console.log('Creating a new User Object');

  const createUser = `
        mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
                id
                cognitoSub
                firstName
                lastName
                email
                phone
                profileImage
                bio
            }
        }
  `

    // create the new user object

    // then create an initial subscription plan

    // then create the welcome notification

    const user = await handleGraphql({
        query: createUser,
        variables: {
            input: {
                id: username,
                cognitoSub: username,
                firstName,
                lastName,
                email,
                phone,
                profileImage,
                bio: userData.bio
            }
        }
    })

    console.log({ user })

    // const subscription = await createSubscription({
    //     user: newUser.data.createUser,
    //     subscriptionTier: "FREE"
    // })

  console.log('Creating a new Welcome Notification');
  // Create a welcome notification
  // await DataStore.save(
  //   new Notification({
  //     title: 'Welcome to Thoughtify!',
  //     content: "We're excited to have you here!",
  //     type: 'MESSAGE',
  //     userID: username
  //   })
  // );

  return {
    user
  };
};
