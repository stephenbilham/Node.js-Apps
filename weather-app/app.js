const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
	return console.log("Please add an address");
}

geocode(address, (error, { longitude, latitude, location }) => {
	if (error) {
		return console.error("Error geocoding:", error);
	}

	//forcast query
	forecast(longitude, latitude, (error, forecastData) => {
		if (error) {
			return console.error("Error fetching forecast data:", error);
		}

		const { weatherDescription, temperature, precip } = forecastData;

		console.log(
			`Weather Forecast for ${location}: There is a ${weatherDescription}, Temperature is ${temperature}, and a ${precip}% chance of rain.`
		);
	});
});
