const express = require("express");
const mongoose = require("./db/mongoose"); // all though this isnt beeing called express is understanding its here (Can remove the const mongoose)
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.send(user).status(201);
	} catch (e) {
		res.status(400).send(e);
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

app.listen(port, () => {
	console.log("Server is up on port " + port);
});
