import * as chai from 'chai';
import app from './../src/App';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const getToken = function(): Promise<string> {
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
            }, error => { console.log("get token error");  expect(false).to.be.true; reject(error); });
    });
};

export default getToken;
