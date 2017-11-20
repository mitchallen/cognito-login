@mitchallen/cognito-login
==
AWS Cognito login module
--

<p align="left">
  <a href="https://travis-ci.org/mitchallen/cognito-login">
    <img src="https://img.shields.io/travis/mitchallen/cognito-login.svg?style=flat-square" alt="Continuous Integration">
  </a>
  <a href="https://codecov.io/gh/mitchallen/cognito-login">
    <img src="https://codecov.io/gh/mitchallen/cognito-login/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/cognito-login">
    <img src="http://img.shields.io/npm/dt/@mitchallen/cognito-login.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/cognito-login">
    <img src="http://img.shields.io/npm/v/@mitchallen/cognito-login.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/cognito-login">
    <img src="https://img.shields.io/github/license/mitchallen/cognito-login.svg" alt="License"></a>
  </a>
</p>

## Installation

    $ npm init
    $ npm install @mitchallen/cognito-login --save
  
* * *

## Usage

```js
var factory = require("@mitchallen/cognito-login");

factory.create({
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
    // user has successfully logged in
    // update state or redux store
})
.catch( err => { 
    console.error(err);
    // login failed 
});
```

* * *

## AWS Cognito

https://console.aws.amazon.com/cognito/

## Creating a Test User

To create a test user you need to do the following:

* Install and setup aws-cli (the aws command line interface)
* Set some environment variables
* Call an api to signup the test user
* Call an api to confirm the test users signup

### Install and setup aws-cli

TODO:

### Set Testing Environment Variables

```
export COGNITO_TEST_USER_POOL_ID=(Cognito user pool id)
export COGNITO_TEST_CLIENT_ID=(Cognito client id)
export COGNITO_TEST_REGION=(Cognito region)
export COGNITO_TEST_IDENTITY_POOL_ID=(Cognito identity pool id)
export COGNITO_TEST_USER=(user email)
export COGNITO_TEST_PASSWORD=(user password)
```

#### On a Mac

Add the lines above to ```~/.bash_profile.```
Then at the command line run this command:

```
$ source ~/.bash_profile
```

### Signup the user from the command line

#### On a Mac

To create a test user based on the environment variables, run this from the command line (minus the __$__):

```
$ aws cognito-idp sign-up --client-id $COGNITO_TEST_CLIENT_ID --region $COGNITO_TEST_REGION --username $COGNITO_TEST_USER --password $COGNITO_TEST_PASSWORD --user-attributes Name=email,Value=$COGNITO_TEST_USER 
```

Once the test user is signed up, the next step below is to use an admin command to confirm the user from the command line.

### Admin Confirm User Signup from the command line

```
$ aws cognito-idp admin-confirm-sign-up --user-pool-id $COGNITO_TEST_USER_POOL_ID --region $COGNITO_TEST_REGION --username $COGNITO_TEST_USER
```

* * *

## Modules

<dl>
<dt><a href="#module_cognito-login">cognito-login</a></dt>
<dd><p>Module</p>
</dd>
<dt><a href="#module_cognito-login-factory">cognito-login-factory</a></dt>
<dd><p>Factory module</p>
</dd>
</dl>

<a name="module_cognito-login"></a>

## cognito-login
Module


* [cognito-login](#module_cognito-login)
    * [.package()](#module_cognito-login+package)
    * [.login(username, password)](#module_cognito-login+login)

<a name="module_cognito-login+package"></a>

### cognito-login.package()
Returns the package name

**Kind**: instance method of <code>[cognito-login](#module_cognito-login)</code>  
<a name="module_cognito-login+login"></a>

### cognito-login.login(username, password)
Login method.

**Kind**: instance method of <code>[cognito-login](#module_cognito-login)</code>  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | Cognito user name |
| password | <code>string</code> | Cognito user password |

**Example** *(Usage Example)*  
```js
var factory = require("@mitchallen/cognito-login");

factory.create({
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
    // user has successfully logged in
    // update state or redux store
})
.catch( err => { 
    console.error(err);
    // login failed 
});
```
<a name="module_cognito-login-factory"></a>

## cognito-login-factory
Factory module

<a name="module_cognito-login-factory.create"></a>

### cognito-login-factory.create(userPoolId, clientId) ⇒ <code>Promise</code>
Factory method.

**Kind**: static method of <code>[cognito-login-factory](#module_cognito-login-factory)</code>  
**Returns**: <code>Promise</code> - that resolves to {module:cognito-login}  

| Param | Type | Description |
| --- | --- | --- |
| userPoolId | <code>string</code> | Cognito user pool id |
| clientId | <code>string</code> | Cognito client id |

**Example** *(Usage example)*  
```js
var factory = require("@mitchallen/cognito-login");

factory.create({
    userPoolId: COGNITO_TEST_USER_POOL_ID,
    clientId: COGNITO_TEST_CLIENT_ID
})
.then( obj => obj.login({ ... }) )
.catch( err => { 
    console.error(err);
});
```

* * *

## Additional Cognito API Notes

See: http://docs.aws.amazon.com/cli/latest/reference/cognito-idp/index.html#cli-aws-cognito-idp

### Forgot Password

```
$ aws cognito-idp forgot-password --client-id $COGNITO_TEST_CLIENT_ID --username $COGNITO_TEST_USER --region $COGNITO_TEST_REGION
```

This will cause an email with a verification code to be sent to the user.

To change the password, take the confirmation code from the email and plugin it into this command line, along with the new password parameter:

```
$ aws cognito-idp confirm-forgot-password  --client-id $COGNITO_TEST_CLIENT_ID --username $COGNITO_TEST_USER --region $COGNITO_TEST_REGION --password (new password) --confirmation-code (verification code) 
```

Note that for testing you can currently use the old password as the new password, unless Cognito has been configured to now allow that.

* * *

### Enable a user that has been disabled

```
$ aws cognito-idp admin-enable-user --user-pool-id $COGNITO_TEST_USER_POOL_ID --region $COGNITO_TEST_REGION --username $COGNITO_TEST_USER
```

### Dealing with FORCE\_CHANGE\_PASSWORD

See: 

* https://stackoverflow.com/questions/40287012/how-to-change-user-status-force-change-password
* http://docs.aws.amazon.com/cli/latest/reference/cognito-idp/admin-respond-to-auth-challenge.html

TODO: describe how to get session:

```
$ aws cognito-idp admin-respond-to-auth-challenge --user-pool-id $COGNITO_TEST_USER_POOL_ID --client-id $COGNITO_TEST_CLIENT_ID --region $COGNITO_TEST_REGION --challenge-name NEW_PASSWORD_REQUIRED --challenge-responses USERNAME=$COGNITO_TEST_USER,NEW_PASSWORD=Test1234! --session (TODO)
```

### Create User

For test users it is simpler to use steps listed far above to just use sign-up followed by admin-confirm-sign-up.

The command below requires a few more hoops to get the user enabled. 

```
$ aws cognito-idp admin-create-user --user-pool-id $COGNITO_TEST_USER_POOL_ID --region $COGNITO_TEST_REGION --username $COGNITO_TEST_USER ----temporary-password (some temp password)
```

TODO: Instructions for: User must then enter temp password with new password in signup.


* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/cognito-login.git](https://bitbucket.org/mitchallen/cognito-login.git)
* [github.com/mitchallen/cognito-login.git](https://github.com/mitchallen/cognito-login.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.1

* Fixed formatting error in doc

#### Version 0.1.0 

* initial release

* * *
