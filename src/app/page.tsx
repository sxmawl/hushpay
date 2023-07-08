import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-12">
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link className="text-white" href="/listings">Click here.</Link>
      </div>
    </main>
  )
}