const mongoCollections = require("../config/mongoCollections");
const esClient = require("../config/connection.js");
const structures = mongoCollections.structures;

const users = mongoCollections.users;
const uuid = require("uuid/v4");

let exportedMethods = {
  getAllStructures() {
    return structures().then(structuresCollection => {
      return structuresCollection
        .find({})
        .project({
          _id: 1,
          name: 1,
          slug: 1,
          description: 1,
          pagesize: 1,
          fields: 1
        })
        .toArray();
    });
  },

  getAllStructuresFromCollection() {
    return structures().then(structuresCollection => {
      return structuresCollection.find({}).toArray();
    });
  },

  getStructureBySlug(slug) {
    if (typeof slug !== "string") return Promise.reject("No Slug provided");

    return structures().then(structuresCollection => {
      return structuresCollection.findOne({ slug: slug }).then(structure => {
        if (!structure) throw "Structure not found";
        return structure;
      });
    });
  },

  getStructureByID(id) {
    if (!id) return Promise.reject("No ID provided");
    return structures().then(structureCollection => {
      return structureCollection.findOne({ _id: id }).then(structure => {
        if (!structure) throw "Structure not found";
        return structure;
      });
    });
  },

  getAllEntriesByStructureSlugName(slug) {
    return structures().then(structuresCollection => {
      return structuresCollection.findOne({ slug: slug }).then(entry => {
        if (!entry) throw "Entry not found";
        let result = entry.entries;
        return result;
      });
    });
  },

  addStructure(name, slug, description, pagesize, fields) {
    return structures().then(structuresCollection => {
      return structuresCollection
        .findOne({ slug: slug })
        .then(existingInformation => {
          if (existingInformation)
            throw new Error("Structure with slug already present");
          let newStructure = {
            _id: uuid(),
            name: name,
            slug: slug,
            description: description,
            pagesize: pagesize,
            fields: fields.length > 0 ? fields : [],
            entries: []
          };
          return structuresCollection
            .insertOne(newStructure)
            .then(newInsertInformation => {
              return newInsertInformation.insertedId;
            })
            .then(newId => {
              return this.getStructureByID(newId);
            });
        });
    });
  },

  editStructure(name, slug, description, pagesize, fields) {
    return this.getStructureBySlug(slug).then(currentStructure => {
      let updatedStructure = {
        name: name,
        slug: currentStructure.slug,
        description: description,
        pagesize: pagesize,
        fields: fields.length > 0 ? fields : [],
        entries: []
      };
      return structures().then(structuresCollection => {
        return structuresCollection
          .updateOne({ slug: slug }, updatedStructure)
          .then(() => {
            return this.getStructureBySlug(slug);
          });
      });
    });
  },

  deleteStructure(slug) {
    return structures().then(structuresCollection => {
      return structuresCollection
        .removeOne({ slug: slug })
        .then(deletionInfo => {
          return deletionInfo;
        });
    });
  },

  addStructureEntries(
    structure_slug,
    title,
    slug,
    blurb,
    author,
    created_date,
    fields
  ) {
    return structures().then(structuresCollection => {
      return structuresCollection
        .findOne({ "entries.slug": slug })
        .then(existingInformation => {
          if (existingInformation)
            throw new Error("Entry with slug already present");
          let newEntryObject = {
            _id: uuid(),
            title: title,
            slug: slug,
            blurb: blurb,
            author: author,
            created_date: created_date,
            fields: fields,
            comments: []
          };
          return structuresCollection
            .updateOne(
              { slug: structure_slug },
              { $push: { entries: newEntryObject } }
            )
            .then(function(result) {
              if (result.result.ok === 1) return result.result;
              else throw new Error("Error Adding New Entry");
            });
        });
    });
  },

  editStructureEntries(
    structure_slug,
    title,
    slug,
    blurb,
    author,
    created_date,
    comments,
    fields
  ) {
    return structures().then(structuresCollection => {
      entryID = uuid();
      let newEntryObject = {
        _id: entryID,
        title: title,
        slug: slug,
        blurb: blurb,
        author: author,
        created_date: new Date(),
        fields: fields,
        comments: []
      };
      return structuresCollection
        .updateOne(
          { slug: structure_slug },
          { $push: { entries: newEntryObject } }
        )
        .then(function() {});
    });
  },

  getEntryByEntrySlug(slug) {
    slug = String(slug);

    return structures().then(structuresCollection => {
      return structuresCollection
        .findOne({ "entries.slug": slug }, { entries: 1 })
        .then(entry => {
          let result = entry.entries.filter(function(obj) {
            return obj.slug == slug;
          })[0];

          return result;
        });
<<<<<<< HEAD
    },

    addStructureEntries(structure_slug, title, slug, blurb, author, created_date, fields) {
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({'entries.slug' : slug}).then((existingInformation) => {
                if(existingInformation) throw new Error('Entry with slug already present');
                let newEntryObject = {
                    _id: uuid(),
                    title: title,
                    slug: slug,
                    blurb: blurb,
                    author: author,
                    created_date: created_date,
                    fields: fields,
                    comments:[]
                };
                return structuresCollection.updateOne({ slug: structure_slug }, { $push: { "entries": newEntryObject } }).then(function (result) {
                    if(result.result.ok === 1) return result.result;
                    else throw new Error("Error Adding New Entry");
                });        
            });
        });
    },

    editStructureEntries(structure_slug, title, slug, blurb, author, created_date, comments, fields) {
        return structures().then((structuresCollection) => {
            entryID = uuid()
            let newEntryObject = {
                _id: entryID,
                title: title,
                slug:slug,
                blurb:blurb,
                author:author,
                created_date:new Date(),
                fields:fields,
                comments:[]
            };
            return structuresCollection.updateOne({ slug: structure_slug }, { $push: { "entries": newEntryObject } }).then(function () {
            });
        });
    },

    getEntryByEntrySlug(slug) {
        slug = String(slug);
        
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne(
                {'entries.slug':slug},
                {  entries:1}
                ).then((entry) => {
                let result = entry.entries.filter(function (obj) {
                    return obj.slug == slug;
                })[0];
                
               return result;
            });
        });
    },


    // getEntryByEntryID(id) {
    //     id = String(id);
    //     return structures().then((structuresCollection) => {
    //         return structuresCollection.findOne(
    //             {'entries._id':id},
    //             {  entries:1}
    //             ).then((entry) => {
    //             let result = entry.entries.filter(function (obj) {
    //                 return obj._id == id;
    //             })[0];


    //            return result;
    //         });
    //     });
    // },


    getEntryByEntryID(id) {
        id = String(id);
        return structures().then((structuresCollection) => {
            return structuresCollection.findOne({'entries._id':id}).then((data) => {
                let result = data.entries.filter(function (obj) {
                    return obj._id == id;
                })[0];
                result.slug=data.slug;
               return result;
            });
=======
    });
  },

  getEntryByEntryID(id) {
    id = String(id);
    return structures().then(structuresCollection => {
      return structuresCollection
        .findOne({ "entries._id": id }, { entries: 1 })
        .then(entry => {
          let result = entry.entries.filter(function(obj) {
            return obj._id == id;
          })[0];
          return result;
>>>>>>> 8eae21a3db4bdeced204c9a842fc35814a6f980a
        });
    });
  },

  removeEntry(slug) {
    return structures().then(structuresCollection => {
      return structuresCollection
        .update({}, { $pull: { entries: { slug: slug } } }, { multi: true })
        .then(updationInfo => {
          if (updationInfo.result.ok === 1) return updationInfo;
          else {
            throw new Error("Error in Deletion");
          }
        });
    });
  },

  search(search) {
    return new Promise((data, err) => {
      esClient
        .search({
          q: "*" + search + "*"
        })
        .then(
          function(body) {
            let hits = body.hits.hits;
            console.log(JSON.stringify(hits));
            data(hits);
          },
          function(error) {
            //console.trace(error.message);
            err(error.message);
          }
        );
    });
  }
};

