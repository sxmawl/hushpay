"use client";
import Link from "next/link";
import bg from "../../public/assets/hero.png";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <main
      className="px-12 homepage-bg min-h-[92vh]"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="flex font-extrabold min-h-full flex-col items-center justify-start p-24 text-[1rem]">
        <div className="px-4 py-2 mt-0 mb-6 opacity-75 powered-by-indicator">
          powered by:{" "}
          <Link href="https://elusiv.com" className="underlined">
            {" "}
            elusiv{" "}
          </Link>
        </div>
        <div className="text-2xl md:text-7xl font-bold text-center">
          make <span className="text-[#feec95]">private</span> donations{" "}
          <br></br>to causes you care about
        </div>
        <div className="flex items-center justify-start my-8 font-bold">
          <Link className="text-white" href="/listings">
            <button className="flex items-center bg-secondary px-4 py-2 rounded-md">
              projects to donate <FaArrowRight className="ml-2" />
            </button>
          </Link>
          <Link
            className="text-white"
            href="https://sxmawl.notion.site/here-s-why-this-matters-c4acc027393f496c897cc5ba1164247c?pvs=4"
            target="_blank"
          >
            <div className="px-4 py-2 ml-4 cursor-pointer primary-button rounded-md">
              why should i care?
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
