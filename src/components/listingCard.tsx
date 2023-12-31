import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import Modal from "./donateModal";
import { Elusiv } from "@elusiv/sdk";
import { Connection } from "@solana/web3.js";
import DescriptionModal from "./descriptionModal";

function ListingCard({
  name,
  description,
  verified,
  to,
  id,
}: {
  name: string;
  to: string;
  verified: boolean;
  description: string;
  id: string;
}) {
  return (
    <div className="listing-card w-full md:w-[49%] lowercase mb-8 flex flex-col justify-between">
      <div className="flex items-center">
        <div className="font-bold text-[1.5rem]">{name}</div>
        {verified && (
          <div className="ml-2 p-1 bg-secondary text-[8px] flex items-center rounded-full">
            <AiOutlineCheck className="" />
          </div>
        )}
      </div>
      <div className="text-[0.75rem] font-[700] text-ellipsis whitespace-nowrap overflow-hidden mt-2 text-[rgb(255,255,255,0.75)]">
        {description}
      </div>
      <div className="flex items-center justify-start mt-4 mb-2 font-bold text-[0.75rem]">
        <Modal causeId={id} to={to} />
        <DescriptionModal desc={description} />
      </div>
    </div>
  );
}

export default ListingCard;
