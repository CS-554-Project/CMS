const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;

const users=mongoCollections.users;
const uuid = require('uuid/v4');

let exportedMethods = {
    

    getUserById(id) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },



    addUser(firstname, lastname,username, role, password) {
        return users().then((usersCollection) => {
            let newUser = {
                _id: uuid(),
                firstname: firstname,
                lastname: lastname,
                username:username,
                hashedPassword: bcrypt.hashSync(password, saltRounds),
                role: role
            };

            return usersCollection.insertOne(newUser).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getUserById(newId);
            });
        });
    },

    getUserByUsername(username) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ username: username }).then((user) => {
                if (!user) throw "Email not found in DB";
                return user;
            });
        });
    },

    getAllUsers() {
        return users().then((usersCollection) => {
            return usersCollection.find({}).toArray();
        });
    },

 
}

module.exports = exportedMethods;




// exportedMethods.addUser("Ruchika","Sutariya","Admin").then(function(data){
//     console.log(data);
// });




// exportedMethods.getUserById("8d5f76e3-95f7-43df-82a8-4eea17b04170").then(function(data){
//     console.log(data);
// });

