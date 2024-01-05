import { Storage } from '@aws-amplify/storage';

export const getS3File = async (key) => {

    const presignedURL = await Storage.get(key, {
        level: 'private',
            // identityId: string, // id of another user, if `level: protected`
            // download: boolean, // defaults to false
            // expires: number, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
            // contentType: string, // set return content type, eg "text/html"
            // validateObjectExistence?: boolean, // defaults to false
            // cacheControl: string, // Specifies caching behavior along the request/reply chain
    });

    return presignedURL;

}