const express = require("express");
const mongoose = require("./db/mongoose"); // all though this isnt beeing called express is understanding its here (Can remove the const mongoose)
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/tasks");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
	console.log("Server is up on port " + port);
});