module.exports = exportedMethods;

// exportedMethods.getAllStructures().then(function (data) {
//     console.log(data);
// });

// exportedMethods.getEntryByEntrySlug("total 2 Entry 1").then(function(data){
//   console.log(data);
// })

// exportedMethods.getStructureBySlug("st1").then(function (data) {
//     console.log(data);
// });

// let fields=
// [{ label: 'Name', type: 'small-text-input' },
// { label: 'Number', type: 'number-input' },
// { label: 'CheckBox', type: 'checkbox'}];

// exportedMethods.addStructure("Struct1", "st1", "Structure 1", 10, fields).then(function(data){
//     console.log(data);
// });

// let fields=
// [{ label: 'Text Area', type: 'text-area', number: 1 },
// { label: 'Link', type: 'link', number: 2 }];

// exportedMethods.addStructure("Struct2", "st2", "Structure 2", 5,fields).then(function(data){
//     console.log(data);
// });

// let fields=
// [{ label: 'Name', type: 'small-text-input', number: 1 },
// { label: 'Number', type: 'number-input', number: 2 },
// { label: 'CheckBox', type: 'checkbox', number: 3 }];

// exportedMethods.addStructure("Struct3", "st3", "Structure 3", 6,fields).then(function(data){
//     console.log(data);
// });

