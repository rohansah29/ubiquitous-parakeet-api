const express = require("express");
const { BoardModel } = require("../model/boardModel");
const { TaskModel } = require("../model/taskModel");
const { SubTaskModel } = require("../model/subTaskModel");

const boardRouter = express.Router();

boardRouter.post("/boards", async (req, res) => {
  try {
    const { name } = req.body;
    const board = new BoardModel({ name });
    await board.save();
    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create a new board" });
  }
});

boardRouter.get("/boards", async (req, res) => {
  try {
    const boards = await BoardModel.find();
    res.json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch board" });
  }
});

boardRouter.post("/boards/:boardId/tasks", async (req, res) => {
  try {
    const { title, description, status, subtasks } = req.body;
    const task = new TaskModel({ title, description, status, subtasks });
    const board = await BoardModel.findById(req.params.boardId);
    if (!board) {
      res.status(404).json({ error: "Board not found" });
    }
    board.tasks.push(task);
    await Promise.all([task.save(), board.save()]);
    res.json(task);
  } catch (error) {}
});

boardRouter.get("/boards/:boardId/tasks", async (req, res) => {
  try {
    const board = await BoardModel.findById(req.params.boardId).populate(
      "tasks"
    );
    if (!board) {
      res.status(404).json({ error: "Board not found" });
    }
    res.json(board.tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch task in board" });
  }
});

boardRouter.patch("/tasks/:taskId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      { status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to to update task status" });
  }
});

boardRouter.post("/tasks/taskId/subtasks", async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const subtask = new SubTaskModel({ title, isCompleted });
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.subtasks.push(subtask);
    await Promise.all([subtask.save(), task.save()]);
    res.json(subtask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create new subtask" });
  }
});

boardRouter.patch("/subtasks/:subtaskId/completion", async (req, res) => {
  try {
    const { isCompleted } = req.body;
    const subtask = await SubTaskModel.findByIdAndUpdate(
      req.params.subtaskId,
      { isCompleted },
      { new: true }
    );
    if (!subtask) {
      return res.status(404).json({ error: "subTask not found" });
    }
    res.json(subtask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update subtask" });
  }
});



boardRouter.delete("/tasks/:taskId", async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndRemove(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});


boardRouter.delete("/subtasks/:subtaskId", async (req, res) => {
  try {
    const subtask = await SubTaskModel.findByIdAndRemove(req.params.subtaskId);
    if (!subtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }
    res.json(subtask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete subtask" });
  }
});


boardRouter.patch("/tasks/:taskId", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      { title, description, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

module.exports={
    boardRouter
}
