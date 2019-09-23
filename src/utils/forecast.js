const request = require("request");

const forecast = (lng, lat, callback) => {
    if (typeof lng !== "number") {
        if (isNaN(lng = parseFloat(lng))) {
            callback(lng + " is not a proper longitude", undefined);
            return undefined;
        }
    }

    if (typeof lat !== "number") {
        if (isNaN(lat = parseFloat(lat))) {
            callback(lat + " is not a proper latitude", undefined);
            return undefined;
        }
    }

    const url = "https://api.darksky.net/forecast/" + process.env.DSAPIKEY + "/" + lat + "," + lng + "?units=si&lang=bs";

    request(url, { json: true }, (error, { body }) => {
            if (error) {
                callback("There is a problem connecting to the forecast service");
            } else if(body.error) {
                callback(body.error);
            } else {
                callback(
                    undefined,
                    body.daily.data[0].summary +
                    " it is currently " + body.currently.temperature + " degrees out. There is " +
                    body.currently.precipProbability + " chance of rain."
                );
            }
        });
};

module.exports = forecast;
