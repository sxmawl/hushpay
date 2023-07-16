import React, { useState } from "react";
import Image from 'next/image'
import Link from "next/link";

export default function SuccessModal({
    closeModal
}: {
    closeModal: () => void;
}) {

    return (
        <div className="flex flex-col items-center">
            <div className="relative p-2 flex-auto">
                <p className="text-white-500 text-center text-4xl leading-tight">
                    pat yourself <br></br>
                    on the back
                </p>
                <p className="text-center text-lg text-[rgb(255,255,255,0.5)] font-normal">
                    it's done
                </p>
            </div>
            <Image
                src="/assets/success.png"
                width={200}
                height={200}
                alt="Success"
            />
            <Link href="/listings">
            <button 
                className="bg-secondary px-20 text-lg py-2 rounded-md"
                onClick={closeModal}>
                explore projects
            </button>
            </Link>
        </div>
    )
}