const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = 3000;

// Setup paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebars view engine setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

// routes
app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Stephen Bilham",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		name: "Stephen Bilham",
		description: "Hello, I invented the weather. Let me tell you about it.",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		name: "Stephen Bilham",
		description: "Am I helping you?",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		title: "h1",
		location: "Sd",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Stephen Bilham",
		errorMessage: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Stephen Bilham",
		errorMessage: "Page not found",
	});
});

// start server
app.listen(port, () => {
	console.log("Listening on port", port);
});
