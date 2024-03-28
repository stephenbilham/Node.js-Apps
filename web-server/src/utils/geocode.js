const axios = require("axios");

const geocode = (address, callback) => {
	axios
		.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`, {
			params: {
				access_token:
					"pk.eyJ1Ijoic3RlcGhlbmJpbGhhbTEzIiwiYSI6ImNsdTh1b2xpbzAyeHgybXFlb2xhemt6bDUifQ.xXlw1sFd_TCl8GDf8ozftw",
				limit: 1,
			},
		})
		.then(({ data }) => {
			if (data.features.length === 0) {
				return callback("Unable to find location, please try again", null);
			}

			const {
				place_name,
				center: [longitude, latitude],
			} = data.features[0];

			const transformedData = { location: place_name, longitude, latitude };

			return callback(null, transformedData);
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
			return callback(error, null);
		});
};

module.exports = geocode;
