import { Elusiv, SEED_MESSAGE, TokenType } from "@elusiv/sdk";
import { sign } from "@noble/ed25519";
import { Cluster, Connection, Keypair, PublicKey } from "@solana/web3.js";
import pkg from 'bs58';


export async function getParams(): Promise<{
    elusiv: Elusiv;
    keyPair: Keypair;
    connection: Connection;
}> {
    const connection = new Connection("https://api.devnet.solana.com");
    // Add your own private key here
    const decodedKey = pkg.decode("privateKeyHere")
    const keyPair = Keypair.fromSecretKey(decodedKey);

    const seed = getSignedSeed(keyPair);
    console.log(seed);

    const elusiv = await Elusiv.getElusivInstance(
        seed,
        keyPair.publicKey,
        connection,
        "devnet"
    );

    return {
        elusiv,
        keyPair,
        connection,
    };
}

function getSignedSeed(keyPair: Keypair) {
    return sign(
        Buffer.from(SEED_MESSAGE, "utf-8"),
        keyPair.secretKey.slice(0, 32)
    );
};

export const topup = async (
    elusivInstance: Elusiv,
    keyPair: Keypair,
    amount: number,
    tokenType: TokenType
) => {
    // Build our topup transaction
    const topupTx = await elusivInstance.buildTopUpTx(amount, tokenType);
    // Sign it (only needed for topups, as we're topping up from our public key there)
    topupTx.tx.partialSign(keyPair);
    // Send it off
    return elusivInstance.sendElusivTx(topupTx);
};

export const send = async (
    elusivInstance: Elusiv,
    recipient: PublicKey,
    amount: number,
    tokenType: TokenType
) => {
    // Build the send transaction
    const sendTx = await elusivInstance.buildSendTx(
        amount,
        recipient,
        tokenType
    );
    // Send it off!
    return elusivInstance.sendElusivTx(sendTx);
};