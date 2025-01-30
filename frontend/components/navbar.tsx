import Link from "next/link";
import { CiViewBoard } from "react-icons/ci";

const Navbar = () => {
  return (
    <aside className="w-[12%] pl-2">
      <nav className="flex flex-col justify-center">
        <Link
          href="/"
          className="inline-block text-4xl tracking-widest
text-cyan-900 font-bold p-4 rounded-br-2xl"
        >
          TaskList
        </Link>
        <div className="pt-5 flex flex-col gap-3">
          <Link
            href="/boards"
            className="bg-[#1d2125] font-bold text-gray-400 flex items-center gap-4 rounded-bl-4xl rounded-tl-4xl w-full text-center p-4"
          >
            <CiViewBoard />
            <span>Boards</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};
export default Navbar;
