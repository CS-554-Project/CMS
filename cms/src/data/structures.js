const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;
const structure_entries = mongoCollections.structure_entries;
const users=mongoCollections.users;
const uuid = require('uuid/v4');

let exportedMethods = {
    getAllStructures() {
        return structures().then((structuresCollection) => {
            return structuresCollection.find({}).toArray();
        });
    },
    
    getStructureBySlug(slug) {
        if(!slug) return Promise.reject("No Slug provided");

        return structures().then((structureCollection) => {
            return structureCollection.findOne({slug: slug}).then((structure) => {
                if(!structure) throw("Structure not found");
                return structure;
            });
        });  
    },

    getEntriesBySlug(slug){
        if(!slug) return Promise.reject("No Slug provided");
        
                return structure_entries().then((structureCollection) => {
                    return structureCollection.findOne({slug: slug}).then((structure) => {
                        if(!structure) throw("Structure not found");
                        return structure;
                    });
                });  
    },

    getStructureById(id) {
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ _id: id }).then((structure) => {
                if (!structure) throw "User not found";
                return structure;
            });
        });
    },

    addStructure(name, slug, description, pagesize) {
        return structures().then((structuresCollection) => {
            let newStructure = {
                _id: uuid(),
                name: name,
                slug: slug,
                description: description,
                pagesize:pagesize
            };

            return structuresCollection.insertOne(newStructure).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getStructureById(newId);
            });
        });
    },

    addEntries(title, type, url, blurb,author,created_date,fields,comments) {
        return structure_entries().then((structuresCollection) => {
            let newEntry = {
                _id: uuid(),
                title: title,
                type: type,
                url: url,
                blurb:blurb,
                author:author,
                created_date:null,
                fields:null,
                comments:null
            };

            return structuresCollection.insertOne(newEntry).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getEntryById(newId);
            });
        });
    },

    getUserById(id) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },


    getUserById(id) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },



    addUser(firstname, lastname, role) {
        return users().then((usersCollection) => {
            let newUser = {
                _id: uuid(),
                firstname: firstname,
                lastname: lastname,
                role: role
            };

            return usersCollection.insertOne(newUser).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getUserById(newId);
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


exportedMethods.getAllStructures().then(function (data) {
    console.log(data);
});


// exportedMethods.getStructureBySlug("slug").then(function (data) {
//     console.log(data);
// });

// // exportedMethods.addUser("Ruchika","Sutariya","Admin").then(function(data){
// //     console.log(data);
// // });

// // exportedMethods.addStructure("name","slug","description","pagesize").then(function(data){
// //     console.log(data);
// // });
