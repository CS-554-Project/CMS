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

  addUser(firstname, lastname, username, password, role) {
    return users().then(usersCollection => {
      let newUser = {
        _id: uuid(),
        firstname: firstname,
        lastname: lastname,
        username: username,
        hashedPassword: bcrypt.hashSync(password, saltRounds),
        role: role
      };

      return usersCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
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
      return usersCollection.find({}).toArray();
    });
  }
};

module.exports = exportedMethods;

// exportedMethods.addUser("Ruchika","Sutariya","admin","admin","admin").then(function(data){
//     console.log(data);
// });

// exportedMethods.addUser("Harsh","Kevadiya","user1","user1","user").then(function(data){
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
