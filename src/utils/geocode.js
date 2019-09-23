// noinspection DuplicatedCode
const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + process.env.MAPBOXAPIKEY + "&limit=1"

    request({url, json: true}, (error, { body }) => {
        if (error || !body.features) {
            let msg = "Unable to connect to geolocation service";
            if (error) msg += "\nerror: " + error;
            if (body.message) msg += "\nmessage: " + body.message;
            callback(msg, undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find coordinates for " +
                body.query.toString().replace(",", " "),
                undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
