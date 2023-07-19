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
  // const [pages, setPages] = React.useState(1) will implement pagination later.
  const [balance, setBalance] = useState(BigInt(0));
  const [isLoading, setIsLoading] = useState(true);
  const [elusiv, setElusiv] = useState<Elusiv>();
  const [keyPair, setKeyPair] = useState<Keypair>();
  const [fetching, setFetching] = useState(true);
  const [connection, setConnection] = useState<Connection>();
  const [isSending, setIsSending] = useState(false);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const [data, setData] = useState<listing[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/getAllListings")
        .then((res) => {
          console.log(res.data.listings);
          setData(res.data.listings);
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      alert(err);
    }
  }, []);

  // const data = [
  //   {
  //     name: "my education pls",
  //     description:
  //       "contribute to organizations dedicated to animal welfare, animal rights, and the protection of endangered species. Your donations support animal rescue and rehabilitation efforts, conservation initiatives, advocacy for animal rights.",
  //     verified: true,
  //   },
  //   {
  //     name: "save my grades",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam",
  //     verified: false,
  //   },
  //   {
  //     name: "Animal Welfare",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam",
  //     verified: true,
  //   },
  //   {
  //     name: "Animal Welfare",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco labor quis nostrum exercitationem ullamco laboriosam",
  //     verified: true,
  //   },
  // ];

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
      />
    );
  });

  useEffect(() => {
    const setParams = async () => {
      const { elusiv: e, connection: conn } = await getParams(wallet);
      setElusiv(e);
      setConnection(conn);
      setIsLoading(false);
    };

    setParams();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      const privateBalance = await elusiv!.getLatestPrivateBalance("LAMPORTS");
      setBalance(privateBalance);
      setFetching(false);
    };

    if (elusiv !== null) {
      getBalance().then(() => console.log("Balance updated"));
    }
  }, [elusiv]);

  const topupHandler = async (e: any) => {
    e.preventDefault();
    const sig = await topup(elusiv!, wallet!, LAMPORTS_PER_SOL, "LAMPORTS");
    console.log(`Topup complete with sig ${sig.signature}`);
  };

  const sendHandler = async (e: any) => {
    e.preventDefault();
    setIsSending(true);
    if (balance > BigInt(0)) {
      // Send half a SOL
      const sig = await send(
        elusiv!,
        new PublicKey("BCBDLNA2UQd2wKE2wTqhF7wragxZTQVeq87vYunEjsdG"), // enter recepient here
        0.5 * LAMPORTS_PER_SOL,
        "LAMPORTS"
      );
    }
  };

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
