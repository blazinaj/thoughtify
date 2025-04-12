import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

export const invokeLambda = async (functionName, payload) => {
  try {
    const credentials = await Auth.currentCredentials();
    const lambda = new Lambda({
      credentials: Auth.essentialCredentials(credentials),
      region: 'us-west-2'
    });

    const response = await lambda
      .invoke({
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
      })
      .promise();

    return JSON.parse(response.Payload);
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
    throw error;
  }
};
