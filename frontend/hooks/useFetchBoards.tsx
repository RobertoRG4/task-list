"use client";
import { useEffect, useState } from "react";

interface Board {
  id: number;
  title: string;
  color: string;
  tasks: [];
}

const useFetchBoards = (id: string) => {
  const [board, setBoard] = useState<Board | null>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7070/api/v1/task-list/workspaces/1/boards/${id}`,
          {
            method: "GET",
          },
        );
        const json = await response.json();
        setBoard(json);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return { board, loading };
};
export default useFetchBoards;
