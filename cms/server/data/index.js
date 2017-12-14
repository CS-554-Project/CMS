const structuresData = require("./structures");
const usersData = require("./users");
const eSearch = require("./elasticsearch");

module.exports = {
  structures: structuresData,
  users: usersData,
  search: eSearch
};
