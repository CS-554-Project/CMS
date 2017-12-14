const bcrypt = require("bcrypt-nodejs");
const data = require("../data");
const usersData = data.users;

module.exports = (passport, Strategy) => {
  passport.use(
    "local",
    new Strategy((username, password, done) => {
      usersData
        .getUserByUsername(username)
        .then(
          user => {
            bcrypt.compare(password, user.hashedPassword, (err, res) => {
              if (!res) {
                return done(null, false);
              }
              return done(null, user);
            });
          },
          err => {
            console.log(err);
            return done(null, false);
          }
        )
        .catch(err => {
          console.log(err);
          return done(null, false);
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    usersData
      .getUserById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  });
};
