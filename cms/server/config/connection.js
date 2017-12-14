/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Dec 14 2017
 *  File : connection.js
 *******************************************/
const elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

module.exports = client;
