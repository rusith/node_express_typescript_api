// import * as mocha from 'mocha';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');

// chai.use(chaiHttp);
// const expect = chai.expect;
/*
describe('User Tests', () => {
    it('get all objects', () => {
        return chai.request(app)
            .get('/users')
            .set('Content-Type', 'application/json')
            .send({})
            .then( res => {
                console.log(res.body);
            });
    });
});
*/

// describe('create and retreve user logins', () => {
//     it('should return all logins', () => {
//        chai.request(app)
//        .post('/authenticate')
//        .send({username: 'rusith', password: 'password'})
//        .then(res => {
//             chai.request(app)
//             .get('/users')
//             .set('x-access-token', res.body.token)
//             .then(re => {
//                 let accessToken = res.body.token;
//                 let userId = re.body[0]._id;
//                 expect(userId).to.exist;
//                 chai.request(app)
//                 .post('/users/' + userId + '/logins')
//                 .set('x-access-token', accessToken)
//                 .send({time : new Date()})
//                 .then(addUserResult => {
//                     console.log(addUserResult.body);
//                     expect(res.body).to.be.exist;
//                     chai.request(app)
//                     .get('/users' + userId + '/logins')
//                     .set('x-access-token', accessToken)
//                     .then(getLoginResult => {
//                         console.log(getLoginResult.body);
//                         expect(getLoginResult.body).not.to.be.empty;
//                     });
//                 });
//             });
//         });
//     });
// });