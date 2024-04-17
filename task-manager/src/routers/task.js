const express = require("express");
const Task = require("../models/task");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/tasks", authMiddleware, async (req, res) => {
	try {
		// const task = new Task(req.body);
		const task = new Task({
			...req.body,
			owner: req.user._id,
		});
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});
router.get("/tasks", authMiddleware, async (req, res) => {
	// both work playing with virtual methods though
	try {
		// const task = await Task.find({ owner: req.user._id });
		// res.send(task).status(201);
		await req.user.populate("tasks").execPopulate();
		res.send(req.user.tasks).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/tasks/:id", authMiddleware, async (req, res) => {
	try {
		const _id = req.params.id;

		const task = await Task.findOne({
			_id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send();
		}

		res.status(200).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.patch("/tasks/:id", authMiddleware, async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send();
		}

		Object.assign(task, req.body);
		await task.save();
		res.status(200).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete("/tasks/:id", authMiddleware, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send(task);
		}

		res.status(200).send("Task successfully removed!");
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;
