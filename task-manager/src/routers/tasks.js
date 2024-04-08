const express = require("express");
const Task = require("../models/task");

const router = express.Router();

router.post("/tasks", async (req, res) => {
	try {
		const task = new Task(req.body);
		await task.save();
		res.send(task).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});
router.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.put("/tasks/:id", async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await Task.findByIdAndUpdate(taskId, req.body, {
			new: true,
			runValidators: true,
		});

		if (!task) {
			return res.status(404).send("Task not found!");
		}

		res.status(200).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete("/tasks/:id", async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await Task.findByIdAndRemove(taskId);

		if (!task) {
			return res.status(404).send("Task not found!");
		}

		res.status(200).send("Task successfully removed!");
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get("/tasks/:id", async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await Task.findById(taskId);

		if (!task) {
			return res.status(404).send("Task not found!");
		}

		res.status(200).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
