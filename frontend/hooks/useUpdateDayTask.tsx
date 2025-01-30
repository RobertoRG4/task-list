const updateDayTask = (id, idtask, dia) => {
  const update = async () => {
    await fetch(
      `http://localhost:7070/api/v1/task-list/workspaces/1/boards/${id}/tasks/${idtask}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: dia }),
      },
    );
  };
  update();
};
export default updateDayTask;
