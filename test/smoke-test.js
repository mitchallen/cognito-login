/**
    Module: @mitchallen/cognito-login
      Test: smoke-test
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint mocha: true */
/*jshint esversion: 6 */

"use strict";

var request = require('supertest'),
    should = require('should'),
    jwt = require('jsonwebtoken'),
    modulePath = "../modules/index";

var amazonCognitoIdentityJs = require('amazon-cognito-identity-js'),
    CognitoUserPool = amazonCognitoIdentityJs.CognitoUserPool;

var COGNITO_TEST_USER_POOL_ID = process.env.COGNITO_TEST_USER_POOL_ID,
    COGNITO_TEST_CLIENT_ID = process.env.COGNITO_TEST_CLIENT_ID,
    COGNITO_TEST_REGION = process.env.COGNITO_TEST_REGION,
    COGNITO_TEST_USER = process.env.COGNITO_TEST_USER,
    COGNITO_TEST_PASSWORD = process.env.COGNITO_TEST_PASSWORD

describe('module factory smoke test', () => {

    var _factory = null;

    const testUserPool = new CognitoUserPool({
        UserPoolId: COGNITO_TEST_USER_POOL_ID,
        ClientId: COGNITO_TEST_CLIENT_ID
    });

    before( done => {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
        done();
    });

    after( done => {
        // Call after all tests
        done();
    });

    beforeEach( done => {
        // Call before each test
        done();
    });

    afterEach( done => {
        // Call after eeach test
        done();
    });

    it('module should exist', done => {
        should.exist(_factory);
        done();
    });

    it('create method with valid id parameters should return object', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => {
            should.exist(obj);
            done();
        })
        .catch( err => { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('create method with valid poolmparameter should return object', done => {
        _factory.create({
            userPool: testUserPool
        })
        .then( obj => {
            should.exist(obj);
            done();
        })
        .catch( err => { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('login method should return a valid token when intialized with pool id\'s', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            // console.log(token);
            // jwt.decode will return null if not a valid token
            var obj = jwt.decode(token);
            should.exist(obj);
            done();
        })
        .catch( err => { 
            console.error(err);
            done(err); 
        });
    });

    it('login method should return a valid token when initialized with existing pool ', done => {
        _factory.create({
            userPool: testUserPool
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            // console.log(token);
            // jwt.decode will return null if not a valid token
            var obj = jwt.decode(token);
            should.exist(obj);
            done();
        })
        .catch( err => { 
            console.error(err);
            done(err); 
        });
    });

    it('login method should return a token with expected fields', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            var obj = jwt.decode(token);
            should.exist(obj);
            // console.log(JSON.stringify(obj));
            should.exist(obj.sub);
            should.exist(obj.aud);
            should.exist(obj.email_verified);   // in this case true
            should.exist(obj.token_use);        // in this case id
            should.exist(obj.auth_time);
            should.exist(obj.iss);  // https://cognito-idp.[REGION].amazonaws.com/[USER_POOL_ID]
            should.exist(obj['cognito:username']); // in this case, email
            should.exist(obj.exp);
            should.exist(obj.iat);  // may match auth_time
            should.exist(obj.email);
            done();
        })
        .catch( err => { 
            console.error(err);
            done(err); 
        });
    });

    it('login method token email should match user email', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            var obj = jwt.decode(token);
            should.exist(obj);
            should.exist(obj.email);
            obj.email.should.eql(COGNITO_TEST_USER);
            done();
        })
        .catch( err => { 
            console.error(err);
            done(err); 
        });
    });

    it('login method token cognito:username should match user email', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            var obj = jwt.decode(token);
            should.exist(obj);
            should.exist(obj.email);
            // this may depend on cognito configuration
            obj['cognito:username'].should.eql(COGNITO_TEST_USER);
            done();
        })
        .catch( err => { 
            console.error(err);
            done(err); 
        });
    });

    it('login method token iss url should contain region and user pool id', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            var obj = jwt.decode(token);
            should.exist(obj);
            should.exist(obj.email);
            let expectedIss = `https://cognito-idp.${COGNITO_TEST_REGION}.amazonaws.com/${COGNITO_TEST_USER_POOL_ID}`;
            obj.iss.should.eql(expectedIss);
            done();
        })
        .catch( function(err) { 
            console.error(err);
            done(err); 
        });
    });

    /*
        Stubbed: this value varies based on test user creation
     */

    /*
    it('login method token email_verify should eql true', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            var obj = jwt.decode(token);
            should.exist(obj);
            should.exist(obj.email_verified);
            // may depend on how user was verified
            obj.email_verified.should.eql(true);
            done();
        })
        .catch( err => { 
            console.error(err);
            done(err); 
        });
    });
    */

    it('login method token token_use should eql \'id\'', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        .then( token => {
            var obj = jwt.decode(token);
            should.exist(obj);
            should.exist(obj.email_verified);
            // may depend on how user was verified
            obj.token_use.should.eql('id');
            done();
        })
        .catch( err => { 
            console.error(err);
            done(err); 
        });
    });

    it('login method should return error for unknown username', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => obj.login({
                username: 'bogus',    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        // changed done() to done(err) because exception should have been thrown
        .then( token => done(err) )  
        // To avoid unhandledPromiseRejectionWarning in catch tests,
        // need to return err object and let next then block process it
        .catch( err => err )
        .then( err => {   
            // yes, picking err from previous catch
            // this avoids unhandled rejection error if something below fails
            // console.log(JSON.stringify(err));
            should.exist(err);
            should.exist(err.code);
            err.code.should.eql("UserNotFoundException");
            err.message.should.eql("User does not exist."); // could change or be language dependent
            err.statusCode.should.eql(400);
            done();
        })
        .catch( err =>  done(err) );
    });

    /*
        Stubbing password test for now
        - triggering errors related to password attempts, screwing up other tests
     */

    /*
    it('login method should return error for wrong password', done => {
        let testObject = null;
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then( obj => {
            testObject = obj;
            return obj.login({
                username: COGNITO_TEST_USER,    
                password: 'bogus' 
            });
        })
        .then( token => {
            done(err);  // changed done() to done(err) because exception should have been thrown
        })
        .catch( err => { 
            // To avoid unhandledPromiseRejectionWarning in catch tests,
            // need to return err object and let next then block process it
            return err; 
        })
        .then( err => {   
            // yes, picking err from previous catch
            // this avoids unhandled rejection error if something below fails
            // console.log(JSON.stringify(err));
            should.exist(err);
            should.exist(err.code);
            err.code.should.eql("NotAuthorizedException");
            // err.message.should.eql("Incorrect username or password."); // could change or be language dependent
            err.statusCode.should.eql(400);
            // done();
        })
        .then( () => {
            // Try again with valid password so we don't trigger 'too many invalid' error
            return testObject.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD
            });
        })
        .then( () => {
            done();
        })
        .catch( err => { 
            console.log(JSON.stringify(err));
            // cleanup issue, the second login triggers 'Password attempts exceeded'
            done(err);
        });
    });
    */

    it('login method should return error invalid client id', done => {

        var bogusClientId = 'bogusClientId';

        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: bogusClientId
        })
        .then( obj => obj.login({
                username: COGNITO_TEST_USER,    
                password: COGNITO_TEST_PASSWORD 
            })
        )
        // changed done() to done(err) because exception should have been thrown
        .then( token => done(err) )
        // To avoid unhandledPromiseRejectionWarning in catch tests,
        // need to return err object and let next then block process it
        .catch( err => err )
        .then( err => {   
            // yes, picking err from previous catch
            // this avoids unhandled rejection error if something below fails
            // console.log(JSON.stringify(err));
            should.exist(err);
            should.exist(err.code);
            err.code.should.eql("ResourceNotFoundException");
            err.message.should.eql(`User pool client ${bogusClientId} does not exist.`); // could change or be language dependent
            err.statusCode.should.eql(400);
            done();
        })
        .catch( err => done(err) );
    });
});
