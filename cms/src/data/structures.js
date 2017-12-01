const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;

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

    getAllEntriesByStructureSlugName(slug){
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ slug: slug }).then((entry) => {
                if (!entry) throw "Entry not found";
                let result = entry.entries;
                result.forEach(function (e) {
                    e.name = entry.name;
                    e.slug = entry.slug;
                    return e;
                });
                return result;
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

    addStructure(name, slug, description, pagesize,fields) {
        return structures().then((structuresCollection) => {
            let newStructure = {
                _id: uuid(),
                name: name,
                slug: slug,
                description: description,
                pagesize:pagesize,
                entries:null,
                fields:null
            };

            return structuresCollection.insertOne(newStructure).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getStructureById(newId);
            });
        });
    },

    addEntries(structure_id,title, type, url, blurb,author,created_date,fields,comments) {
        return structures().then((structuresCollection) => {
            entryID = uuid()
            let newEntryObject = {
                _id: entryID,
                title: title,
                slug:slug,
                type: type,
                url:url,
                blurb:blurb,
                author:author,
                created_date:created_date,
                fields:fields,
                comments:comments
            };

            return structuresCollection.updateOne({ _id: structure_id }, { $push: { "entries": newEntryObject } }).then(function () {
                return exportedMethods.getEntryByEntryID(entryID).then((entry) => {
                    return entry;
                }, (error) => {
                    return Promise.reject("Can not add this Entry");
                });
            });
        });
    },

    getEntryByEntryID(id) {
        id = String(id);
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ $where: "this.entries._id = '" + id + "'" }).then((structure) => {
                if (!structure) throw "Structure_Entry not found";
                let result = structure.entries.filter(function (obj) {
                    return obj._id == id;
                })[0];
                if (!result) throw "Entry not found";
                result.name = structure.name;
                result.slug = structure.slug;
                return result;
            });
        });
    },

    getEntryByEntrySlugName(slug) {
        slug = String(slug);
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ $where: "this.entries.slug = '" + slug + "'" }).then((structure) => {
                if (!structure) throw "Structure_Entry not found";
                let result = structure.entries.filter(function (obj) {
                    return obj._id == id;
                })[0];
                return result;
            });
        });
    },
    

    getEntryById(id) {
        return structure_entries().then((structuresCollection) => {
            return structuresCollection.findOne({ _id: id }).then((entry) => {
                if (!entry) throw "Entry not found";
                return entry;
            });
        });
    },

 
}

module.exports = exportedMethods;


// exportedMethods.getAllStructures().then(function (data) {
//     console.log(data);
// });


// exportedMethods.getStructureBySlug("slug").then(function (data) {
//     console.log(data);
// });

// // exportedMethods.addUser("Ruchika","Sutariya","Admin").then(function(data){
// //     console.log(data);
// // });

// exportedMethods.addEntries("title", "type", "url", "blurb","author","created_date","fields","comments").then(function(data){
//     console.log(data);
// });

exportedMethods.getEntryById("f2d039b1-13f0-4af0-85d9-943415b1bae2").then(function(data){
    console.log(data);
});

// exportedMethods.getUserById("8d5f76e3-95f7-43df-82a8-4eea17b04170").then(function(data){
//     console.log(data);
// });

// exportedMethods.getStructureById("aa9e0b1b-d483-46a8-a0d2-851819ab9444").then(function(data){
//     console.log(data);
// });

// // exportedMethods.addStructure("name","slug","description","pagesize").then(function(data){
// //     console.log(data);
// // });
