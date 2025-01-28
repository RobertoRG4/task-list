"use client";
import { useState, useEffect } from "react";
interface Board {
  id: number;
  title: string;
  tasks: string[];
  color: string;
}

interface TaskList {
  id: number;
  title: string;
  boards: Board[];
}

const useFetchWorkSpaces = () => {
  const [data, setData] = useState<TaskList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:7070/api/v1/task-list/workspaces",
          {
            method: "GET",
          },
        );
        const json: TaskList[] = await response.json();
        setData(json);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};
export default useFetchWorkSpaces;
