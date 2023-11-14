import { Auth } from '@aws-amplify/auth';

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
