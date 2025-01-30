"use client";
import { use, useState } from "react"; // Importa useState para manejar el estado
import useFetchBoards from "@/hooks/useFetchBoards";
import { FaCalendarDays } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import updateDayTask from "@/hooks/useUpdateDayTask";

interface Task {
  id: number;
  task: string;
  complete: boolean;
  day: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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

  // Estado para rastrear en qué día está cada tarea
  const [tasksByDay, setTasksByDay] = useState<{ [key: string]: Task[] }>({});

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(task)); // Envía la tarea completa
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necesario para permitir el drop
  };

  const handleDrop = (e: React.DragEvent, day: string) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("text/plain")) as Task; // Recupera la tarea
    // Actializar el dia de la tarea
    updateDayTask(id, task.id, day);

    // Actualiza el estado para agregar la tarea al día correspondiente
    setTasksByDay((prev) => {
      const updatedTasksByDay = { ...prev };
      if (!updatedTasksByDay[day]) {
        updatedTasksByDay[day] = [];
      }
      // Evita duplicados
      if (!updatedTasksByDay[day].some((t) => t.id === task.id)) {
        updatedTasksByDay[day].push(task);
      }
      return updatedTasksByDay;
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
      <div className="flex items-center p-4 gap-4 rounded-full text-2xl ">
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
          {board.tasks.length !== 0 ? (
            board.tasks.map((element: Task) =>
              element.day === "" ? (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, element)}
                  key={element.id}
                  id={`${element.id}`}
                  className="p-4 font-bold rounded text-[12px] cursor-grab"
                  style={{
                    backgroundColor: element.complete ? "#00802b" : "#8f0101",
                  }}
                >
                  <h1>{element.task}</h1>
                </div>
              ) : null,
            )
          ) : (
            <div className="p-4 font-bold text-center w-full">
              <h1>No tasks available</h1>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex items-center gap-4 text-gray-400">
        <button className="cursor-pointer gap-4 bg-slate-600 w-fit p-2 rounded ">
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
          {days.map((day, index) => (
            <div
              key={index}
              className="w-[14.28%] h-full p-3 rounded border-1 border-gray-700"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              <h2>{day}</h2>
              {tasksByDay[day]?.map((task) => (
                <div
                  key={task.id}
                  className="p-2 my-2 rounded text-[12px]"
                  style={{
                    backgroundColor:
                      task.complete === true ? "#00802b" : "#8f0101",
                  }}
                >
                  {task.task}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
