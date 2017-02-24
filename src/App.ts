import UserRouter from './routes/user.router';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction, Router } from 'express';
import { User} from './data-store/containers/user';
import * as jwt from 'jsonwebtoken';
import * as debug from 'debug';
import * as mongoose from 'mongoose';

// Creates and configures an ExpressJS web server.
class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    mongoose.connect('mongodb://127.0.0.1:27017/myapp');
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  /**
  * Configure Token based security
  */
  private  configureSecurityRoutes(router: Router): void {
    const secret = '7ad58489-4781-4049-b136-d6b1744b358e';

    router.post('/authenticate', (req: Request, res: Response) => {
      const username = req.body.username;
      const password = req.body.password;

      if (!username || !password) {
        res.json({});
      } else {
        User.findOne({ username: username }, (err, user) => {
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

  private confirureRoutes() {
    this.express.use('/users/', UserRouter);
  }

  private routes(): void {
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

export default new App().express;
