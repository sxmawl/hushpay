"use client";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { AiOutlineUser } from "react-icons/ai";
import { BsPen } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import ListingModal from "./listingModal";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

function Navbar() {
  const pathname = usePathname();
  const wallet = useWallet();

  const renderNotConnectedContainer = () => (
    <div className="button-container">
      <WalletMultiButtonDynamic className="hover:!bg-yellow-300 rounded-lg bg-secondary text-sm font-extrabold py-2 px-4" />
    </div>
  );

  const renderConnectedContainer = () => (
    <div className="flex items-center">
      <button className="rounded-lg bg-secondary flex items-center justify-center text-sm font-extrabold">
        <ListingModal /> 
      </button>
      <Link
        href="/passbook"
        className={`${
          pathname === "/passbook" ? `text-black bg-white` : ``
        } p-2 ml-4 border-[1px] cursor-pointer transition-all hover:text-black hover:bg-white rounded-md border-white`}
      >
        <AiOutlineUser />
      </Link>
    </div>
  );

  return (
    <div className="flex px-12 justify-between items-center pt-4 bg-[#0D0D0D]">
      <div className="flex items-center">
        <div className="flex items-end justify-center w-8 h-8 rounded-full overflow-hidden bg-[#F0F0F0]">
          <Logo />
        </div>
        <div className="ml-4 font-bold text-[1.5rem]">hushpay</div>
      </div>
      <div className="flex items-center justify-between w-1/5">
        <Link
          className="hover:text-[#feec95] font-medium transition-all"
          href="/"
        >
          home
        </Link>
        <Link
          className="hover:text-[#feec95] font-medium transition-all"
          href="/passbook"
        >
          passbook
        </Link>
        <Link
          className="hover:text-[#feec95] font-medium transition-all"
          href="/listings"
        >
          listings
        </Link>
      </div>
      {wallet.publicKey
        ? renderConnectedContainer()
        : renderNotConnectedContainer()}
      {/* <button
        onClick={handleClick}
        className="rounded-lg bg-secondary text-sm font-extrabold py-2 px-4"
      >
        connect wallet
      </button> */}
    </div>
  );
}

export default Navbar;
