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

  editStructureEntries(structure_slug,entry_slug,title,blurb,author,fields) {
  
     
      let updatedEntry = {
        title: title,
        slug:entry_slug,
        blurb: blurb,
        author: author,
        fields: fields,
      };
      return structures().then(structuresCollection => {
        return structuresCollection
          .update(
            { "entries.slug": entry_slug },
            {$set :{"entries":updatedEntry} })
          .then(() => {
            return this.getStructureBySlug(structure_slug);
          });
      });
      
  
},

  getEntryByEntrySlug(slug) {
    slug = String(slug);
    return structures().then(structuresCollection => {
      return structuresCollection
        .findOne({ "entries.slug": slug })
        .then(data => {
          let result = data.entries.filter(function(obj) {
            return obj.slug == slug;
          })[0];
          result.structslug=data.slug;
          
          return result;
        });
    });
  },

  getEntryByEntryID(id) {
    id = String(id);
   // let entryslug =getEntrySlugNameByID(id);
    return structures().then(structuresCollection => {
      return structuresCollection
        .findOne({ "entries._id": id })
        .then(data => {
          let result = data.entries.filter(function(obj) {
            return obj._id == id;
          })[0];
          result.structslug=data.slug;
         // result.entryslug=entryslug;
          return result;
        });
    })
  
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

  addCommentsByEntrySlug(slug,comments){
    return structures().then(structuresCollection => {
     
          let newEntryObject = {
            _id: uuid(),
            comments: comments,
          };
          return structuresCollection
            .updateOne(
              { "entries.slug": slug },
              { $push: { "entries.comments": newEntryObject } }
            )
            .then(function(result) {
              if (result.result.ok === 1) return result.result;
              else throw new Error("Error Adding New Entry");
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
           // console.log(JSON.stringify(hits));
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



// exportedMethods.editStructureEntries("total 2","total 2 Entry 1","title","blurb","author","fields").then(function(data){
//    console.log(data);
// })


// exportedMethods.addCommentsByEntrySlug("total 2 Entry 1","comments").then(function(data){
//    console.log(data);
// })



