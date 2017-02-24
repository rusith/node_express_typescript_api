import { Login } from './../data-store/containers/login';
import { BaseRoute } from './base.route';
import { Router } from 'express';
import { User, IUser } from './../data-store/containers/user';

export class UserRouter extends BaseRoute {
    router: Router;

    constructor() {
        super();
        this.router = Router();
        this.init();
    }

    private post = (req, res, next) => {
        this.respond(req, res, (data, ok, error) => {
            const user = new User(data);
            user.save((er) => {
                if (er) {
                    error('Something went wrong', er, 500);
                } else {
                    ok(data);
                }
            });
        });
    }

    private getAll = (req, res, next) => {
        this.respond(req, res, (data, ok, error) => {
            User.find({}).exec((err, d) => {
                if (err) {
                    error('Unable to retrive users', {}, 500);
                } else {
                    ok(d);
                }
            });
        });
    }

    getAllLogins = (req, res, next) => {
        return this.respond(req, res, (data, ok, error) => {
            User.findById(req.params.id)
                .exec((er, d) => {
                    if (er || !d) {
                        error('cannot find a user with given id', er);
                    } else {
                        let user = ((d as any)._doc as IUser);
                        console.log(user);
                        Login.find({}, (err, ilogins) => {
                            if (err || !ilogins) {
                                return error('cannot find logins for given user', err);
                            } else {
                                return ok(ilogins);
                            }
                        });
                    }
                });
        });
    }

    addLogin = (req, res, next) => {
        this.respond(req, res, (data, ok, error) => {
            let userId = req.params.id;
            if (!userId) {
                error('user id not specified', {});
            } else {
                User.findById(userId)
                .exec((er, user) => {
                    if (er || !user) {
                        error('user not found', er);
                    } else {
                        let time = new Date();
                        let newLogin = new Login({ time: time, user: userId });
                        Login.create(newLogin)
                            .then(l => {
                                if (!l) {
                                    error('Unable to insert new login', {});
                                } else {
                                    ok(l);
                                }
                            });
                    }
                });
            }
        });
    }

    init() {
        this.router
            .get('/', this.getAll)
            .post('/', this.post)
            .get('/:id/logins/', this.getAllLogins)
            .post('/:id/logins/', this.addLogin);
    }
}

const userRouter = new UserRouter();

export default userRouter.router;
