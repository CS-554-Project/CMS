const mongoCollections = require("../config/mongoCollections");
const dbConnection = require("../config/mongoConnection");
const structures = mongoCollections.structures;


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
 
}

module.exports = exportedMethods;


exportedMethods.getAllStructures().then(function (data) {
    console.log(data);
})


exportedMethods.getStructureBySlug("slug").then(function (data) {
    console.log(data);
})


