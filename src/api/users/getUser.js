import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from './graphql/listUsers';

/**
 * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
 * @returns {Promise<void>}
 */
export const getUser = async ({ username }) => {
  const listUserResponse = await API.graphql(
    graphqlOperation(listUsers, {
      filter: {
        cognitoSub: {
          eq: username
        }
      }
    })
  );

  const users = listUserResponse.data.listUsers.items;

  if (users?.length === 0) {
    return null;
  }

  return users[0];
};
