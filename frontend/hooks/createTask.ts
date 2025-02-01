const CreateTask = async (idBoard, title, status) => {
  await fetch(
    `http://localhost:7070/api/v1/task-list/workspaces/1/boards/${idBoard}/tasks`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, status: status }),
    },
  );
};
export default CreateTask;
