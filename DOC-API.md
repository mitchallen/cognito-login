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

**Kind**: instance method of [<code>cognito-login</code>](#module_cognito-login)  
<a name="module_cognito-login+login"></a>

### cognito-login.login(username, password)
Login method.

**Kind**: instance method of [<code>cognito-login</code>](#module_cognito-login)  

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

### cognito-login-factory.create(userPool, userPoolId, clientId) ⇒ <code>Promise</code>
Factory method.

**Kind**: static method of [<code>cognito-login-factory</code>](#module_cognito-login-factory)  
**Returns**: <code>Promise</code> - that resolves to {module:cognito-login}  

| Param | Type | Description |
| --- | --- | --- |
| userPool | <code>Object</code> | Cognito user pool |
| userPoolId | <code>string</code> | Cognito user pool id |
| clientId | <code>string</code> | Cognito client id |

**Example** *(Use existing pool)*  
```js
var factory = require("@mitchallen/cognito-login");

factory.create({
    userPool: userPool 
})
.then( obj => obj.login({ ... }) )
.catch( err => { 
    console.error(err);
});
```
**Example** *(Create pool from id&#x27;s example)*  
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
