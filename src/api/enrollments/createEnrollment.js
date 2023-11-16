import { API, graphqlOperation } from 'aws-amplify';

/**
 * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
 * @returns {Promise<void>}
 */
export const createEnrollment = async ({ userID, lessonID, courseID, tutorID, status, teacherID }) => {
  console.log('Creating Enrollment');

  const query = `
    mutation CreateEnrollment($input: CreateEnrollmentInput!) {
      createEnrollment(input: $input) {
        id
        status
        lessonID
        teacherID
        userID
        courseID
        startDate
        enrollmentTutorId
      }
    }
  `;

  const apiResponse = await API.graphql(
    graphqlOperation(query, {
      input: {
        status,
        lessonID,
        teacherID,
        userID,
        courseID,
        startDate: new Date().toISOString(),
        enrollmentTutorId: tutorID
      }
    })
  );

  console.log(`Created Enrollment: `, { apiResponse });

  return apiResponse.data.createEnrollment;
};
