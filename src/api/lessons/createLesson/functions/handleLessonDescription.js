import { generate } from '../../../../utils/openai/functions/generate';

export const handleLessonDescription = async ({ lesson }) => {
  const prompt = `
        Generate a short description for the lesson "${lesson.name}".
      `;

  // Generates a description for the lesson
  const result = await generate({ prompt, maxTokens: 50 });

  const data = result?.data?.choices[0]?.text;

  return data;
};
