const path = require("path");
const express = require("express");

const app = express();
const port = 3000;
const publicDirectoryPath = path.join(__dirname, "../", "public");

// handlebars view engine setup
app.set("view engine", "hbs");

app.use(express.static(publicDirectoryPath));

// view file
app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		title: "h1",
		location: "Sd",
	});
});

app.listen(port, () => {
	console.log("Listening on port", port);
});
