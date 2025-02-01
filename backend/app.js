import express, { json, urlencoded } from "express";
import data from "./data.js";
import cors from "cors";

const app = express();
const port = 7070;

app.use(cors());
app.use(express.json());
app.use(urlencoded());

const workspaceRouter = express.Router();

workspaceRouter.get("/", (_req, res) => {
  res.json(data);
});

workspaceRouter.get("/:idWorkspaces", (req, res) => {
  const workspace = data[req.params.idWorkspaces - 1];
  if (workspace) {
    res.json(workspace);
  } else {
    res.status(404).json({ error: "Workspace not found" });
  }
});
workspaceRouter.get("/:idWorkspaces/boards/:idBoard", (req, res) => {
  const workspace = data[req.params.idWorkspaces - 1];
  if (workspace) {
    const boards = workspace.boards[req.params.idBoard - 1];
    res.json(boards);
  } else {
    res.status(404).json({ error: "not found" });
  }
});
workspaceRouter.post("/:idWorkspaces/boards/:idBoard/tasks/", (req, res) => {
  const workspace = data[req.params.idWorkspaces - 1];
  if (workspace) {
    const boards = workspace.boards[req.params.idBoard - 1];
    if (boards) {
      const task = boards.tasks;
      const { title, status } = req.body;
      task.push({
        id: task.length + 1,
        task: title,
        complete: status,
        day: "",
      });
      res.json({ status: "ok" });
    } else {
      res.status(404).json({ error: "not found board" });
    }
  } else {
    res.status(404).json({ error: "not found" });
  }
});

workspaceRouter.put(
  "/:idWorkspaces/boards/:idBoard/tasks/:idTask",
  (req, res) => {
    const workspace = data[req.params.idWorkspaces - 1];
    if (workspace) {
      const boards = workspace.boards[req.params.idBoard - 1];
      if (boards) {
        const task = boards.tasks[req.params.idTask - 1];
        const { title, status, day } = req.body;
        if (title) {
          task.task = title;
        }
        if (status !== undefined) {
          task.complete = status;
        }
        if (day) {
          task.day = day;
        }
        res.json({ status: "ok" });
      } else {
        res.status(404).json({ error: "not found board" });
      }
    } else {
      res.status(404).json({ error: "not found" });
    }
  },
);
workspaceRouter.get(
  "/:idWorkspaces/boards/:idBoard/tasks/:idTask",
  (req, res) => {
    const workspace = data[req.params.idWorkspaces - 1];
    if (workspace) {
      const boards = workspace.boards[req.params.idBoard - 1];
      if (boards) {
        const task = boards.tasks[req.params.idTask - 1];
        res.json(task);
      } else {
        res.status(404).json({ error: "not found board" });
      }
    } else {
      res.status(404).json({ error: "not found" });
    }
  },
);
app.use("/api/v1/task-list/workspaces", workspaceRouter);

app.listen(port, () => console.log(`http://localhost:${port}`));
