import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExpressCoin Agent - GameFi Delivery Simulation",
  description: "Platform GameFi untuk Agent Pengiriman Koin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="light">
      <body className={`${inter.className} bg-base-100`}>
        {children}
      </body>
    </html>
  );
}
