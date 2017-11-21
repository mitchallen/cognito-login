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
 * Factory method. 
 * @param {Object} userPool Cognito user pool
 * @param {string} userPoolId Cognito user pool id
 * @param {string} clientId Cognito client id
 * @returns {Promise} that resolves to {module:cognito-login}
 * @example <caption>Use existing pool</caption>
 * var factory = require("@mitchallen/cognito-login");
 * 
 * factory.create({
 *     userPool: userPool 
 * })
 * .then( obj => obj.login({ ... }) )
 * .catch( err => { 
 *     console.error(err);
 * });
 * @example <caption>Create pool from id's example</caption>
 * var factory = require("@mitchallen/cognito-login");
 * 
 * factory.create({
 *     userPoolId: COGNITO_TEST_USER_POOL_ID,
 *     clientId: COGNITO_TEST_CLIENT_ID
 * })
 * .then( obj => obj.login({ ... }) )
 * .catch( err => { 
 *     console.error(err);
 * });
 */
module.exports.create = ({ userPool, userPoolId, clientId }) => {

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
            /** Login method.
              * @function
              * @instance
              * @memberof module:cognito-login
              * @param {string} username Cognito user name
              * @param {string} password Cognito user password
              * @example <caption>Usage Example</caption>
              * var factory = require("@mitchallen/cognito-login");
              * 
              * factory.create({
              *     userPoolId: COGNITO_TEST_USER_POOL_ID,
              *     clientId: COGNITO_TEST_CLIENT_ID
              * })
              * .then( obj => obj.login({
              *         username: COGNITO_TEST_USER,    
              *         password: COGNITO_TEST_PASSWORD 
              *     })
              * )
              * .then( token => {
              *     // console.log(token);
              *     // user has successfully logged in
              *     // update state or redux store
              * })
              * .catch( err => { 
              *     console.error(err);
              *     // login failed 
              * });
            */
            login: ({ username, password }) => {

                if( ! userPool ) {
                    userPool = new CognitoUserPool({
                        UserPoolId: userPoolId,
                        ClientId: clientId
                    });
                }
            
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
