const updateTask = async (id, idtask, title, complete) => {
  await fetch(
    `http://localhost:7070/api/v1/task-list/workspaces/1/boards/${id}/tasks/${idtask}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        status: complete,
      }),
    },
  );
};
export default updateTask;
