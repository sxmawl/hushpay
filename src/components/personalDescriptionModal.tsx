import React from "react";
import { MdOutlineCancel } from "react-icons/md";

export default function PersonalDescriptionModal({ desc }: { desc: string }) {
  const [showModal, setShowModal] = React.useState(false);
  const openModel = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={openModel}
        className="bg-secondary px-4 py-2 mt-4 md:mt-0 rounded-md font-bold"
      >
        view details
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
