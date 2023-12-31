import React, { useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface Cause {
  name: string;
  description: string;
  publicKey: string;
  verified: boolean;
  _id: string;
  createdAt: string;
}

function PaymentCard({
  amount,
  date,
  cause,
  sent,
  txnId
}: {
  amount: number;
  date: string;
  cause: Cause;
  sent: boolean;
  txnId: string;
}) {
  const [inUSD, setInUSD] = React.useState(0);
  useEffect(() => {
    try {
      fetch("https://api.coingecko.com/api/v3/coins/solana")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.market_data.current_price.usd);
          setInUSD(
            parseFloat((amount * data.market_data.current_price.usd).toFixed(2))
          );
        });
    } catch (e) {}
  }, []);

  const goToExplorer = () => {
    window.open(`https://explorer.solana.com/tx/${txnId}`);
  };

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
            ${inUSD}{" "}
            <span className="text-[rgb(255,255,255,0.5)] uppercase">
              &#40;{amount} SOL&#41;
            </span>
          </div>
        </div>
        <div className="flex justify-center md:justify-start text-sm font-bold text-[rgb(255,255,255,0.75)]">
          on: {date.slice(0, 10)}
        </div>
        <div className="flex justify-center md:justify-start text-sm font-bold text-[rgb(255,255,255,0.75)]">
          for:{" "}
          <span className="cursor-pointer text-[rgb(255,255,255,0.95)] underline">
            {cause.name}
          </span>
        </div>
      </div>
      <button
        onClick={goToExplorer}
        className="bg-secondary px-4 py-2 mt-4 md:mt-0 rounded-md font-bold"
      >
        view details
      </button>
      <div className="hidden"> :D </div>
    </div>
  );
}

export default PaymentCard;
