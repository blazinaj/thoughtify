import {DataStore} from "@aws-amplify/datastore";
import {Certification, Course, Lesson, LessonStatus, User, Notification} from "../../models";

/**
 * Completes a course for a user, validating that the user is enrolled in the course and that all lessons are complete.
 *
 * If completed, the user will be awarded the course's Certification
 * .
 * @param course
 * @param user
 * @returns {Promise<*>}
 */
export const completeCourse = async ({ course, user }) => {

  // first fetch the course
  const courseToComplete = await DataStore.query(Course, course.id);

  // then fetch the user
  const userToComplete = await DataStore.query(User, user.id);

  // validate the user's enrollment in the course

  // then fetch the Lessons and this User's specific enrollments for those lessons
  const lessons = await DataStore.query(Lesson, lesson => lesson.and(lesson => [
    lesson.courseID("eq", course.id),
    lesson.Enrollments.userID("eq", user.username)
  ]));

  // validate that all lessons are complete
  const courseCompletion = lessons.every(lesson => lesson.status.eq(LessonStatus.COMPLETE));

  // if all lessons are complete, then award the user the course's certification
  if (courseCompletion) {
    await DataStore.save(
      new Certification({
        name: `Certification for ${course.name}`,
        description: `${user.firstName} ${user.lastName} has completed the course ${course.name} and has been awarded this certification on ${new Date().toLocaleDateString()}`,
        courseID: course.id,
        userID: user.username,
        issueDate: new Date(),
      })
    )
  }

  // then spawn a notification
  await DataStore.save(
    new Notification({
      userID: user.username,
      message: `🎉 Congratulations!! You have completed the course ${course.name} and have been awarded a new Certification`,
    })
  )

  return courseCompletion;
}