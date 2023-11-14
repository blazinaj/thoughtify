import {API, graphqlOperation} from "aws-amplify";

/**
 * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
 * @returns {Promise<void>}
 */
export const getUser = async ({username}) => {
  console.log("Fetching User Object",)

  const query = `
    query GetUser($username:ID!) {
      getUser(username:$username) {
        username
        firstName
        lastName
        email
        phone
      }
    }
  `

  const apiResponse = await API.graphql(
    graphqlOperation(
      query,
      {username},
    )
  )

  console.log(`Fetched User: `, {apiResponse})

  return apiResponse.data.getUser;
}