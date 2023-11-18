import {createSubscription} from "./api/subscriptions/createSubscription.js";


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const subscription = await createSubscription({
      user: event.user,
  })

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // }, 
    body: JSON.stringify(subscription)
  };
};