import { Auth } from '@aws-amplify/auth';

export const signUp = async (username, password, email, phoneNumber) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email // optional
        // phone_number: phoneNumber,   // optional - E.164 number convention
        // other custom attributes
      }
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
};
