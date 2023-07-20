import React, { useEffect } from "react";
import PaymentCard from "./paymentCard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

function Payments() {
  const [state, setState] = React.useState("all");
  const [data, setData] = React.useState([]);
  const wallet = useWallet();

  const changeActiveState = (newValue: string) => {
    setState(newValue);
  };

  interface Cause {
    name: string;
    description: string;
    verified: boolean;
    _id: string;
    publicKey: string;  
    createdAt: string;
  }
  interface Payment {
    to: string;
    from: string;
    causeId: Cause;
    createdAt: string;
    amount: number;
    txnId: string;
    _id: string;
  }

  useEffect(() => {
    if (wallet.publicKey) {
      axios
        .get(`http://localhost:3000/api/getPayments`, {
          headers: { user: wallet.publicKey.toString() },
        })
        .then((res) => {
          setData(res.data.payments);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [wallet]);

  const filtered = data.filter((payment: Payment) => {
    if (wallet.publicKey) {
      if (state === "all") {
        return true;
      } else if (state === "received") {
        return payment.to === wallet.publicKey.toString();
      } else if (state === "sent") {
        return payment.from === wallet.publicKey.toString();
      }
    }
  });

  const payments = filtered.map((payment: Payment) => {
    return (
      <PaymentCard
        key={payment._id}
        amount={payment.amount}
        date={payment.createdAt}
        cause={payment.causeId}
        txnId={payment.txnId}
        sent={payment.from === wallet.publicKey!.toString()}
      />
    );
  });

  return (
    <div className="mt-2">
      <div className="flex justify-start">
        <button
          onClick={() => changeActiveState("all")}
          className={`px-4 pb-2 text-[#88898B]  ${
            state === "all" ? "current" : ""
          }`}
        >
          all payments
        </button>
        <button
          onClick={() => changeActiveState("received")}
          className={`px-4 pb-2 text-[#88898B] ${
            state === "received" ? "current" : ""
          }`}
        >
          received
        </button>
        <button
          onClick={() => changeActiveState("sent")}
          className={`px-4 pb-2 text-[#88898B] ${
            state === "sent" ? "current" : ""
          } `}
        >
          sent
        </button>
      </div>
      <div className="w-full border-t-2 flex flex-wrap justify-between pt-8 border-[rgb(217,217,217,0.4)] pb-2">
        {payments}
      </div>
    </div>
  );
}

export default Payments;
