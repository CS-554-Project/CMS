const es_client = require('../js/elastic-connection');

module.exports = {
  
  addEntryToIndex(structureslug, title, slug, blurb) {
    return es_client.index({ 
      index: 'entries',
      type: 'entry',
      body: {
        _structureslug: structureslug,
        _title: title,
        _blurb: blurb,
        _slug: slug,
      }
    });
  },

  searchIndex(_term) {
    return es_client.search({
      index: 'entries',
      type: 'entry',
      body: {
        query: { 
          match: { '_title': _term },
          match: { '_blurb': _term }
        }
      }
    });
  },

  countIndex() {
    return es_client.count({
      index: 'entries'
    }); 
  }
  
}