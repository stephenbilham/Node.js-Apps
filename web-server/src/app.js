const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("../../weather-app/utils/forecast");

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
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address!",
		});
	}

	geocode(req.query.address, (error, data) => {
		if (error) {
			return res.send({ error });
		}

		if (!data || !data.latitude || !data.longitude) {
			// Check if data is null or undefined, or if latitude and longitude are missing
			return res.send({ error: "Invalid location data" });
		}

		const { latitude, longitude, location } = data;

		forecast(longitude, latitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({ error: "You must provide a search term" });
	}

	res.send({
		product: [],
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
