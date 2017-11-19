/**
    Module: @mitchallen/cognito-login
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

// import {
//     AuthenticationDetails,  
//     CognitoUserPool,        
//     CognitoUser            
// } from 'amazon-cognito-identity-js';

var amazonCognitoIdentityJs = require('amazon-cognito-identity-js'),
    AuthenticationDetails = amazonCognitoIdentityJs.AuthenticationDetails,
    CognitoUserPool = amazonCognitoIdentityJs.CognitoUserPool,
    CognitoUser = amazonCognitoIdentityJs.CognitoUser;

/**
 * Module
 * @module cognito-login
 */

/**
 * 
 * Factory module
 * @module cognito-login-factory
 */

 /** 
 * Factory method 
 * It takes one spec parameter that must be an object with named parameters
 * @param {Object} spec Named parameters object
 * @returns {Promise} that resolves to {module:cognito-login}
 * @example <caption>Usage example</caption>
    var factory = require("@mitchallen/cognito-login");
 
    factory.create({})
    .then(function(obj) {
        return obj.health();
    })
    .catch( function(err) { 
        console.error(err); 
    });
 */
module.exports.create = ({ userPoolId, clientId }) => {

    return new Promise((resolve, reject) => {

        // reject("reason");

        // private 
        let _package = "@mitchallen/cognito-login";

        resolve({
            // public
            /** Returns the package name
              * @function
              * @instance
              * @memberof module:cognito-login
            */
            package: () => _package,
            /** Health check
              * @function
              * @instance
              * @memberof module:cognito-login
              * @example <caption>Usage Example</caption>
                var factory = require("@mitchallen/cognito-login");
             
                factory.create({})
                .then(function(obj) {
                    return obj.health();
                })
                .then(function(result) {
                    console.log("HEALTH: ", result);
                })
                .catch( function(err) { 
                    console.error(err); 
                });
            */
            health: () => {
                return new Promise((resolve,reject) => {
                    resolve("OK");
                });
            },

            // TODO - put doc here

            login: ({ username, password }) => {
                const userPool = new CognitoUserPool({
                    UserPoolId: userPoolId,
                    ClientId: clientId
                });
            
                const authenticationData = {
                    Username: username,
                    Password: password
                };
              
                const user = new CognitoUser({ Username: username, Pool: userPool });
                const authenticationDetails = new AuthenticationDetails(authenticationData);
              
                return new Promise((resolve, reject) => (
                    user.authenticateUser(authenticationDetails, {
                      onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
                      onFailure: (err) => reject(err),
                    })
                ));
            }
            
        });
    });
};
