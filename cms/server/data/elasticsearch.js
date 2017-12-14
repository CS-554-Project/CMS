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

  searchIndex(_term) {
    // es_client.search(
    //   {
    //     index: "entries",
    //     type: "entry",
    //     body: {
    //       query: {
    //         match: { _title: _term },
    //         match: { _blurb: _term }
    //       }
    //     }
    //   },
    //   function(error, response, status) {
    //     if (error) {
    //       console.log("search error: " + error);
    //     } else {
    //       console.log("--- Response ---");
    //       console.log(response);
    //       console.log("--- Hits ---");
    //       response.hits.hits.forEach(function(hit) {
    //         console.log(hit);
    //       });
    //     }
    //   }
    // );
    return "Harsh Kevadia";
  },


  search(search){
    return new Promise((data, err) => {
      data("Harsh");
    });
  },

  countIndex() {
    return es_client.count({
      index: "entries"
    });
  }
};
module.exports = exportedMethods;
