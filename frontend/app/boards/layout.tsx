import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Boards | TaskList",
  description: "trello clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-screen h-screen bg-green-400 flex">
      <Navbar />
      {children}
    </div>
  );
}
