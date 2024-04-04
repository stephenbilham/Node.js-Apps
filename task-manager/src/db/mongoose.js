const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/task-manager-api", {
	useNewUrlParser: true,
	useCreateIndex: true,
});

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		// custom validation
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	age: {
		type: Number,
		validate(value) {
			if (0 > value) {
				console.log("Age cannot be less than 0");
			}
		},
	},
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

const me = new User({ name: "Changu", email: "changu@email.com", age: 12 });

// me.save()
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));

// Create Tasks model
const taskSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		required: true,
	},
});

const Task = mongoose.model("Task", taskSchema);

const task = new Task({ description: "Walk dog", completed: false });

// task
// 	.save()
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));
