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
    modulePath = "../modules/index";

var COGNITO_TEST_USER_POOL_ID = process.env.COGNITO_TEST_USER_POOL_ID,
    COGNITO_TEST_CLIENT_ID = process.env.COGNITO_TEST_CLIENT_ID,
    COGNITO_TEST_USER = process.env.COGNITO_TEST_USER,
    COGNITO_TEST_PASSWORD = process.env.COGNITO_TEST_PASSWORD

describe('module factory smoke test', () => {

    var _factory = null;

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

    it('create method with valid parameters should return object', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then(function(obj){
            should.exist(obj);
            done();
        })
        .catch( function(err) { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('health method should return ok', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then(function(obj) {
            return obj.health();
        })
        .then(function(result) {
            result.should.eql("OK");
            done();
        })
        .catch( function(err) { 
            console.error(err);
            done(err); 
        });
    });

    it('login method should return ok', done => {
        _factory.create({
            userPoolId: COGNITO_TEST_USER_POOL_ID,
            clientId: COGNITO_TEST_CLIENT_ID
        })
        .then(function(obj) {
            return obj.login({
                username: COGNITO_TEST_USER,    // TODO - get form env
                password: COGNITO_TEST_PASSWORD // TODO - get from env
            });
        })
        .then(function(result) {
            // result = token
            // TODO - validate that it is a valid token
            // result.should.eql("OK");
            console.log(result);
            done();
        })
        .catch( function(err) { 
            console.error(err);
            done(err); 
        });
    });
});
