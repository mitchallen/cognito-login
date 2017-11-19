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
    * [.health()](#module_cognito-login+health)

<a name="module_cognito-login+package"></a>

### cognito-login.package()
Returns the package name

**Kind**: instance method of <code>[cognito-login](#module_cognito-login)</code>  
<a name="module_cognito-login+health"></a>

### cognito-login.health()
Health check

**Kind**: instance method of <code>[cognito-login](#module_cognito-login)</code>  
**Example** *(Usage Example)*  
```js
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
```
<a name="module_cognito-login-factory"></a>

## cognito-login-factory
Factory module

<a name="module_cognito-login-factory.create"></a>

### cognito-login-factory.create(spec) ⇒ <code>Promise</code>
Factory method 
It takes one spec parameter that must be an object with named parameters

**Kind**: static method of <code>[cognito-login-factory](#module_cognito-login-factory)</code>  
**Returns**: <code>Promise</code> - that resolves to {module:cognito-login}  

| Param | Type | Description |
| --- | --- | --- |
| spec | <code>Object</code> | Named parameters object |

**Example** *(Usage example)*  
```js
    var factory = require("@mitchallen/cognito-login");
 
    factory.create({})
    .then(function(obj) {
        return obj.health();
    })
    .catch( function(err) { 
        console.error(err); 
    });
```
