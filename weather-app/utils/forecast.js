const axios = require("axios");

// Forecast function to fetch forecast data
const forecast = (longitude, latitude, callback) => {
	const apiUrl = "http://api.weatherstack.com/current";
	const accessKey = "26763fc2175213469456dad1c053c430";
	axios
		.get(apiUrl, {
			params: {
				access_key: accessKey,
				query: `${latitude},${longitude}`,
				units: "f",
			},
		})
		.then((response) => {
			const { temperature, precip, weather_descriptions } =
				response.data.current;
			const forecastData = {
				temperature,
				precip,
				weatherDescription: weather_descriptions[0],
			};
			callback(null, forecastData);
		})
		.catch((error) => {
			console.error("Error fetching forecast data:", error);
			callback(error, null);
		});
};

module.exports = forecast;
