"use client";
import React, { use, useEffect, useState } from "react";
import "@/app/globals.css";
import { AiOutlineSearch } from "react-icons/ai";
import ListingCard from "@/components/listingCard";
import { Elusiv } from "@elusiv/sdk";
import { getParams, send, topup } from "../../../middlewares/elusiv";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { listing } from "@/utils/types";
import axios from "axios";
function Listings() {
  const [search, setSearch] = useState("");
  const wallet = useWallet();

  const [elusiv, setElusiv] = useState<Elusiv>();
  const [connection, setConnection] = useState<Connection>();


  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const [data, setData] = useState<listing[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/getAllListings")
        .then((res) => {
          // console.log(res.data.listings);
          setData(res.data.listings);
        })
        .catch((err) => {
          alert(err);
        });

      if (!elusiv || !connection) {
        getParams(wallet)
          .then(({ elusiv: e, connection: conn }) => {
            console.log("ELUSIV:", e);
            console.log("CONNECTION: ", conn);
            setElusiv(e);
            setConnection(conn);
          });
      } 
      // }
    } catch (err) {
      alert(err);
    }
  }, []);



  const filteredCauses = data.filter((cause) =>
    cause.name.toLowerCase().includes(search.toLowerCase())
  );



  const listingCards = filteredCauses.map((item) => {
    return (
      <ListingCard
        key={item._id}
        to={item.publicKey}
        name={item.name}
        description={item.description}
        verified={item.verified}
        elusiv={elusiv!}
        connection={connection!}
      />
    );
  });



  return (
    <div className="px-6 md:px-12 min-h-screen route-bg">
      <div className="flex items-center mt-12">
        <input
          onChange={handleSearch}
          className="border-[1px] text-[0.8rem] md:text-base focus:outline-none focus:border-white relative w-full rounded-md py-2 px-4 bg-primary border-[rgb(255,255,255,0.5)]"
          type="text"
          placeholder="search for a project / cause you care about"
        ></input>
        <div className="p-1 bg-secondary cursor-pointer rounded-sm absolute right-16">
          <AiOutlineSearch className="" />
        </div>
      </div>
      <div className="mt-12 flex flex-wrap justify-between flex-col md:flex-row">
        {listingCards}
      </div>
    </div>
  );
}

export default Listings;
