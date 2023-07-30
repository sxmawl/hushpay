import React, { useEffect } from "react";
import ProfileListingCard from "./profileListingCard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

interface Listing {
  _id: string;
  amount: number;
  cause: string;
  createdAt: string;
}

function ProfileListings() {
  const wallet = useWallet();
  const [state, setState] = React.useState("public");
  const [data, setData] = React.useState<Listing[]>([]);

  const changeActiveState = (newValue: string) => {
    setState(newValue);
  };

  useEffect(() => {
    if (wallet.publicKey) {
      axios
        .get(`/api/getPersonalListings`, {
          headers: { user: wallet.publicKey.toString() },
        })
        .then((res) => {
          setData(res.data.listings);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [wallet]);

  // const filtered = data.filter((listing) => listing.type == state);

  const payments = data.map((listing: Listing) => {
    return (
      <ProfileListingCard
        key={listing._id}
        amount={listing.amount}
        date={listing.createdAt}
        cause={listing.cause}
      />
    );
  });

  return (
    <div className="mt-2">
      <div className="flex justify-start">
        <button
          onClick={() => changeActiveState("public")}
          className={`px-4 pb-2 text-[#88898B] ${
            state === "public" ? "current" : ""
          }`}
        >
          public
        </button>
        {/* <button
          onClick={() => changeActiveState("private")}
          className={`px-4 pb-2 text-[#88898B] ${
            state === "private" ? "current" : ""
          } `}
        >
          private
        </button> */}
      </div>
      <div className="w-full border-t-2 flex flex-wrap justify-between pt-8 border-[rgb(217,217,217,0.4)] pb-2">
        {payments}
      </div>
    </div>
  );
}

export default ProfileListings;
