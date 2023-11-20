import {handleGraphql} from "./handleGraphql.js";

/**
 * Handles appsync graphql listQuery using nextToken
 * @param typename - the typename of the object to query
 * @param query - the graphql query
 * @param variables - the graphql query variables
 * @returns {Promise<void>}
 */
export const handleListQuery = async ({ typename, query, variables }) => {

  console.log("Handling list query: ", { typename, query, variables });

  if (!typename) {
    throw new Error('You must provide a typename');
  }

  if (!query) {
    throw new Error('You must provide a query');
  }

  const queryName = `list${typename}s`;

  let response = await handleGraphql({
    query,
    variables
  });

  let items = response.data[queryName].items;

  while (response.data[queryName].nextToken) {
    try {
      response = await handleGraphql({
        query,
        variables: {
          ...variables,
          nextToken: response.data[queryName].nextToken
        }
      });
      items = items.concat(response.data[queryName].items);
    }
    catch (error) {
      console.error("Error in handling list query page: ", error);
    }

  }

  console.log(`Found ${items.length} ${typename} items`);

  return items;

}