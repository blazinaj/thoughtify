import { API, graphqlOperation } from 'aws-amplify';

export const getQuery = async ({ model, id, fields, primaryKey = 'id' }) => {
  if (!model) {
    throw new Error('No model specified');
  }

  const queryName = `Get${model.name}`;
  const responseName = `get${model.name}`;

  const typename = model.name;

  console.log('Performing getQuery on model: ', typename);

  const query = `
        query ${queryName}($${primaryKey}:ID!) {
          ${responseName}(${primaryKey}:$${primaryKey}) {
            ${primaryKey}
            ${typeof fields === 'string' ? fields : fields.map((field) => field.name).join('\n')}
          }
        }
  `;

  const apiResponse = await API.graphql(
    graphqlOperation(query, {
      [primaryKey]: id
    })
  );

  const result = apiResponse.data[responseName];

  console.log(`Fetched ${typename}: `, { result });

  return result;
};
