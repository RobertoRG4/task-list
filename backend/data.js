const data = [
  {
    id: 1,
    title: "TaskList Workspace",
    boards: [
      {
        id: 1,
        title: "Board 1",
        tasks: [
          { id: 1, task: "Completar el nodejs", complete: false, day: "" },
          { id: 2, task: "Completar el typescript", complete: true, day: "" },
        ],
        color: "#eee",
      },
      {
        id: 2,
        title: "Board 2",
        tasks: [
          { id: 1, task: "Completar el golang", complete: false, day: "" },
          { id: 2, task: "Completar el elixir", complete: true, day: "" },
          { id: 3, task: "Completar el java", complete: false, day: "" },
        ],
        color: "#ef1",
      },
    ],
  },
];
export default data;
