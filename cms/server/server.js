const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const configRoutes = require("./routes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization "
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(__dirname + "/uploads/images"));
app.use("/resizedimage", express.static(__dirname + "/uploads/resized_images"));
app.use("/files", express.static(__dirname + "/uploads/files"));

app.use(
  session({ secret: "projectcms", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

configRoutes(app, passport);

const server = app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
