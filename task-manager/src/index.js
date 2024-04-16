const express = require("express");
const mongoose = require("./db/mongoose"); // all though this isnt beeing called express is understanding its here (Can remove the const mongoose)
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/tasks");

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

const jwt = require("jsonwebtoken");

const myFunction = async () => {
	const token = jwt.sign({ _id: "12" }, "secretcode", { expiresIn: "7 days" });
	console.log(token);

	const payload = jwt.verify(token, "secretcode");
	console.log(payload);
};

myFunction();
