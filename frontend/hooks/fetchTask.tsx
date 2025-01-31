const fetchTask = async (idBoard, idTask) => {
  const data = await fetch(
    `http://localhost:7070/api/v1/task-list/workspaces/1/boards/${idBoard}/tasks/${idTask}`,
  );
  return await data.json();
};
export default fetchTask;
