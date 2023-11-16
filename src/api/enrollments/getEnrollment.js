import { Enrollment } from '../../models';
import { getQuery } from '../_utils/getQuery';

/**
 * Fetches the user object from the database based on the cognitoSub field matching the logged in cognito user.
 * @returns {Promise<void>}
 */
export const getEnrollment = async ({ id }) => {
  console.log('Fetching Enrollment Object');

  const response = await getQuery({
    model: Enrollment,
    fields: `
        id
        status
        lessonID
        teacherID
        userID
        courseID
        startDate
        enrollmentTutorId
    `,
    id
  });

  console.log(`Fetched Enrollment: `, { response });

  return response;
};
