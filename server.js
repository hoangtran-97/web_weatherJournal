projectData = {};
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
//Test
// const data = [];

// app.post('/test', addObject);

// function addObject(req, res) {
//     data.push(req.body);
//     res.send("POST received")
//     console.log(data)
// };

app.get("/all", sendData);

function sendData(request, response) {
    response.send(projectData);
};

app.post("/weather", postWeather)

function postWeather(request, response) {
    projectData = request.body
    console.log(projectData)
}