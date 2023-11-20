import {handleGraphql} from "./handleGraphql.js";

export const handleGetQuery = async ({ typename, query, id }) => {

  console.log("Handling get query: ", { typename, query, id });

  if (!typename) {
    throw new Error('You must provide a typename');
  }

  if (!query) {
    throw new Error('You must provide a query');
  }

  if (!id) {
    throw new Error('You must provide an id');
  }

  const queryName = `get${typename}`;

  const response = await handleGraphql({
    query,
    variables: {
      id
    }
  })

  return response;

}