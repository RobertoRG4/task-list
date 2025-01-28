"use client";
import { use } from "react";
import useFetchBoards from "@/hooks/useFetchBoards";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = use(params);
  const { board, loading } = useFetchBoards(id);

  console.log(board);
  if (loading) {
    return (
      <main className="w-[88%] flex justify-center items-center rounded-tl-4xl p-4 bg-[#1d2125] text-white">
        <h1>Loading...</h1>
      </main>
    );
  }
  if (!board) {
    return (
      <main className="w-[88%] flex flex-col gap-4 justify-center  items-center rounded-tl-4xl p-4 bg-[#1d2125] text-white">
        <h1 className="text-4xl">Not Found</h1>
        <p>Board: {id}</p>
      </main>
    );
  }
  return (
    <main className="w-[88%] rounded-tl-4xl p-4 bg-[#1d2125] text-white">
      <h1> {board.title}</h1>
    </main>
  );
};
export default Page;
