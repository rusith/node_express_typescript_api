"use strict";
const mongo_client_1 = require("./database/mongo-client");
class DataStoreManager {
    // private static _users: ICollection<User> = new Collection<User>();
    // public static get users(): ICollection<User> {
    //     return new Collection<User>();
    // }
    static getClient() {
        if (!this._client) {
            this._client = new mongo_client_1.MongoClient();
        }
        return this._client;
    }
    static getCollection(collectionName) {
    }
    static getDatabase() {
        return new Promise(resolve => {
            if (this._database) {
                resolve(this._database);
            }
            else {
                let client = this.getClient();
                if (client) {
                    client.connect('mongodb://localhost:27017/tests', {}, (error, db) => {
                        if (error || !db) {
                            // TODO handle the error
                            resolve(null);
                        }
                        else {
                            resolve(db);
                        }
                    });
                }
                else {
                    resolve(null);
                }
            }
        });
    }
}
exports.DataStoreManager = DataStoreManager;
