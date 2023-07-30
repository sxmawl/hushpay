import { Elusiv, SEED_MESSAGE, TokenType } from "@elusiv/sdk";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
// import { sign } from "@noble/ed25519";
import { WalletContextState } from "@solana/wallet-adapter-react/lib/types/useWallet";
import { Connection, PublicKey } from "@solana/web3.js";
// import pkg from "bs58";

export async function getParams(wallet: WalletContextState): Promise<{
  elusiv: Elusiv;
  connection: Connection;
}> {
  const connection = new Connection("https://api.devnet.solana.com");
  // Add your own private key here
  // const decodedKey = pkg.decode("privateKeyHere")
  // const keyPair = Keypair.fromSecretKey(decodedKey);
  let seed = new TextEncoder().encode(SEED_MESSAGE);
  if (wallet.signMessage) {
    let uint8Array = new TextEncoder().encode(SEED_MESSAGE);
    seed = await wallet.signMessage(uint8Array);
  }

  const elusiv = await Elusiv.getElusivInstance(
    seed,
    wallet.publicKey!,
    connection,
    "devnet"
  );

  console.log("SEED: ", seed)

  return {
    elusiv,
    connection,
  };
}

export const topup = async (
  elusivInstance: Elusiv,
  signTransaction: SignerWalletAdapterProps['signTransaction'] | undefined,
  amount: number,
  tokenType: TokenType
) => {
  console.log(elusivInstance);
  // Build our topup transaction
  const topupTx = await elusivInstance.buildTopUpTx(amount, tokenType);
  // Sign it (only needed for topups, as we're topping up from our public key there)
  const signedTx = await signTransaction!(topupTx.tx);
  // Send it off
  topupTx.setSignedTx(signedTx);
  return elusivInstance.sendElusivTx(topupTx);
};

export const send = async (
  elusivInstance: Elusiv,
  recipient: PublicKey,
  amount: number,
  tokenType: TokenType
) => {
  // Build the send transaction
  const sendTx = await elusivInstance.buildSendTx(amount, recipient, tokenType);
  // Send it off!
  return elusivInstance.sendElusivTx(sendTx);
};
