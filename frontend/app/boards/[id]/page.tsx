"use client";

import React, { use, useEffect, useRef, useState } from "react";
import useFetchBoards from "@/hooks/useFetchBoards";
import { FaCalendarDays } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import updateDayTask from "@/hooks/useUpdateDayTask";
import fetchTask from "@/hooks/fetchTask";
import updateTask from "@/hooks/updateTask";

interface Task {
  id: number;
  task: string;
  complete: boolean;
  day: string;
}

interface PageProps {
  params: { id: string };
}

const days: Array<string> = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = use(params);
  const { board, loading } = useFetchBoards(id);
  const [showDescriptionTask, setShowDescriptionTask] =
    useState<boolean>(false);
  const [tasksByDay, setTasksByDay] = useState<{ [key: string]: Task[] }>({});
  const [task, setTask] = useState<Task>();
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskComplete, setTaskComplete] = useState<boolean>(
    task?.complete || false,
  );

  const descriptionTask = useRef<HTMLDivElement>(null);

  const handleToogle = () => {
    setShowDescriptionTask((prev) => !prev);
  };

  const handleButtonTask = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const idTask = event.currentTarget.id;
    const data = await fetchTask(id, idTask);
    setTask(data);
    handleToogle();
  };
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleOnChangeComplete = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isComplete = e.target.value === "complete" ? true : false;
    setTaskComplete(isComplete);
  };

  const handleSubmit = async () => {
    await updateTask(id, task?.id, taskTitle, taskComplete);
  };
  useEffect(() => {
    if (task) {
      setTaskTitle(task?.task);
    }
  }, [task]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        descriptionTask.current &&
        !descriptionTask.current.contains(event.target as Node)
      ) {
        setShowDescriptionTask(false);
      }
    };

    if (showDescriptionTask) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDescriptionTask]);

  // Sincroniza las tareas con el estado cada vez que `board.tasks` cambie
  useEffect(() => {
    if (board?.tasks) {
      const groupedTasks: { [key: string]: Task[] } = {};

      board.tasks.forEach((task: Task) => {
        const dayKey = task.day || "";
        if (!groupedTasks[dayKey]) {
          groupedTasks[dayKey] = [];
        }
        groupedTasks[dayKey].push(task);
      });

      setTasksByDay(groupedTasks);
    }
  }, [board?.tasks]); // Se ejecuta cada vez que cambian las tareas del board

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(task));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, day: string) => {
    const task = JSON.parse(e.dataTransfer.getData("text/plain")) as Task;

    // Actualizar el backend
    updateDayTask(id, task.id, day);

    // Actualizar el estado local sin esperar la actualización del backend
    setTasksByDay((prev) => {
      const updatedTasks = { ...prev };

      // Eliminar la tarea del día anterior
      Object.keys(updatedTasks).forEach((d) => {
        updatedTasks[d] = updatedTasks[d].filter((t) => t.id !== task.id);
      });

      // Agregar la tarea al nuevo día
      if (!updatedTasks[day]) {
        updatedTasks[day] = [];
      }
      updatedTasks[day].push({ ...task, day });

      return updatedTasks;
    });
  };

  if (loading) {
    return (
      <main className="w-[88%] flex justify-center items-center rounded-tl-4xl p-4 bg-[#1d2125] text-white">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!board) {
    return (
      <main className="w-[88%] flex flex-col gap-4 justify-center items-center rounded-tl-4xl p-4 bg-[#1d2125] text-white">
        <h1 className="text-4xl">Not Found</h1>
        <p>Board: {id}</p>
      </main>
    );
  }

  return (
    <main className="w-[88%] rounded-tl-4xl rounded-bl-4xl p-4 bg-[#1d2125] text-white">
      <div className="flex items-center p-4 gap-4 rounded-full text-2xl">
        <div
          className="w-[30px] h-[30px] rounded-full"
          style={{ backgroundColor: board.color }}
        ></div>
        <h1>{board.title}</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <span className="text-gray-400 flex items-center gap-3 font-bold">
          <FaTasks />
          Task
        </span>
        <div className="flex gap-4 p-4 border border-gray-700 rounded">
          {tasksByDay[""]?.length ? (
            tasksByDay[""].map((task) => (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                key={task.id}
                id={`${task.id}`}
                className="p-4 font-bold rounded text-[12px] cursor-grab"
                style={{
                  backgroundColor: task.complete ? "#00802b" : "#8f0101",
                }}
              >
                <h1>{task.task}</h1>
              </div>
            ))
          ) : (
            <div className="p-4 font-bold text-center w-full">
              <h1>No tasks available</h1>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex items-center gap-4 text-gray-400">
        <button className="cursor-pointer gap-4 bg-slate-600 w-fit p-2 rounded">
          <IoMdAdd />
        </button>
        <span>Add task</span>
      </div>
      <div className="flex flex-col gap-4 p-4 w-full h-[70%]">
        <span className="flex items-center text-gray-400 font-bold gap-3">
          <FaCalendarDays />
          Calendar
        </span>
        <div className="flex text-center gap-3 border-1 w-full h-full border-gray-700 p-4 text-gray-400 font-bold">
          {days.map((day) => (
            <div
              key={day}
              className="w-[14.28%] h-full p-3 rounded border-1 border-gray-700"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              <h2>{day}</h2>
              {tasksByDay[day]?.map((task) => (
                <button
                  key={task.id}
                  id={task.id.toString()}
                  onClick={handleButtonTask}
                  className="p-2 my-2 rounded text-white text-[12px]"
                  style={{
                    backgroundColor: task.complete ? "#00802b" : "#8f0101",
                  }}
                >
                  {task.task}
                </button>
              ))}
            </div>
          ))}
          {showDescriptionTask && (
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
              <div
                ref={descriptionTask}
                className="bg-gray-800 p-6 rounded w-full max-w-md text-gray-300"
              >
                <h3>Task Edit</h3>
                <form className="mt-4 p-4" onSubmit={handleSubmit}>
                  <label className="block mt-2 text-sm font-medium">
                    Title
                  </label>
                  <input
                    className="w-full p-2 border-1 rounded mt-1 focus:border-none "
                    value={taskTitle}
                    onChange={handleOnChangeTitle}
                  />
                  <label className="block">Status</label>
                  <select
                    onChange={handleOnChangeComplete}
                    className="px-4 pt-2 text-center border-1 rounded"
                    defaultValue={task?.complete ? "complete" : "incomplete"}
                  >
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                  <button
                    className="bg-red-600 p-2 rounded"
                    onClick={handleToogle}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 p-2 rounded">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
