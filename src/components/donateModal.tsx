import React, { useEffect, useState } from "react";
import AmountInput from "./amountInput";
import SuccessModal from "./successModal";
import { MdOutlineCancel } from "react-icons/md";
import { getParams, send, topup } from "../../middlewares/elusiv";
import { Elusiv } from "@elusiv/sdk";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

export default function DonateModal({
  to,
  causeId,
}: {
  to: string;
  causeId: string;
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalStep, setModalStep] = React.useState(1);

  const [balance, setBalance] = useState(BigInt(0));
  const [isSending, setIsSending] = useState(false);

  const [amountToBeSent, setAmountToBeSent] = useState<number>(0);
  const [inSol, setInSol] = useState<number>(0);

  const changeInputHandler = (amount: number) => {
    setAmountToBeSent(amount);
  };

  const wallet = useWallet();

  useEffect(() => {
    try {
      fetch("https://api.coingecko.com/api/v3/coins/solana")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.market_data.current_price.usd);
          setInSol(data.market_data.current_price.usd);
        });
    } catch (e) {}
  }, []);

  const topupHandler = async (event: any, amount: number, elusiv: Elusiv) => {
    event.preventDefault();
    const sig = await topup(
      elusiv!,
      wallet?.signTransaction,
      amount * 1.0001 * LAMPORTS_PER_SOL,
      "LAMPORTS"
    );
    // console.log(`Topup complete with sig ${sig.signature}`);
    console.log("Topup Signature: ", sig.signature);
  };

  const sendHandler = async (
    event: any,
    to_address: string,
    amount: number,
    elusiv: Elusiv
  ): Promise<string | undefined> => {
    event.preventDefault();
    const sig = await send(
      elusiv!,
      new PublicKey(to_address), // enter recepient here
      amount * LAMPORTS_PER_SOL,
      "LAMPORTS"
    );
    console.log("Txn Signature: ", sig.signature);
    return sig.signature;
  };

  const openModel = () => {
    setShowModal(true);
    setModalStep(1);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStep(1);
  };

  const makePayment = async (event: any) => {
    setIsSending(true);
    if (to == wallet.publicKey?.toString()) {
      alert("You cannot donate to yourself!");
      setIsSending(false);
      return;
    }
    const { elusiv: elusiv, connection: conn } = await getParams(wallet);
    await topupHandler(event, amountToBeSent!, elusiv);
    const signature = await sendHandler(event, to, amountToBeSent!, elusiv);
    await addPayment(signature!);
    setIsSending(false);
    setModalStep(2);
  };

  function addPayment(sig: string) {
    try {
      axios
        .post("/api/addPayment", {
          txnId: sig,
          causeId: causeId,
          amount: amountToBeSent,
          to: to,
          from: wallet.publicKey,
        })
        .then((res) => {
          console.log(res.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button className="bg-secondary px-2 py-2 rounded-md" onClick={openModel}>
        donate some $$$
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-auto mx-auto max-w-3xl">
              <div className="modal-payment-amount rounded-lg relative flex flex-col w-full gap-4 bg-black outline-none focus:outline-none">
                <div
                  className="absolute top-5 right-5 cursor-pointer"
                  onClick={closeModal}
                >
                  {" "}
                  {isSending ? (
                    ""
                  ) : (
                    <MdOutlineCancel color="rgb(255,255,255,0.5)" size={25} />
                  )}
                </div>
                {modalStep == 1 ? (
                  <>
                    <div className="relative p-6 flex-auto">
                      <p className="text-white-500 text-center text-6xl leading-relaxed">
                        shhh...
                      </p>
                      <p className="text-center text-lg text-[rgb(255,255,255,0.5)] font-normal">
                        nobody's gonna know... <br></br>
                        no one's gonna know!!! <br></br>
                        how will they know???
                      </p>
                    </div>

                    <AmountInput
                      onChangeInput={changeInputHandler}
                      liveSolPrice={inSol}
                    />

                    <div className="flex items-center justify-center p-6 rounded-b">
                      <button
                        className="bg-secondary px-20 text-lg py-2 rounded-md"
                        onClick={makePayment}
                        disabled={isSending ? true : false}
                      >
                        {isSending ? "sending..." : "go for it"}
                      </button>
                    </div>
                  </>
                ) : (
                  <SuccessModal closeModal={closeModal} />
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
