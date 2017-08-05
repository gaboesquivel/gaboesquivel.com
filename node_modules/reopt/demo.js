var Reopt = require('./')

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
	return opt
}

console.log(request('http://some.server.com/', function() {}))
