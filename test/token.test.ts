// import * as mocha from 'mocha';
// import * as chai from 'chai';
// import app from './../src/App';
// import chaiHttp = require('chai-http');

// chai.use(chaiHttp);
// const expect = chai.expect;
/*
describe('token tests', () => {
    it('shoud not return token', () => {
        return chai.request(app)
            .post('/authenticate')
            .send({username: 'rusit', password: 'password'})
            .then(res => {
                expect(res.body).to.be.empty;
            });
    });

    it('should not return token', () => {
        return chai.request(app)
            .post('/authenticate')
            .send({username: 'rusith', password: 's'})
            .then(res => {
                expect(res.body)
                    .to.be.empty;
            });
    });

    it('should return a token', () => {
        return chai.request(app)
            .post('/authenticate')
            .send({username:'rusith', password: 'password'})
            .then(res => {
                expect(res.body).to.be.exist;
                expect(res.body).to.be.not.empty;
                expect(res.body).has.property('token');
                console.log(res.body.token);
            });
    });
});


describe('Token in action', () => {
    it('should not allow to get data', () => {
        chai.request(app).get('users/')
            .then(res => {
                console.log(res.body);
                expect(res.body).to.not.be.empty;
                expect(res.body.success).to.be.false;
                expect(res.body).to.have.property('message');
                expect(res.body.message).eq('No token provided');
            });
    });

    it('should allow to get data', () => {
        chai.request(app).post('/authenticate')
            .send({username: 'rusith', password: 'password'})
            .then(res => {
                expect(res.body).to.be.not.empty;
                expect(res.body).to.has.property('token');
                chai.request(app).get('/users')
                    .set('x-access-token', res.body.token)
                    .then(re => {
                        expect(re.body).not.to.be.empty;
                        expect(re.body).to.has.property('success');
                        expect(re.body.success).to.be.true;
                    });
            });
    });
});*/