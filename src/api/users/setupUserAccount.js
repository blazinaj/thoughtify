import { DataStore } from '@aws-amplify/datastore';
import { Notification, User } from '../../models';

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

  const newUser = await DataStore.save(
    new User({
      cognitoSub: username,
      firstName,
      lastName,
      email,
      phone,
      profileImage,
      bio: userData.bio
    })
  );

  console.log('Creating a new Welcome Notification');
  // Create a welcome notification
  await DataStore.save(
    new Notification({
      title: 'Welcome to Thoughtify!',
      content: "We're excited to have you here!",
      type: 'MESSAGE',
      userID: username
    })
  );

  return {
    user: newUser
  };
};
