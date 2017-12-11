const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let configRoutes = require("./routes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const data = require("./data");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/images', express.static(__dirname + '/uploads/images'));

passport.use(
  new LocalStrategy(function(username, password, done) {
    let user = data.users.getUserByusername(username);
    if (user === undefined) {
      return done("User is not found");
    } else {
      bcrypt.compare(password, user.hashedPassword, function(err, res) {
        if (err) {
          return done(err);
        }
        if (res === true) {
          return done(null, user);
        } else if (res === false) {
          return done(null, false);
        }
      });
    }
  })
);

passport.serializeUser((user, obj) => {
  obj(null, user._id);
});

passport.deserializeUser((id, obj) => {
  let userDetails = data.users.getUserById(id);
  if (userDetails === undefined) {
    return obj("There is error");
  } else {
    obj(null, userDetails);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

configRoutes(app);

const server = app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
