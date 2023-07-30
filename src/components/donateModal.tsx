import React, { useEffect, useState } from "react";
import AmountInput from "./amountInput";
import SuccessModal from "./successModal";
import { MdOutlineCancel } from "react-icons/md";
import { getParams, send, topup } from "../../middlewares/elusiv";
import { Elusiv } from "@elusiv/sdk";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export default function DonateModal({
  to,
  elusiv,
  connection
}: {
  to: string;
  elusiv: Elusiv;
  connection: Connection;
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalStep, setModalStep] = React.useState(1);

  const [balance, setBalance] = useState(BigInt(0));
  const [isLoading, setIsLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const wallet = useWallet()

  useEffect(() => {
    const getBalance = async () => {
      if (elusiv) {
        const privateBalance = await elusiv.getLatestPrivateBalance("LAMPORTS");
        setBalance(privateBalance);
        setFetching(false);
      }
    };

    if (elusiv !== null) {
      getBalance().then(() => console.log("Balance updated"));
    }
  }, [elusiv]);

  const topupHandler = async (event: any) => {
    event.preventDefault();
    console.log("Elusiv: ,", elusiv);
    console.log("Wallet: ,", wallet);
    
    const sig = await topup(elusiv!, wallet?.signTransaction,  0.1*LAMPORTS_PER_SOL, "LAMPORTS");
    // console.log(`Topup complete with sig ${sig.signature}`);
    console.log("Topup Signature: ",sig.signature)
  };

  const sendHandler = async (event: any, to_address: string) => {
    event.preventDefault();
    if (balance > BigInt(0)) {
      const sig = await send(
        elusiv!,
        new PublicKey(to_address), // enter recepient here
        0.05 * LAMPORTS_PER_SOL,
        "LAMPORTS"
      );
      console.log("Transaction Sig: ", sig.signature)
    }
  };

  const openModel = () => {
    setShowModal(true);
    setModalStep(1);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStep(1);
  };

  const makePayment = async (e: any) => {
    setIsSending(true);
    await topupHandler(e)
    await sendHandler(e, to)
    setIsSending(false)
    setModalStep(2);
  };

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
                  <MdOutlineCancel color="rgb(255,255,255,0.5)" size={25} />
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

                    <AmountInput liveSolPrice={24.44} />

                    <div className="flex items-center justify-center p-6 rounded-b">
                      <button
                        className="bg-secondary px-20 text-lg py-2 rounded-md"
                        onClick={makePayment}
                        disabled = {isSending ? true : false}
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
