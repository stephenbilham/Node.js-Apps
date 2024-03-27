const path = require("path");
const express = require("express");

const app = express();
const port = 3000;

// Setup paths
const publicDirectoryPath = path.join(__dirname, "../", "public");
const viewsPath = path.join(__dirname, "../", "templates");

// handlebars view engine setup
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

// view -- set up static directory to serve
app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Stephen Bilham",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		description: "Hello, I invented the weather. Let me tell you about it.",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		description: "Am I helping you?",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		title: "h1",
		location: "Sd",
	});
});

// start server
app.listen(port, () => {
	console.log("Listening on port", port);
});
