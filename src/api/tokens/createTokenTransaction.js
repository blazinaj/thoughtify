import { DataStore } from '@aws-amplify/datastore';
import { TokenTransaction, TokenWallet } from '../../models';

export const createTokenTransaction = async ({ tokenWalletID, enrollmentID, amount }) => {
  // first, fetch the token wallet
  const userTokenWallet = await DataStore.query(TokenWallet, tokenWalletID);

  if (!userTokenWallet) {
    console.error('User does not have a token wallet. Please contact support.');
    return;
  }

  console.log('Creating token transaction');
  // create token transaction
  const tokenTransaction = await DataStore.save(
    new TokenTransaction({
      tokenwalletID: tokenWalletID,
      enrollmentID,
      amount
    })
  );

  console.log('Created Token Transaction', tokenTransaction);

  // update the TokenWallet balance to reflect this transaction
  const updatedWallet = await DataStore.save(
    TokenWallet.copyOf(userTokenWallet, (updated) => {
      updated.tokenBalance = {
        value: (updated.tokenBalance.value -= amount)
      };
    })
  );

  console.log('Updated Token Wallet', updatedWallet);
};
