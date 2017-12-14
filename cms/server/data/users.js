const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;

const users = mongoCollections.users;
const uuid = require("uuid/v4");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let exportedMethods = {
  getUserById(id) {
    return users().then(usersCollection => {
      return usersCollection.findOne({ _id: id }).then(user => {
        if (!user) throw "User not found";
        return user;
      });
    });
  },

  addUser(firstname, lastname, username, password, biography) {
    return users().then(usersCollection => {
      let newUser = {
        _id: uuid(),
        firstname: firstname,
        lastname: lastname,
        username: username,
        hashedPassword: bcrypt.hashSync(password, saltRounds),
        biography: biography,
        favorites: [],
        isAdmin: false
      };
      return usersCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
          console.log(newInsertInformation);
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getUserById(newId);
        });
    });
  },

  getUserByUsername(username) {
    return users().then(usersCollection => {
      return usersCollection.findOne({ username: username }).then(user => {
        if (!user) throw "Username not found in DB";
        return user;
      });
    });
  },

  getAllUsers() {
    return users().then(usersCollection => {
      return usersCollection
        .find({})
        .project({ _id: 1, firstname: 1, lastname: 1, isAdmin: 1 })
        .toArray();
    });
  },

  updateUser(id) {
    return this.getUserById(id).then(user => {
      let updateUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        hashedPassword: user.hashedPassword,
        isAdmin: true
      };
      return users().then(usersCollection => {
        return usersCollection.updateOne({ _id: id }, updateUser).then(done => {
          return done;
        });
      });
    });
  }
};

module.exports = exportedMethods;

// exportedMethods.addUser('Ruchika', 'Sutariya', 'ruchika', 'ruchika', true).then(function(data){
//     console.log(data);
// });

// exportedMethods.addUser("Harsh","Kevadiya","user1","user1","Hiii","user").then(function(data){
//     console.log(data);
// });

// exportedMethods.addUser("Kishan","Gajjar","user2","user2","user").then(function(data){
//     console.log(data);
// });

// exportedMethods.getUserByUsername("user2").then(function(data){
//     console.log(data);
// });

// exportedMethods.getAllUsers().then(function(data){
//     console.log(data);
// });
