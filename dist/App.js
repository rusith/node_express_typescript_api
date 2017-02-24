"use strict";
const user_router_1 = require("./routes/user.router");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const user_1 = require("./data-store/containers/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// Creates and configures an ExpressJS web server.
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        mongoose.connect('mongodb://127.0.0.1:27017/myapp');
    }
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    /**
    * Configure Token based security
    */
    configureSecurityRoutes(router) {
        const secret = '7ad58489-4781-4049-b136-d6b1744b358e';
        router.post('/authenticate', (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            if (!username || !password) {
                res.json({});
            }
            else {
                user_1.User.findOne({ username: username }, (err, user) => {
                    if (err || !user || user.password !== password) {
                        return res.json({});
                    }
                    let token = jwt.sign(user, secret, {
                        expiresIn: 1000
                    });
                    res.json({
                        success: true,
                        lifeTime: 1000,
                        token: token
                    });
                });
            }
        });
        // this.express.use((req: Request, res: Response, next: NextFunction) => {
        //   let token = req.body.token || req.query.token || req.headers['x-access-token'];
        //   debug('token :' + token);
        //   if (!token) {
        //     if (req.path === '/authenticate') {
        //       next();
        //       return;
        //     }
        //     return res.json(403, {
        //     success: false,
        //     message: 'No token provided.' });
        //   } else {
        //       jwt.verify(token, secret, function (err, decoded) {
        //       if (err) {
        //         return res.json({ success: false, message: 'Not authenticated' });
        //       }
        //       next();
        //     });
        //   }
        // });
    }
    confirureRoutes() {
        this.express.use('/users/', user_router_1.default);
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'The API Works!'
            });
        });
        this.express.use('/', router);
        this.configureSecurityRoutes(router);
        this.confirureRoutes();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
