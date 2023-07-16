import React from "react";
import ProfileListingCard from "./profileListingCard";

function ProfileListings() {
  const [state, setState] = React.useState("public");

  const changeActiveState = (newValue: string) => {
    setState(newValue);
  };

  const data = [
    {
      amount: "145203.4",
      date: "24th March, 2023",
      cause: "educat",
      type: "private"
    },
    {
      amount: "5953.204",
      date: "24th March, 2023",
      cause: "someo",
      type: 'private'
    },
    {
      amount: "5933.4",
      date: "24th March, 2023",
      cause: "save m",
      type: 'public'
    },
    {
      amount: "2301.4",
      date: "24th March, 2023",
      cause: "animal shelter donation",
      type: 'public'
    },
  ];

  const filtered = data.filter(listing => listing.type == state);

  const payments = filtered.map((listing) => {
    return (
      <ProfileListingCard
      key={listing.type.toString() + listing.amount}
        amount={listing.amount}
        date={listing.date}
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
        <button
          onClick={() => changeActiveState("private")}
          className={`px-4 pb-2 text-[#88898B] ${
            state === "private" ? "current" : ""
          } `}
        >
          private
        </button>
      </div>
      <div className="w-full border-t-2 flex flex-wrap justify-between pt-8 border-[rgb(217,217,217,0.4)] pb-2">
        {payments}
      </div>
    </div>
  );
}

export default ProfileListings;
