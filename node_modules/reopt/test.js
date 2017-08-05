var assert = require('assert')
var Reopt = require('./')
var _ = require('min-util')

var is = _.is

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

var url = 'http://some.server.com/'

describe('main test', function() {
	it('url callback', function() {
		var opt = request(url, _.noop)
		assert.deepEqual(opt, {
			url: url,
			callback: _.noop
		})
	})

	it('url', function() {
		var opt = request(url)
		assert({url: url}, opt)
	})

	it('opt callback', function() {
		var param = {
			url: url,
			headers: {}
		}
		var opt = request(param, _.noop)
		assert({
			url: url,
			headers: {},
			callback: _.noop
		}, param)
	})

	it('opt', function() {
		var param = {
			url: url,
			headers: {}
		}
		var opt = request(param)
		assert(opt, param)
	})

	it('return undefined when meet shit', function() {
		var opt = request(1000)
		assert(undefined === opt)
	})
})
