import React from "react";
import Logo from "./logo";
import { AiOutlineUser } from "react-icons/ai";
import { BsPen } from "react-icons/bs";

function AltNavbar() {
  return (
    <div className="flex justify-between items-center pt-4 bg-[#0D0D0D]">
      <div className="flex items-center">
        <div className="flex items-end justify-center w-8 h-8 rounded-full overflow-hidden bg-[#F0F0F0]">
          <Logo />
        </div>
        <div className="ml-4 font-bold text-base md:text-[1.5rem]">hushpay</div>
      </div>
      <div className="flex items-center">
        <button className="rounded-lg bg-secondary flex items-center justify-center text-sm font-extrabold py-2 px-4">
          create a payment link <BsPen className="ml-2"/>
        </button>
        <div className="p-2 ml-4 border-[1px] rounded-md border-white">
          <AiOutlineUser />
        </div>
      </div>
    </div>
  );
}

export default AltNavbar;
