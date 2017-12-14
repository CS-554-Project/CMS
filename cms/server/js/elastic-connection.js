const elasticsearch = require('elasticsearch');

const es_client = new elasticsearch.Client( {  
    host: 'localhost:9200/',
    log: 'info'
});

// es_client.indices.delete({ index: 'entries' }, (err, res, status) => {  
//   es_client.indices.create({ index: 'entries' }, (err, res, status) => {
//     if(err) {
//       console.log(err);
//     } else {
//       //console.log('index created', res);
//     }
//   });
// });

module.exports = es_client; 