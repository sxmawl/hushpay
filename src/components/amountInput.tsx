import React, { useState } from "react";
import Image from 'next/image'

export default function AmountInput({
    liveSolPrice
}: {
    liveSolPrice: number;
}) {
    const [amount, setAmount] = useState<string>("0")
    return (
        <div className="flex items-center justify-between border-r-10 border-[1px] rounded-md border-[rgb(255,255,255,0.5)] py-1 px-2">
            <input
                onChange={(event)=>setAmount(event.target.value)}
                className=" w-24 text-[0.8rem] bg-transparent md:text-base focus:outline-none relative py-2 px-2"
                type="number"
                placeholder="0"
            ></input>

            <div className="flex justify-center items-center">
                <p className="font-light text-[rgb(255,255,255,0.5)] w-20 text-right"> 
                    <span className="text-[#feec95] mr-1">$</span> 
                    { Number.isNaN(parseFloat(amount) * liveSolPrice) ? "0": (parseFloat(amount)*liveSolPrice).toFixed(2)}
                </p>
                <div className="flex ml-2 bg-[rgb(255,255,255,0.05)] items-center justify-center border-r-10 border-[1px] rounded-md border-[rgb(255,255,255,0.5)] py-1 px-2">
                    <Image
                        src="/assets/sol-bw.png"
                        width={20}
                        height={20}
                        alt="Solana Logo"
                    />
                    <p className="uppper-forced ml-2">SOL</p>
                </div>
            </div>
        </div>
    )
}