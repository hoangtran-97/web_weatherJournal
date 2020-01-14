const projectData = {};
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

app.use(express.static('src'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/.netlify/functions/server', router);

const port = 3000
const listening = () => {
    console.log(`running on localhost: ${port}`);
}
const server = app.listen(port, listening)

const entries = []

router.get("/all", sendData);
router.post("/weather", postWeather)
router.post("/entry", postEntry)

function sendData(request, response) {
    response.json(projectData);
};

function postWeather(request, response) {
    projectData["currentWeather"] = request.body
}

function postEntry(request, response) {
    entries.unshift(request.body)
    projectData["entries"] = entries
    console.log(projectData)
}
module.exports.handler = serverless(app)
