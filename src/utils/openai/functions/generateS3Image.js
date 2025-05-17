import { generateImage } from './generate';
import { v4 } from 'uuid';
import awsmobile from '../../../aws-exports';

export const generateS3Images = async ({ prompt, numberOfImages = 1 }) => {
  // eslint-disable-next-line
  const images = [];

  // generate images and save to the new Lesson

  const result = await generateImage({ prompt, n: numberOfImages, size: '256x256' });

  // console.log('Got AI Response: ');
  //
  // console.log(result);

  if (Array.isArray(result)) {
    const s3Promises = [];

    const s3Keys = [];

    // each url of the open AI result
    for (const { url } of result) {
      // console.log({ url });

      const fileName = v4();
      const key = `lesson-images/${fileName}.png`;
      const bucket = awsmobile.aws_user_files_s3_bucket;

      images.push({
        url: key
      });

      try {
        // download image
        const fetchPromise = fetch('https://ac2fbd5gbmiwzznqtqegjiy5ue0rccmr.lambda-url.us-west-2.on.aws/', {
          // cors = no-cors
          // mode: 'cors',
          // contentType: "image/png",
          // 'Access-Control-Allow-Headers': 'Content-Type',
          method: 'POST',
          body: JSON.stringify({
            url,
            bucket,
            key: `public/${key}`
          })
        });

        s3Promises.push(fetchPromise);
      } catch (error) {
        // console.log('Error uploading file: ', error);
      }
    }

    const results = await Promise.allSettled(s3Promises);

    console.log('Got S3 Results: ', results);

    for (const result of results) {
      if (result.status === 'fulfilled') {
        images.push({
          url: result.value.key
        });
      }
    }
  }

  return images;
};
