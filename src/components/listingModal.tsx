import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import React from "react";
import { BsPen } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

export default function ListingModal() {
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
        .post("http://localhost:3000/api/addListing", {
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
        className="bg-secondary py-2 px-4 rounded-md flex items-center"
        onClick={openModel}
      >
        create a payment link <BsPen className="ml-2" />
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
                <input className="p-2 text-white rounded-md font-semibold bg-transparent border-[1px] border-solid border-yellow-100" placeholder="Enter Cause title.." onChange={(e) => setName(e.target.value)} />
                <input className="p-2 text-white rounded-md font-semibold bg-transparent border-[1px] border-solid border-yellow-100" placeholder="Add details about it.." onChange={(e) => setDescription(e.target.value)} />
                <button className="bg-secondary py-2 px-4 rounded-md flex items-center justify-center" onClick={addListing}>Add Listing</button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
