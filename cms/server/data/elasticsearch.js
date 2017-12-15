const es_client = require("../js/elastic-connection");

let exportedMethods = {

  addEntryToIndex(structureslug, title, slug, blurb) {
    return es_client.index({
      index: "entries",
      type: "entry",
      body: {
        _structureslug: structureslug,
        _title: title,
        _blurb: blurb,
        _slug: slug
      }
    });
  },

  deleteEntry(slug) {
    return es_client.deleteByQuery({
      index: "entries",
      type: "entry",
      body: {
        query: {
          match: { _slug: slug }
        }
      }
    });
  }

};

module.exports = exportedMethods;
