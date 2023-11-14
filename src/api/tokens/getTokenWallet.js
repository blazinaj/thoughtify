import {API, graphqlOperation} from "aws-amplify";

export const getTokenWallet = async ({id}) => {

  // graphql string
  const query = `
    query GetTokenWallet($id:ID!) {
      getTokenWallet(id:$id) {
        id
        name
        tokenBalance {
          value
        }
      }
    }
  `

  console.log("Fetching Token Wallet",)

  const apiResponse = await API.graphql(
    graphqlOperation(
      query,
      {
        id
      },
    )
  )

  console.log(`Fetched Token Wallet: `, {apiResponse})

  return apiResponse.data.getTokenWallet;

}