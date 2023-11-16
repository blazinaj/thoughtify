import { API, graphqlOperation } from 'aws-amplify';

/**
 * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
 * @returns {Promise<void>}
 */
export const createTutor = async ({ name }) => {
  console.log('Creating Tutor');

  const query = `
    mutation CreateTutor($input: CreateTutorInput!) {
      createTutor(input: $input) {
        id
        name
      }
    }
  `;

  const apiResponse = await API.graphql(
    graphqlOperation(query, {
      input: {
        name
      }
    })
  );

  const result = apiResponse.data.createTutor;

  console.log(`Created Tutor: `, result);

  return result;
};
