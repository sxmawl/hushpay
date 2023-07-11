import React from "react";

function ProfileListingCard({
  amount,
  date,
  cause,
  details
}: {
  amount: string;
  date: string;
  cause: string;
  details?: string;
}) {
  return (
    <div className="payment-card w-full md:w-[49%] lowercase mb-8 flex justify-between flex-col md:flex-row items-center">
      <div className="flex flex-col">
        <div className="flex items-center text-[0.75rem] md:text-[1.5rem]">
          <div className="font-semibold">
            {cause}
          </div>
        </div>
        <div className="flex justify-center md:justify-start text-sm font-bold text-[rgb(255,255,255,0.75)] my-2">on: {date}</div>
        <div className="flex justify-center md:justify-start text-xl font-bold text-[#feec95]">${amount} <span className="text-[rgb(255,255,255,0.75)] ml-1"> raised so far</span></div>
      </div>
      <button className="bg-secondary px-4 py-2 mt-4 md:mt-0 rounded-md font-bold">view details</button>
      <div className="hidden"> :D </div>
    </div>
  );
}

export default ProfileListingCard;
