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
                console.log(body.daily.data[0]);
                callback(
                    undefined,
                    body.daily.data[0].summary +
                    "\r\nit is currently " + body.currently.temperature + " degrees out.\r\nThere is " +
                    body.currently.precipProbability + " chance of rain.\r\n" +
                    "\r\nToday: " + body.daily.data[0].summary +
                    "\r\nTemperature High: " + body.daily.data[0].temperatureHigh  +
                    "\r\nTemperature Low: " + body.daily.data[0].temperatureLow
                );
            }
        });
};

module.exports = forecast;
