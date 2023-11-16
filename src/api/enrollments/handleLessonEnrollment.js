import { DataStore } from '@aws-amplify/datastore';
import { EnrollmentStatus, EnrollmentTopicProgress } from '../../models';
import { createTokenTransaction } from '../tokens/createTokenTransaction';
import { faker } from '@faker-js/faker';
import { getTokenWallet } from '../tokens/getTokenWallet';
import { createTutor } from '../tutors/createTutor';
import { createEnrollment } from './createEnrollment';
import { createEnrollmentTopicProgress } from './createEnrollmentTopicProgress';

/**
 * Enrolls a User in a Course or a Lesson.
 *
 * @returns {Promise<void>}
 */
export const handleLessonEnrollment = async ({ user, lesson, status = EnrollmentStatus.NOT_STARTED, topics = [] }) => {
  if (!user) {
    alert('You are not logged in. Please log in and try again.');
    return;
  }

  // first, perform the token transaction. fail the function if there is not enough tokens
  const userTokenWallet = await getTokenWallet({
    id: user?.userTokenWalletId
  });

  if (!userTokenWallet) {
    alert('You do not have a Token Wallet in which to complete this transaction. Please contact support.');
    return;
  }

  console.log('Got Users Token Wallet', userTokenWallet);

  // check the token balance
  if (userTokenWallet?.tokenBalance?.value < lesson.price) {
    alert("You don't have enough tokens to purchase this lesson. Please purchase more tokens.");
  } else if (userTokenWallet?.tokenBalance?.value >= lesson.price) {
    // Create a Tutor for the enrollment
    const newTutor = await createTutor({
      name: faker.name.firstName()
    });

    // Create the enrollment
    const newEnrollment = await createEnrollment({
      status,
      lessonID: lesson?.id,
      // teacherID: lesson?.owner,
      userID: user?.username,
      courseID: lesson?.courseID,
      startDate: new Date().toISOString(),
      tutorID: newTutor?.id
    });

    // // create EnrollmentTopicProgress objects
    for (const topic of topics) {
      await createEnrollmentTopicProgress({
        enrollmentID: newEnrollment.id,
        topicID: topic.id,
        status: EnrollmentStatus.NOT_STARTED
      });
    }

    // create token transaction
    await createTokenTransaction({
      tokenWalletID: userTokenWallet?.id,
      enrollmentID: newEnrollment?.id,
      amount: lesson?.price
    });

    return newEnrollment;
  } else {
    alert('An unknown error occurred. Please contact support.');
  }
};
