const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;

const users=mongoCollections.users;
const uuid = require('uuid/v4');

let exportedMethods = {
    getAllStructures() {
        return structures().then((structuresCollection) => {
            return structuresCollection.find({}).project({ _id: 1, name: 1, slug:1, description:1, pagesize:1, fields:1 }).toArray()
        });
    },
    
    getStructureBySlug(slug) {
        if(typeof slug !== "string") return Promise.reject("No Slug provided");

        return structures().then((structureCollection) => {
            return structureCollection.findOne({slug: slug}).then((structure) => {
                if(!structure) throw("Structure not found");
                return structure;
            });
        });  
    },

    getStructureByID(id) {
        if(!id) return Promise.reject("No ID provided");

        return structures().then((structureCollection) => {
            return structureCollection.findOne({_id: id}).then((structure) => {
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

    addStructure(name, slug, description, pagesize, fields) {
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({slug:slug}).then((existingInformation)=>{
                if(existingInformation)
                    throw("Structure with slug is already inserted");
                else
                {
                    let newStructure = {
                        _id: uuid(),
                        name: name,
                        slug: slug,
                        description: description,
                        pagesize:pagesize,
                        entries:[],
                        fields:[]
                    };
                   
                    return structuresCollection.insertOne(newStructure).then((newInsertInformation) => {
                        
                        //return newInsertInformation.insertedId;
                        this.addStructureFields(newInsertInformation.insertedId, fields).then((addFieldsReponse) => {
                            return Promise.resolve("Structure Added");
                        });

                    }).then((newId) => {
                        return this.getStructureById(newId);
                    });
                }
            });
            
        });
    
    },


    addStructureFields(structureId, fields) {
        
        return structures().then((structuresCollection) => {
            fieldID = uuid()
           // console.log(fieldID);
           // console.log(structure_id);
            let newfieldObject = {
                _id: fieldID,
                label: label,
                type: type,
                number:number
            };
            //console.log(newfieldObject);
            return structuresCollection.updateOne({ _id: structure_id }, { $push: { "fields": newfieldObject } }).then(function () {
            });;
        });
    },

    // getFieldByFieldID(id) {
    //     id = String(id);
    //   //  console.log(id);
    //     return structures().then((structuresCollection) => {
    //         return structuresCollection.findOne({ $where: "this.fields._id = '" + id + "'" }).then((structure) => {
    //             if (!structure) throw "Structure_Field not found";
    //             let result = structure.fields.filter(function (obj) {
    //                 return obj._id == id;
    //             })[0];
    //             if(!result) throw "Field not Found";
    //             result.name = structure.name;
    //             result.slug = structure.slug;
    //             return result;
    //         });
    //     });
    // },


    // addFields(label,type, number) {
    //     return structures().then((structuresCollection) => {
    //         let newfieldObject = {
    //             _id: uuid(),
    //             label: label,
    //             type: type,
    //             number:number
    //         };

    //         return structuresCollection.insertOne(newfieldObject).then((newInsertInformation) => {
    //             return newInsertInformation.insertedId;
    //         }).then((newId) => {
    //             return this.getFieldById(newId);
    //         });
    //     });
    // },

    getFieldById(id) {
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ _id: id }).then((structure) => {
                if (!structure) throw "Field not found";
                return structure;
            });
        });
    },

    
    addStructureEntries(structure_slug,title,slug, type, blurb,author,created_date,comments) {
        return structures().then((structuresCollection) => {
            entryID = uuid()
            let newEntryObject = {
                _id: entryID,
                title: title,
                slug:slug,
                type: type,
                blurb:blurb,
                author:author,
                created_date:new Date(),
                comments:[]
            };

            return structuresCollection.updateOne({ slug: structure_slug }, { $push: { "entries": newEntryObject } }).then(function () {
            });
        });
    },

    deleteStructure(slug) {
        return structures().then((structuresCollection) => {
            return structuresCollection.removeOne({ slug: slug }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete structure with id of ${slug}`)
                }
            });
        });
    },

    // getEntryByEntryID(id) {
    //     id = String(id);
    //     return structures().then((structuresCollection) => {
    //         return structuresCollection.findOne({ $where: "this.entries._id = '" + id + "'" }).then((structure) => {
    //             if (!structure) throw "Structure_Entry not found";
    //             let result = structure.entries.filter(function (obj) {
    //                 return obj._id == id;
    //             })[0];
    //             return result;
    //         });
    //     });
    // },

    getEntryByEntrySlugName(slug) {
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({ $where: "this.entries.slug = '" + slug + "'" }).then((structure) => {
                if (!structure) throw "Structure_Entry not found";
                
                let result = structure.entries.filter(function (obj) {
                    return obj.slug == slug;
                })[0];
               // console.log(result);
                return result;
            });
        });
    },
    

    

 
}

module.exports = exportedMethods;


// exportedMethods.getAllStructures().then(function (data) {
//     console.log(data);
// });


// exportedMethods.getStructureBySlug("slug4").then(function (data) {
//     console.log(data);
// });

// exportedMethods.getStructureByID("14cf1bfc-510d-4046-9e34-ea23a973088e").then(function (data) {
//     console.log(data);
// });

// // exportedMethods.addUser("Ruchika","Sutariya","Admin").then(function(data){
// //     console.log(data);
// // });

// exportedMethods.addStructureFields("14cf1bfc-510d-4046-9e34-ea23a973088e","label1","type1","number1").then(function(data){
//     console.log(data);
// });

    // exportedMethods.addFields("label","type","number").then(function(data){
    //     console.log(data);
    // });

// exportedMethods.getFieldByFieldID("415b55a9-402c-4e8f-a621-ef27990ef5d6").then(function (data) {
//     console.log(data);
// });

// exportedMethods.getFieldById("dde50956-51c6-4e57-919b-3d684890be34").then(function (data) {
//     console.log(data);
// });

// exportedMethods.addEntries("14cf1bfc-510d-4046-9e34-ea23a973088e","title","slug5", "type", "url", "blurb","author","created_date").then(function(data){
//     console.log(data);
// });



// exportedMethods.getEntryById("f2d039b1-13f0-4af0-85d9-943415b1bae2").then(function(data){
//     console.log(data);
// });

// exportedMethods.getUserById("8d5f76e3-95f7-43df-82a8-4eea17b04170").then(function(data){
//     console.log(data);
// });

// exportedMethods.getStructureById("14cf1bfc-510d-4046-9e34-ea23a973088e").then(function(data){
//     console.log(data);
// });

// exportedMethods.getEntryByEntrySlugName("slug5").then(function(data){
//     console.log(data);
// });

// exportedMethods.getAllEntriesByStructureSlugName("slug4").then(function(data){
//     console.log(data);
// });

exportedMethods.addStructure("Struct1", "st1", "Structure 1", 10).then(function(data){
    console.log(data);
});

exportedMethods.addStructure("Struct2", "st2", "Structure 2", 5).then(function(data){
    console.log(data);
});

exportedMethods.addStructure("Struct3", "st3", "Structure 3", 6).then(function(data){
    console.log(data);
});


// // 

// exportedMethods.addStructureEntries("14cf1bfc-510d-4046-9e34-ea23a973088e","title1","slug5", "type", "blurb","author","comments").then(function(data){
//     //console.log(data);
// });


// exportedMethods.deleteStructure("slug1").then(function(data){
//     console.log("deleted");
// });


