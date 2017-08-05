Api
---

```js
new Reopt(typeDefine, templates)
```

e.g.

```js
new Reopt({
	param1: 'type1 type2'
	param2: 'type3'
}, ['param1', 'param1 param2'])
```

Usage
---

```js
var Reopt = require('reopt')

var reopt = new Reopt({
	url: 'string',
	opt: 'object',
	callback: 'function'
}, [
	'url callback',
	'url',
	'opt callback',
	'opt'
])

function request() {
	var opt = reopt.get(arguments)
	console.log(opt)
}

request('http://some.server.com/', function() {})
/*
=> {
	url: 'http://some.server.com/',
	callback: function() {}
}
*/
```
