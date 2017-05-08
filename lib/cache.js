'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
	function Cache() {
		_classCallCheck(this, Cache);

		this.id = (0, _v2.default)();
		this.cache = {};
	}

	_createClass(Cache, [{
		key: 'remember',


		// add a value to a given key, if the provided value is undefined, return the original value.
		// If the value provided does exist, then create a variable holding the new key pair, and assign it to a copy of the cache
		// I'm assigning the value so that I'm not creating issues with overwriting the original
		value: function remember(key, value) {
			if (value === undefined) {
				return cache()[key + '_' + id()];
			}

			newPair = {};
			newPair[key + '_' + id()] = value;
			cache(Object.assign({}, cache(), newPair));
			return cache()[key + '_' + id()];
		}

		// forget a given key

	}, {
		key: 'forget',
		value: function forget(key) {
			cacheCopy = cache();
			delete cacheCopy[key + '_' + id()];
		}
	}, {
		key: 'id',
		get: function get() {
			return this.id;
		}
	}, {
		key: 'cache',
		get: function get() {
			return this.cache;
		},
		set: function set(cache) {
			this.cache = cache;
		}
	}]);

	return Cache;
}();