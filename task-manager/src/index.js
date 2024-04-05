const express = require("express");
const mongoose = require("./db/mongoose"); // all though this isnt beeing called express is understanding its here (Can remove the const mongoose)
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.get("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found!");
		}

		res.status(200).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.post("/users", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.send(user).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.put("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
			runValidators: true,
		});

		if (!user) {
			return res.status(404).send("User not found!");
		}

		res.status(200).send(user);
	} catch (e) {
		res.status(404).send("User not found!");
	}
});

app.delete("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByIdAndRemove(userId);

		if (!user) {
			return res.status(404).send("User not found!");
		}

		res.status(200).send("User successfully removed!");
	} catch (e) {
		res.status(500).send(e);
	}
});

app.post("/tasks", async (req, res) => {
	try {
		const task = new Task(req.body);
		await task.save();
		res.send(task).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});
app.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.put("/tasks/:id", async (req, res) => {
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

app.delete("/tasks/:id", async (req, res) => {
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

app.get("/tasks/:id", async (req, res) => {
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

app.listen(port, () => {
	console.log("Server is up on port " + port);
});
