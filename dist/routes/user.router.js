"use strict";
const login_1 = require("./../data-store/containers/login");
const base_route_1 = require("./base.route");
const express_1 = require("express");
const user_1 = require("./../data-store/containers/user");
class UserRouter extends base_route_1.BaseRoute {
    constructor() {
        super();
        this.post = (req, res, next) => {
            this.respond(req, res, (data, ok, error) => {
                const user = new user_1.User(data);
                user.save((er) => {
                    if (er) {
                        error('Something went wrong', er, 500);
                    }
                    else {
                        ok(data);
                    }
                });
            });
        };
        this.getAll = (req, res, next) => {
            this.respond(req, res, (data, ok, error) => {
                user_1.User.find({}).exec((err, d) => {
                    if (err) {
                        error('Unable to retrive users', {}, 500);
                    }
                    else {
                        ok(d);
                    }
                });
            });
        };
        this.getAllLogins = (req, res, next) => {
            return this.respond(req, res, (data, ok, error) => {
                user_1.User.findById(req.params.id)
                    .exec((er, d) => {
                    if (er || !d) {
                        error('cannot find a user with given id', er);
                    }
                    else {
                        let user = d._doc;
                        console.log(user);
                        login_1.Login.find({}, (err, ilogins) => {
                            if (err || !ilogins) {
                                return error('cannot find logins for given user', err);
                            }
                            else {
                                return ok(ilogins);
                            }
                        });
                    }
                });
            });
        };
        this.addLogin = (req, res, next) => {
            this.respond(req, res, (data, ok, error) => {
                let userId = req.params.id;
                if (!userId) {
                    error('user id not specified', {});
                }
                else {
                    user_1.User.findById(userId)
                        .exec((er, user) => {
                        if (er || !user) {
                            error('user not found', er);
                        }
                        else {
                            let time = new Date();
                            let newLogin = new login_1.Login({ time: time, user: userId });
                            login_1.Login.create(newLogin)
                                .then(l => {
                                if (!l) {
                                    error('Unable to insert new login', {});
                                }
                                else {
                                    ok(l);
                                }
                            });
                        }
                    });
                }
            });
        };
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router
            .get('/', this.getAll)
            .post('/', this.post)
            .get('/:id/logins/', this.getAllLogins)
            .post('/:id/logins/', this.addLogin);
    }
}
exports.UserRouter = UserRouter;
const userRouter = new UserRouter();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRouter.router;
