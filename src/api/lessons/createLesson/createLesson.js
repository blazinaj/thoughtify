import { generate, generateImage } from '../../../utils/openai/functions/generate';
import { v4 } from 'uuid';
import awsmobile from '../../../aws-exports';
import { DataStore } from '@aws-amplify/datastore';
import { Lesson, LessonCategory, LessonLessonCategory, LessonNode, JobStatus, LessonType } from '../../../models';
import { generateLessonCategoryLabels } from '../../../views/Teach/LessonCategories/functions/generateLessonCategoryLabels';
import { handleLessonDescription } from './functions/handleLessonDescription';

/**
 * Generates a Lesson using AI and saves it to the database.
 * @param input
 * @param lessonCategories
 * @param courseID
 * @param generateLessonDescription
 * @param generateLessonCoverImages
 * @param numberOfImages
 * @param generateLessonCategories
 * @param generateLessonTopicOutline
 * @param generateLessonTopicContent
 * @param setNewLesson
 * @returns {Promise<void>}
 */
export const createLesson = async ({
  input,
  lessonCategories = [],
  courseID,
  generateLessonDescription = true,
  generateLessonCoverImages = true,
  numberOfImages = 1,
  generateLessonCategories = true,
  generateLessonTopicOutline = true,
  generateLessonTopicContent = true,
  setNewLesson
}) => {
  // first create the lesson and set the job status for further tracking
  // Save the lesson with name, description, and images
  // topics will be generated afterwards
  let newLesson = await DataStore.save(
    new Lesson({
      name: input.name,
      price: input.price,
      visibility: 'private',
      updoot: 0,
      downdoot: 0,
      courseID,
      job: {
        name: 'Creating Lesson',
        status: 'INPROGRESS',
        progressMessage: 'Initializing Lesson...'
      }
    })
  );

  if (setNewLesson) setNewLesson(newLesson);

  const promises = [];

  // eslint-disable-next-line
  let description = input.description;
  const images = [];
  const categories = []; // array of existing category objects that will be linked to the Lesson

  if (generateLessonDescription) {
    // Update Job progress
    newLesson = await DataStore.save(
      Lesson.copyOf(newLesson, (updated) => {
        updated.job.progressMessage = 'Generating Lesson Description...';
      })
    );

    // Generate description
    const description = await handleLessonDescription({ lesson: input });

    // update the lesson with the description
    newLesson = await DataStore.save(
      Lesson.copyOf(newLesson, (updated) => {
        updated.description = description;
      })
    );
  }

  if (generateLessonCoverImages) {
    // Update Job progress
    newLesson = await DataStore.save(
      Lesson.copyOf(newLesson, (updated) => {
        updated.job.progressMessage = 'Generating Lesson Cover Images...';
      })
    );

    // generate images and save to the new Lesson
    // const prompt = `Generate a cover image for the lesson "${input.name} in the style of chiaroscuro`;
    const prompt = `Generate a cover icon for the lesson ${input.name} in a flat outline style`;

    const result = await generateImage({ prompt, n: numberOfImages, size: '256x256' });

    if (Array.isArray(result)) {
      const s3Promises = [];

      // each url of the open AI result
      for (const { url } of result) {
        const fileName = v4();
        const key = `lesson-images/${fileName}.png`;
        const bucket = awsmobile.aws_user_files_s3_bucket;

        images.push({
          url: key
        });

        try {
          // download image
          const fetchPromise = fetch('https://ac2fbd5gbmiwzznqtqegjiy5ue0rccmr.lambda-url.us-west-2.on.aws/', {
            method: 'POST',
            body: JSON.stringify({
              url,
              bucket,
              key: `public/${key}`
            })
          });

          s3Promises.push(fetchPromise);
        } catch (error) {
          console.log('Error uploading file: ', error);
        }
      }
    }

    // update the lesson with the images
    newLesson = await DataStore.save(
      Lesson.copyOf(newLesson, (updated) => {
        updated.images = images;
      })
    );
  }

  // Assign to Categories
  if (generateLessonCategories) {
    // Update Job progress
    newLesson = await DataStore.save(
      Lesson.copyOf(newLesson, (updated) => {
        updated.job.progressMessage = 'Generating Lesson Categories...';
      })
    );

    // fetch suggested categories
    const categoryArray = await generateLessonCategoryLabels({
      lesson: input,
      lessonCategories
    });

    // create m-m connection with suggested categories and lesson

    // loop over categories from AI response, find the categories in the database and then link to them. Create the category if it doesn't already exist

    for (const category of categoryArray) {
      // first try to find if the category already exists

      const foundCategory = lessonCategories?.find(
        (existing) => existing.name.toLowerCase() === category.toLowerCase()
      );

      if (foundCategory) {
        // link category to lesson
        categories.push(foundCategory);
      }
      // create category first, then link to the lesson
      else {
        const newCategory = await DataStore.save(
          new LessonCategory({
            name: category
          })
        );

        categories.push(newCategory);
      }
    }

    // async create the category m-m relationships with lesson
    if (Array.isArray(categories)) {
      for (const category of categories) {
        const lessonCategoryPromise = DataStore.save(
          new LessonLessonCategory({
            lessonID: newLesson.id,
            lessonCategoryID: category.id,
            lessonCategoryLessonsId: category.id,
            lessonLessonCategoriesId: newLesson.id
          })
        );

        promises.push(lessonCategoryPromise);
      }
    }
  }

  // After the lesson is created, can now generate topics
  if (generateLessonTopicOutline) {
    // Update Job progress
    newLesson = await DataStore.save(
      Lesson.copyOf(newLesson, (updated) => {
        updated.job.progressMessage = 'Generating Lesson Topic Outline...';
      })
    );

    const prompt = `
        
        Lesson Name: ${newLesson?.name}
        Lesson Description: ${newLesson?.description}
        
        If there are Topics listed in this prompt already above, build your response around those topics 
        and do not duplicate or overlap with existing topics. If a topic is similar to the topic you are going to suggest,
        skip the topic so that there are not duplicates.
        
        Please Structure the response as a JSON Array of Objects that can be parsed. 
        
        Each Object represents a Topic, with a name property and a description property.
        
        Ensure it is valid JSON so that it can be parsed using javascript in the browser.
        
        For example, an array of Topic objects based on the Lesson: 
        
        [
          {
            "name": "1. Introduction to HTML Tags and Elements",
            "description": "\\n a. Definition of HTML \\n b. Overview of HTML tags and elements"
          }
        ]
        
        Create a numbered training guide for the following Lesson: \n    
      `;

    // Generate the outline for the lesson
    const result = await generate({ prompt });

    const data = result?.data?.choices[0]?.text;

    const parsedResult = JSON.parse(data);

    // now handle the parsed result and generate a Topic for each object
    if (Array.isArray(parsedResult)) {
      for (const topicResponse of parsedResult) {
        // generate topic content and then save the topic
        if (generateLessonTopicContent) {
          const prompt = `
              Generate detailed and specific topic content for the following Topic:
              
              Topic Name: ${topicResponse?.name}
              Topic Description: ${topicResponse?.description}
              
              Output the results as an HTML string
            `;

          // generate Topic content
          // eslint-disable-next-line
          const topicPromise = generate({ prompt }).then(async (result) => {
            console.log('Got Topic Result: ');
            console.log({ result });

            // decide if we should generate a single rich text slide, or a slideshow based on the data
            // if the topic has data that is nested, then it's a slide show

            // now create the Topic objects
            const dataStorePromise = await DataStore.save(
              new LessonNode({
                name: topicResponse?.name,
                description: topicResponse?.description,
                lessonID: newLesson.id,
                content: result?.data?.choices[0]?.text,
                type: LessonType.RICHTEXT
              })
            ).then((newTopic) => {
              console.log({ newTopic });
            });

            promises.push(dataStorePromise);
          });

          promises.push(topicPromise);
        }

        // or just save the topic with blank content
        else {
          // just save the topic objects directly

          // eslint-disable-next-line
          const dataStorePromise = await DataStore.save(
            new LessonNode({
              name: topicResponse?.name,
              description: topicResponse?.description,
              lessonID: newLesson.id,
              content: '',
              type: LessonType.RICHTEXT
            })
          ).then((newTopic) => {
            console.log({ newTopic });
          });

          promises.push(dataStorePromise);
        }
      }
    } else {
      console.log('parsed result is not an array');
    }
  }

  // Wait for everything to be generated, then save to the new Lesson all at once
  const results = await Promise.allSettled(promises);

  // Update Job progress
  newLesson = await DataStore.save(
    Lesson.copyOf(newLesson, (updated) => {
      updated.job.progressMessage = 'Finalizing Lesson...';
    })
  );

  return newLesson;
};

export default createLesson;
