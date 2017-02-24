"use strict";
let MC = require('mongodb').MongoClient;
class MongoClient {
    /**
     * Create new Mongoclient
     */
    constructor() {
        this._client = new MC();
    }
    connect(url, options, callback) {
        return this._client.connect(url, options, callback);
    }
}
exports.MongoClient = MongoClient;
