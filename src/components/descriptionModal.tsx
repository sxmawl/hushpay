import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import React from "react";
import { BsPen } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

export default function DescriptionModal({ desc }: { desc: string }) {
  const wallet = useWallet();
  const [showModal, setShowModal] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const openModel = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function addListing() {
    try {
      axios
        .post("/api/addListing", {
          name: name,
          description: description,
          publicKey: wallet.publicKey,
        })
        .then((res) => {
          alert(res.data.message);
          closeModal();
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        className="px-2 py-2 ml-4 cursor-pointer primary-button rounded-md"
        onClick={openModel}
      >
        what is this about?
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-auto mx-auto max-w-4xl">
              <div className="modal-payment-amount rounded-lg relative flex flex-col w-full gap-4 bg-black outline-none focus:outline-none">
                <div
                  className="absolute top-5 right-5 cursor-pointer"
                  onClick={closeModal}
                >
                  {" "}
                  <MdOutlineCancel color="rgb(255,255,255,0.5)" size={25} />
                </div>
                <div className="font-lg font-medium">{desc}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
