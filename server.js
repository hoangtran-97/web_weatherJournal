const projectData = {};
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.static('src'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000
const listening = () => {
    console.log(`running on localhost: ${port}`);
}
const server = app.listen(port, listening)

const entries = []

app.get("/all", sendData);
app.post("/weather", postWeather)
app.post("/entry", postEntry)

function sendData(request, response) {
    response.send(projectData);
};

function postWeather(request, response) {
    projectData["currentWeather"] = request.body
}

function postEntry(request, response) {
    entries.unshift(request.body)
    projectData["entries"] = entries
    console.log(projectData)
}