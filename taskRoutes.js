const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    userId: req.user.id,
  });

  await task.save();

  req.io.emit("taskUpdated");

  res.json(task);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  req.io.emit("taskUpdated");

  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  req.io.emit("taskUpdated");

  res.json({ msg: "Task Deleted" });
});

module.exports = router;