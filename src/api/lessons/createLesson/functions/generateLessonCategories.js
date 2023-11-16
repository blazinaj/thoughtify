import { DataStore } from '@aws-amplify/datastore';

export const generateLessonCategories = async ({ lesson, existingLessonCategories }) => {
  // fetch suggested categories
  const categoryArray = await generateLessonCategoryLabels({
    lesson: input,
    lessonCategories: lessonCategoryDataStore?.items
  });

  // create m-m connection with suggested categories and lesson

  // loop over categories from AI response, find the categories in the database and then link to them. Create the category if it doesn't already exist

  for (const category of categoryArray) {
    // first try to find if the category already exists

    const foundCategory = lessonCategoryDataStore?.items?.find((existing) => existing.name === category);

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
};
