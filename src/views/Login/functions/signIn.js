import { Auth } from '@aws-amplify/auth';

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
};