// let fields=
// [{ label: 'Text Area', type: 'text-area', number: 1 },
// { label: 'Link', type: 'link', number: 2 }];

// exportedMethods.addStructure("Struct4", "st4", "Structure 4 ", 6, fields).then(function(data){
//     console.log(data);
// });

// exportedMethods.deleteStructure("st2");

// let fields=
// [{ label: 'Text Area', type: 'text-area', value: "Hii," },
// { label: 'Link', type: 'link', value: "www.link.com" }];

// exportedMethods.addStructureEntries("st1","Struct1: Entry1","st1entry1","Structure 1 In Entry 1","Test1").then(function(data){
//     console.log(data);
// });

// let Entryfields=
// [{ label: 'Name', type: 'small-text-input', number: 1 },
// { label: 'Number', type: 'number-input', number: 2 },
// { label: 'CheckBox', type: 'checkbox', number: 3 }];
// //console.log(Entryfields);
// exportedMethods.addStructureEntries("st1","Struct1: Entry2","st1entry2", "Structure 1 In Entry 2","Test2",Entryfields).then(function(data){
//     //console.log(data);
// });

// let fields=
// [{ label: 'Name', type: 'small-text-input', number: 1 },
// { label: 'Number', type: 'number-input', number: 2 },
// { label: 'CheckBox', type: 'checkbox', number: 3 }];

// exportedMethods.addStructureEntries("st1","Struct1: Entry3","st1entry3", "Structure 1 In Entry 3","Test3",fields).then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st2","Struct2: Entry1","st1entry1", "Structure 2 In Entry 1","Test1").then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st2","Struct2: Entry2","st2entry2", "Structure 2 In Entry 2","Test2").then(function(data){
//     //console.log(data);
// });
// exportedMethods.addStructureEntries("st2","Struct2: Entry3","st2entry3", "Structure 2 In Entry 3","Test3").then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st3","Struct3: Entry1","st3entry1", "Structure 3 In Entry 1","Test1").then(function(data){
//     //console.log(data);
// });

// exportedMethods.addStructureEntries("st4","Struct4: Entry1","st4entry1", "Structure 4 In Entry 1","Test1").then(function(data){
//     //console.log(data);
// });

// exportedMethods.removeEntry("total Entry 4").then(function(data){

//    // console.log("removed");
// });

// exportedMethods.editStructure("st4",data)

// exportedMethods.getEntryByEntrySlug("total 1 Entry 1").then(function(data){
//     console.log(data);
// })

<<<<<<< HEAD

// exportedMethods.getEntryByEntryID("59200f6a-e850-4a4e-8a05-a49da7d4dfa1").then(function(data){
=======
// exportedMethods.getEntryByEntryID("c594719e-d4df-4b9e-9ab3-af5039c42647").then(function(data){
>>>>>>> 8eae21a3db4bdeced204c9a842fc35814a6f980a
//     console.log(data);
// })
