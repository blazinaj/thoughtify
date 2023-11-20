import {listThoughts} from "../../graphql/queries.js";
import {handleListQuery} from "../../_utils/graphql/handleListQuery.js";

export const queryExistingThoughts = async ({owner}) => {

  if (!owner) {
    throw new Error('You must provide an owner');
  }

  const query = listThoughts;

  const variables = {
    filter: {
      owner,
      // archived: false,
    }
  };

  const response = await handleListQuery({
    query,
    variables,
    typename: "Thought"
  })

  return response;

}