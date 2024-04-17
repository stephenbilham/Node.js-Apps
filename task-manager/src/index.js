const express = require("express");
const mongoose = require("./db/mongoose"); // all though this isnt beeing called express is understanding its here (Can remove the const mongoose)
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
// 	if (req.method === "GET") {
// 		res.send("GET requests are disabled");
// 	} else {
// 		next();
// 	}
// });

// app.use((req, res, next) => {
// 	if (req.method !== null) {
// 		res.send(503);
// 	}
// });

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
	console.log("Server is up on port " + port);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
// const task = await Task.findById("661ede0df24e45ddd01819f3");
// // this finds the user document whom created the task
// await task.populate("owner").execPopulate();
// console.log(task.owner);

// const user = await User.findById("661edc31ef8cd9dc4bf56f48");
// await user.populate("tasks").execPopulate();
// console.log(user.tasks);
// };

// main();
// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
// 	const token = jwt.sign({ _id: "12" }, "secretcode", { expiresIn: "7 days" });
// 	console.log(token);

// 	const payload = jwt.verify(token, "secretcode");
// 	console.log(payload);
// };

// myFunction();
