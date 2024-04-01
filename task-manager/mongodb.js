const { MongoClient } = require("mongodb");

const connectionURL = "mongodb://localhost:27017";
const databaseName = "task-manager";

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true },
	(error, client) => {
		if (error) {
			return console.error("Unable to connect to database:", error);
		}

		const db = client.db(databaseName);

		db.collection("users").insertOne(
			{
				name: "Stephen2",
				age: "20", // Age should be provided as a string
			},
			(err, result) => {
				if (err) {
					return console.error("Error inserting document:", err);
				}

				console.log("Document inserted successfully:", result.insertedId);
			}
		);
	}
);
