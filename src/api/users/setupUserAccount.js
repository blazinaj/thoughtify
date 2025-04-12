import { DataStore } from '@aws-amplify/datastore';
import { Notification, User } from '../../models';
import { createThought } from '../thoughts/createThought';

export const setupUserAccount = async ({ cognitoUser, userData }) => {

  const username = cognitoUser?.username;
  const firstName = cognitoUser?.attributes?.given_name || userData?.firstName;
  const lastName = cognitoUser?.attributes?.family_name || userData?.lastName;
  const email = cognitoUser?.attributes?.email;
  const phone = cognitoUser?.attributes?.phone_number;
  const profileImage = cognitoUser?.attributes?.picture;

  const newUser = await DataStore.save(
    new User({
      cognitoSub: username,
      firstName,
      lastName,
      email,
      phone,
      profileImage,
      bio: userData.bio,
      showOnboarding: true
    })
  );

  const firstThought = await createThought({
    input: 'I just signed up for Thoughtify! This is my first Thought!',
    date: new Date().toISOString()
  });

  // Create a welcome notification
  await DataStore.save(
    new Notification({
      title: 'Welcome to Thoughtify!',
      content: "We're excited to have you here! We've created a sample Thought for you to get started with.",
      type: 'MESSAGE',
      userID: username
    })
  );

  return {
    user: newUser
  };
};
