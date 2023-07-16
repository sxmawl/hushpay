"use client";
import { Wallet } from "@/components/Wallet";
import "./globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Wallet>
          <Navbar />
          {children}
        </Wallet>
      </body>
    </html>
  );
}
