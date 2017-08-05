reopt
===

[![Build status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-image]][david-url]
[npm-image]: https://img.shields.io/npm/v/reopt.svg?style=flat-square
[npm-url]: https://npmjs.org/package/reopt
[downloads-image]: http://img.shields.io/npm/dm/reopt.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/reopt
[david-image]: http://img.shields.io/david/chunpu/reopt.svg?style=flat-square
[david-url]: https://david-dm.org/chunpu/reopt

[![Test coverage][coveralls-image]][coveralls-url]

get options from arguments with multiple overloads

Installation
---

```sh
npm i reopt
```

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

License
---

[![License][license-image]][license-url]

[travis-image]: https://img.shields.io/travis/chunpu/reopt.svg?style=flat-square
[travis-url]: https://travis-ci.org/chunpu/reopt
[coveralls-image]: https://img.shields.io/coveralls/chunpu/reopt/gh-pages.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/chunpu/reopt
[license-image]: http://img.shields.io/npm/l/reopt.svg?style=flat-square
[license-url]: #
