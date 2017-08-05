var _ = require('min-util')

var is = _.is

module.exports = Reopt

function Reopt(typeDefine, overloads) {
	this.typeDefine = getTypeDefine(typeDefine)
	this.overloads = getOverloads(overloads)
}

var proto = Reopt.prototype

proto.isOverload = function(args, overload) {
	var me = this
	return _.every(overload, function(item, i) {
		var types = me.typeDefine[item]
		return matchTypes(args[i], types)
	})
}

proto.match = function(args) {
	var me = this
	return _.find(me.overloads, function(overload) {
		return me.isOverload(args, overload) 	
	})
}

proto.get = function(args) {
	var overload = this.match(args)
	if (overload) {
	 	return _.reduce(overload, function(ret, key, i) {
	 		ret[key] = args[i]
	 		return ret
	 	}, {})
	}
}

Reopt.types = {
	'*': function() {
		return true
	},
	'element': function(val) {
		return is.element(val)
	},
	'array': function(val) {
		return is.array(val)
	}
}

function matchTypes(val, types) {
	return _.some(types, function(type) {
		var fn = Reopt.types[type]
		if (fn) return fn(val)
		return is._type(val) == type
	})
}

function getTypeDefine(typeDefine) {
	var ret = _.extend({}, typeDefine)
	return _.reduce(_.keys(ret), function(ret, key) {
		ret[key] = makeArray(ret[key])
		return ret
	}, ret)
}

function getOverloads(overloads) {
	return _.filter(_.map(overloads, function(overload) {
		return makeArray(overload)
	}), function(arr) {
		return !is.empty(arr)
	}).sort(function(arr1, arr2) {
		// can be ambiguities, so who long match first
		return arr2.length - arr1.length
	})
}

function makeArray(arr, sep) {
	if (is.array(arr)) return arr
	sep = sep || ' '
	if (is.string(arr)) return arr.split(sep)
	return []
}
