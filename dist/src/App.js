"use strict";
const user_router_1 = require("./routes/user.router");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'The API Works haha'
            });
        });
        this.express.use('/', router);
        this.express.use('/users/', user_router_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
