"use client";
import React, { useEffect } from "react";
import "@/app/globals.css";
import Payments from "@/components/payments";
import ProfileListings from "@/components/profileListings";
import Navbar from "@/components/navbar";

function Passbook() {
  const [active, setActive] = React.useState("passbook");

  const changeActiveState = (newValue: string) => {
    setActive(newValue);
  };

  return (
    <div className="px-6 md:px-12 min-h-screen route-bg">
      <div className="flex justify-between mt-8 items-center">
        <div className="text-2xl md:text-5xl font-bold">
          hello, <span className="text-[#feec95]">fren!</span>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => changeActiveState("passbook")}
            className={`button-default ${
              active === "passbook" ? "active" : ""
            }`}
          >
            passbook
          </button>
          <button
            onClick={() => changeActiveState("listing")}
            className={`button-default ml-4 ${
              active === "listing" ? "active" : ""
            }`}
          >
            my listings
          </button>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap justify-between flex-col md:flex-row"></div>
      {active === "passbook" ? <Payments /> : <ProfileListings />}
    </div>
  );
}

export default Passbook;
