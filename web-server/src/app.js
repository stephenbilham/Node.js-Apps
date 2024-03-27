const path = require("path");
const express = require("express");

const app = express();
const port = 3000;
const publicDirectoryPath = path.join(__dirname, "../", "public");

// home route
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
	res.send({
		title: "h1",
		location: "Sd",
	});
});

app.listen(port, () => {
	console.log("Listening on port", port);
});
