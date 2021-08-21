const Datastore = require("nedb");
// nedb is used by app.js, so its path should be
// "./models/database.db" so database is in the folder "models"
const nedb = new Datastore("../models/database.db");

module.exports = nedb;
