"use strict";
let Db = require('mongodb').Db;
let Server = require('mongodb').Server;
class MongoDatabase {
    constructor(databaseName, hostName, port) {
        this._db = new Db(new Server(hostName, port, {}));
    }
    get databaseName() {
        return this._db.databaseName;
    }
}
exports.MongoDatabase = MongoDatabase;
