const axios = require("axios");

const geocode = (address, callback) => {
	const params = {
		access_token:
			"pk.eyJ1Ijoic3RlcGhlbmJpbGhhbTEzIiwiYSI6ImNsdTh1b2xpbzAyeHgybXFlb2xhemt6bDUifQ.xXlw1sFd_TCl8GDf8ozftw",
		limit: 1,
	};
	axios
		.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`, {
			params,
		})
		.then((response) => {
			const { data } = response;

			if (data.features.length === 0) {
				callback("Unable to find location, please try again", null);
			} else {
				const { place_name, center } = data.features[0];
				const [longitude, latitude] = center;
				const transformedData = { location: place_name, longitude, latitude };
				callback(null, transformedData);
			}
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
			callback(error, null);
		});
};

module.exports = geocode;
