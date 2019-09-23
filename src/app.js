const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//const dotenv = require("dotenv").config({ path: process.cwd() + "/../.env" });
const dotenv = require("dotenv").config({ path: path.join(__dirname, "../.env" )});

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

// fs.readdir(__dirname + '/../public', (err, files) => {
//     if (err) {
//         return console.log("error: ", err);
//     }
//
//     console.log(files);
// });
//
// fs.readFile(__dirname + "/../public/index.html",  (err, file) => {
//     console.log(file.toString());
// });

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "name 1"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "name 1"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "help message",
        title: "Help",
        name: "name 3"
    })
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                longitude,
                latitude
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    res.send({
        products: []
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help article not found",
        errorMessage: "Help article not found",
        name: "name 1"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Page not found",
        errorMessage: "Page not found",
        name: "name 1"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});

// app.get("/help", (req, res) => {
//     res.send([
//         {
//             name: "name1",
//             age: 30
//         },
//         {
//             name: "name2",
//             age: 22
//         }
//     ]);
// });
//
// app.get("/about", (req, res) => {
//     res.send("<h1>about</h1>");
// });


