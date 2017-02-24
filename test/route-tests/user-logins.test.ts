import * as chai from 'chai';
import app from './../../src/App';
import chaiHttp = require('chai-http');
import * as mocha from 'mocha';
import * as debug from 'debug';

chai.use(chaiHttp);
const expect = chai.expect;

function getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        chai.request(app)
            .post('/authenticate')
            .send({ username: 'rusith', password: 'password' })
            .then(result => {
                console.log("get token");
                console.log(result.body);
                expect(result.body).to.be.exist;
                expect(result.body).to.ownProperty('token', 'token property');
                expect(result.body.token).not.to.be.empty;
                resolve(result.body.token);
            }, error => { console.log("get token error"); expect(false).to.be.true; reject(error); });
    });
}

describe('get user logins', () => {
    it('should return 1 user login', () => {
        console.log("tes");
        chai.request(app)
            .post('/authenticate')
            .send({ username: 'rusith', password: 'password' })
            .then(result => {
                debug("t").log("get token");
                console.log(result.body);
                expect(result.body).to.be.exist;
                expect(result.body).to.ownProperty('token', 'token property');
                expect(result.body.token).not.to.be.empty;

                let token = result.body.token;
                chai.request(app)
                    .get('/users/58a82008de20a3184c696528/logins')
                    .set('x-access-token', token)
                    .then(logins => {
                        console.log(token);
                        console.log(logins.body);
                        expect(logins.body).to.be.exist;
                        expect(logins.body).not.to.be.empty;
                    }, error => {
                        expect(false).to.be.true;
                    });
            }, error => { console.log("get token error"); expect(false).to.be.true; });
    });
});
