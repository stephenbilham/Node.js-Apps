const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

taskSchema.pre("save", async function (next) {
	// next(); // Call next() to pass control to the next middleware in the stack
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
