const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let configRoutes = require("./routes");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configRoutes(app);

const server = app.listen(3001, () => {
   console.log("Server is running on http://localhost:3001");
});