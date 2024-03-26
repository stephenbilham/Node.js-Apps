const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Constants for API URLs, access keys, and locations
// const weatherApiUrl = "http://api.weatherstack.com/current";
// const weatherAccessKey = "26763fc2175213469456dad1c053c430";
// const weatherLocation = "san diego";
// const weatherUnits = "f";

// const fetchWeather = () => {
// 	const params = {
// 		access_key: weatherAccessKey,
// 		query: weatherLocation,
// 		units: weatherUnits,
// 	};
// 	return axios
// 		.get(weatherApiUrl, { params })
// 		.then((response) => response.data)
// 		.catch((error) => {
// 			console.error("Error fetching weather data:", error);
// 			throw error;
// 		});
// };

// Main function to fetch weather and geocode
// (async () => {
// 	try {
// 		// // Fetch weather
// 		// const { temperature, precip, weather_descriptions } = (await fetchWeather())
// 		// 	.current;
// 		// console.log(
// 		// 	`Weather: ${weather_descriptions[0]}, Temperature: ${temperature}°F, Precipitation: ${precip}%`
// 		// );

// 	} catch (error) {
// 		console.error("Error:", error);
// 	}
// })();

geocode("boston", (error, data) => {
	if (error) {
		return console.error("Error geocoding:", error);
	} else {
		const { longitude, latitude, location } = data;
		forecast(longitude, latitude, (error, forecastData) => {
			if (error) {
				return console.error("Error fetching forecast data:", error);
			} else {
				console.log(`Forecast data for ${location}:`, forecastData);
			}
		});
	}
});

// Forcast
