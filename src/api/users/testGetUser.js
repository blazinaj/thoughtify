import { Auth } from '@aws-amplify/auth';
import { API } from 'aws-amplify';

export const testGetUser = async (event) => {
  const id = 'google_115112181493839740646';
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    }
  };
  const resp = await API.get('<my-wardrobe-api>', `/user/${id}`, myInit);
};
