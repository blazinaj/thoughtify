import {API, graphqlOperation} from "aws-amplify";

/**
 * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
 * @returns {Promise<void>}
 */
export const createEnrollmentTopicProgress = async (
  {
    enrollmentID,
    topicID,
    status,
  }) => {

  console.log("Creating Enrollment Topic Progress")

  const query = `
    mutation CreateEnrollmentTopicProgress($input: CreateEnrollmentTopicProgressInput!) {
      createEnrollmentTopicProgress(input: $input) {
        id
        status
        enrollmentID
        enrollmentTopicProgressTopicId
      }
    }
  `

  const apiResponse = await API.graphql(
    graphqlOperation(
      query,
      {
        input: {
          enrollmentID,
          enrollmentTopicProgressTopicId: topicID,
          status,
        }
      },
    )
  )

  console.log(`Created Enrollment Topic Progress: `, {apiResponse})

  return apiResponse.data.createEnrollmentTopicProgress;
}