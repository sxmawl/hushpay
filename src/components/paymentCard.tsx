import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function PaymentCard({
  amount,
  inSol,
  date,
  cause,
  sent,
}: {
  amount: string;
  inSol: string;
  date: string;
  cause: string;
  sent: boolean;
}) {
  return (
    <div className="payment-card w-full md:w-[49%] lowercase mb-8 flex justify-between flex-col md:flex-row items-center">
      <div className="flex flex-col">
        <div className="flex items-center text-[1.5rem] md:text-[2rem]">
          {sent ? (
            <AiOutlineMinus className="text-[#FE9595] text-[1.5rem]" />
          ) : (
            <AiOutlinePlus className="text-[#D6FE95] text-[1.5rem]" />
          )}
          <div className="font-semibold ml-2">
            ${amount}{" "}
            <span className="text-[rgb(255,255,255,0.5)] uppercase">
              &#40;{inSol} SOL&#41;
            </span>
          </div>
        </div>
        <div className="flex justify-center md:justify-start text-sm font-bold text-[rgb(255,255,255,0.75)]">on: {date}</div>
        <div className="flex justify-center md:justify-start text-sm font-bold text-[rgb(255,255,255,0.75)]">for: <span className="cursor-pointer text-[rgb(255,255,255,0.95)] underline">{cause}</span></div>
      </div>
      <button className="bg-secondary px-4 py-2 mt-4 md:mt-0 rounded-md font-bold">view details</button>
      <div className="hidden"> :D </div>
    </div>
  );
}

export default PaymentCard;
