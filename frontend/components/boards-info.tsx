import Link from "next/link";
import useFetchWorkSpaces from "@/hooks/useFetchWorkSpaces";

interface Props {
  onClick: () => void;
}

const DoardsInfo: React.FC<Props> = ({ onClick }) => {
  const { data, loading } = useFetchWorkSpaces();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <>
      <header className="w-full">
        <div className="flex items-center gap-4 p-4">
          <div className="w-[30px] h-[30px] flex items-center justify-center rounded text-xl bg-green-400">
            T
          </div>
          <h2 className="text-gray-500 font-bold">{data[0]?.title}</h2>
        </div>
      </header>
      <div className="w-full min-h-[300px] p-4 flex flex-wrap gap-4">
        {data[0]?.boards.map((board) => (
          <Link
            key={board.id}
            href={`/boards/${board.id}`}
            style={{
              backgroundColor: board.color,
              color: board.color === "#000000" ? "#fff" : "",
            }}
            className="rounded w-48 h-32 p-4 hover:opacity-90  transition-opacity"
          >
            <h3 className="text-2xl break-words">{board.title}</h3>
          </Link>
        ))}
        <button
          onClick={onClick}
          className="bg-[#a1bdd914] text-[#b6c2cf] rounded w-48 h-32 p-4 font-medium hover:bg-gray-700 transition-colors"
        >
          Create new board
        </button>
      </div>
    </>
  );
};

export default DoardsInfo;
