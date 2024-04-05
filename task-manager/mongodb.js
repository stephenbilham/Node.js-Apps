// const { MongoClient, ObjectID } = require("mongodb");

// const connectionURL = "mongodb://localhost:27017";
// const databaseName = "task-manager";

// const id = new ObjectID();
// MongoClient.connect(
// 	connectionURL,
// 	{ useNewUrlParser: true },
// 	{ useUnifiedTopology: true },
// 	(error, client) => {
// 		if (error) {
// 			return console.error("Unable to connect to database:", error);
// 		}

// 		const db = client.db(databaseName);

// 		/* WRITE */
// 		// db.collection("users").insertOne(
// 		// 	{
// 		// 		_id: id, // just an example that you can set your own, but mongodb will do it behind the scenes
// 		// 		name: "Stephen",
// 		// 		age: 30,
// 		// 	},
// 		// 	(err, result) => {
// 		// 		if (err) {
// 		// 			return console.error("Error inserting document:", err);
// 		// 		}

// 		// 		console.log("Document inserted successfully:", result.ops);
// 		// 	}
// 		// );

// 		// db.collection("users").insertMany(
// 		// 	[
// 		// 		{
// 		// 			name: "Ryan",
// 		// 			age: 29,
// 		// 		},
// 		// 		{
// 		// 			name: "steve",
// 		// 			age: 30,
// 		// 		},
// 		// 		{
// 		// 			name: "john",
// 		// 			age: 31,
// 		// 		},
// 		// 	],
// 		// 	(err, result) => {
// 		// 		if (err) {
// 		// 			return console.error("Error inserting documents:", err);
// 		// 		}
// 		// 		console.log("Documents inserted successfully:", result.ops);
// 		// 	}
// 		// );

// 		// db.collection("tasks").insertMany(
// 		// 	[
// 		// 		{
// 		// 			description: "Clean car",
// 		// 			completed: false,
// 		// 		},
// 		// 		{
// 		// 			description: "Go to the grocery store",
// 		// 			completed: false,
// 		// 		},
// 		// 		{
// 		// 			description: "Apply for jobs",
// 		// 			completed: true,
// 		// 		},
// 		// 	],
// 		// 	(err, result) => {
// 		// 		if (err) {
// 		// 			return console.error("Error inserting task documents:", err);
// 		// 		}

// 		// 		console.log("Task Documents inserted successfully:", result.ops);
// 		// 	}
// 		// );

// 		/* READ */
// 		// Access a specific collection (e.g., "tasks")
// 		// db.collection("users").findOne(
// 		// 	{ _id: new ObjectID("660c8306f7b9be1fc2add45c") },
// 		// 	(err, user) => {
// 		// 		if (err) {
// 		// 			return console.error("unable to fetch", err);
// 		// 		}

// 		// 		console.log(user);
// 		// 	}
// 		// );

// 		// db.collection("users")
// 		// 	.find({ age: 30 })
// 		// 	.toArray((err, users) => {
// 		// 		if (err) {
// 		// 			return console.error("unable to fetch", err);
// 		// 		}

// 		// 		console.log(users);
// 		// 	});

// 		// db.collection("tasks").findOne(
// 		// 	{
// 		// 		_id: new ObjectID("660c7c1ec531061d172b23bb"),
// 		// 	},
// 		// 	(err, task) => {
// 		// 		if (err) {
// 		// 			return console.error("unable to find task", err);
// 		// 		}
// 		// 		console.log(task);
// 		// 	}
// 		// );

// 		// db.collection("tasks")
// 		// 	.find({ completed: false })
// 		// 	.toArray((err, task) => {
// 		// 		if (err) {
// 		// 			return console.error("cannot get tasks", err);
// 		// 		}

// 		// 		console.log(task);
// 		// 	});

// 		/* UPDATE */
// 		// db.collection("users")
// 		// 	.updateOne(
// 		// 		{ _id: new ObjectID("660c8306f7b9be1fc2add45d") },
// 		// 		{ $set: { name: "Mike" }, $inc: { age: 1 } }
// 		// 	)
// 		// 	.then((result) => {
// 		// 		console.log(result);
// 		// 	})
// 		// 	.catch((err) => {
// 		// 		console.log(err);
// 		// 	});

// 		// db.collection("tasks")
// 		// 	.updateMany({ completed: false }, { $set: { completed: true } })
// 		// 	.then((res) => console.log(res))
// 		// 	.catch((err) => console.log(err));

// 		/* DELETE */
// 		// 	db.collection("users")
// 		// 		.remove({
// 		// 			_id: new ObjectID("660c8306f7b9be1fc2add45e"),
// 		// 		})
// 		// 		.then((res) => console.log(res))
// 		// 		.catch((err) => console.log(err));
// 	}
// );
