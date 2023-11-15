import {API, graphqlOperation} from "aws-amplify";

/**
 * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
 * @returns {Promise<void>}
 */
export const getUser = async ({username}) => {
  console.log("Fetching User Object",)

  const query = `
    query GetUser($id:ID!) {
      getUser(id:$id) {
        id
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
      {id: username},
    )
  )

  console.log(`Fetched User: `, {apiResponse})

  return apiResponse.data.getUser;
}