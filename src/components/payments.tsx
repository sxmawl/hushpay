import React from "react";
import PaymentCard from "./paymentCard";

function Payments() {
  const [state, setState] = React.useState("all");

  const changeActiveState = (newValue: string) => {
    setState(newValue);
  };

  const data = [
    {
      amount: "203.4",
      inSol: "22.3",
      date: "24th March, 2023",
      cause: "education bill donation",
      sent: false,
    },
    {
      amount: "203.4",
      inSol: "22.3",
      date: "24th March, 2023",
      cause: "someone's birthday",
      sent: true,
    },
    {
      amount: "203.4",
      inSol: "22.3",
      date: "24th March, 2023",
      cause: "save my doggo",
      sent: false,
    },
    {
      amount: "203.4",
      inSol: "22.3",
      date: "24th March, 2023",
      cause: "animal shelter donation",
      sent: true,
    },
  ];

  const filtered = data.filter((payment) => {
    if (state === "all") {
      return true;
    } else if (state === "received") {
      return !payment.sent;
    } else if (state === "sent") {
      return payment.sent;
    }
  });

  const payments = filtered.map((payment) => {
    return (
      <PaymentCard
        amount={payment.amount}
        inSol={payment.inSol}
        date={payment.date}
        cause={payment.cause}
        sent={payment.sent}
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
