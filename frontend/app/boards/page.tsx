"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { MdOutlineWorkOutline } from "react-icons/md";
import BoardsInfo from "@/components/boards-info";

const BoardsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("#000000");
  const formRef = useRef<HTMLDivElement>(null);

  const handleModalToggle = () => {
    setIsCreateModalOpen((prev) => !prev);
    if (isCreateModalOpen) {
      setNewBoardTitle("");
      setNewBoardColor("#ffffff");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newBoardTitle.trim()) {
      alert("Please enter a board title");
      return;
    }

    const newBoard = {
      id: crypto.randomUUID(),
      title: newBoardTitle,
      tasks: [],
      color: newBoardColor,
    };

    setBoards((prevBoards) => [...prevBoards, newBoard]);
    handleModalToggle();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsCreateModalOpen(false);
      }
    };

    if (isCreateModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreateModalOpen]);

  return (
    <main className="w-[88%] rounded-tl-4xl p-4 bg-[#1d2125]">
      <section className="pt-4">
        <h1 className="font-bold text-gray-400 p-4 flex items-center gap-4">
          <MdOutlineWorkOutline />
          YOUR WORKSPACES
        </h1>
        <BoardsInfo onClick={handleModalToggle} />
      </section>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={formRef}
            className="bg-[#a1bdd914] p-6 rounded w-full max-w-md text-gray-300"
          >
            <h2 className="font-semibold text-[14px] mb-4 text-center">
              Create a New Board
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Board Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  className="w-full p-2 border-1 rounded mt-1 focus:border-none "
                  placeholder="Enter board title"
                />
                <label
                  htmlFor="color"
                  className="block mt-2 text-sm font-medium"
                >
                  Board Color
                </label>
                <input
                  id="color"
                  type="color"
                  value={newBoardColor}
                  onChange={(e) => setNewBoardColor(e.target.value)}
                  className="w-full h-12 rounded mt-1"
                />
              </div>
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default BoardsPage;
