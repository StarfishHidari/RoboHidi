import uuidV4 from 'uuid/v4'
class Cache {
		constructor() {
			this.id = uuidV4();
			this.cache = {};
		}

		get id() {
			return this.id;
		}

		get cache() {
			return this.cache;
		}

		set setCache(cache) {
			this.cache = cache;
		}

		// add a value to a given key, if the provided value is undefined, return the original value.
		// If the value provided does exist, then create a variable holding the new key pair, and assign it to a copy of the cache
		// I'm assigning the value so that I'm not creating issues with overwriting the original
		remember(key, value) {
			if (value === undefined) {
				return cache()[key + '_' + id()];
			}

			newPair = {};
			newPair[key + '_' + id()] = value;
			setCache(Object.assign({}, cache(), newPair));
			return cache()[key + '_' + id()];
		}


		// forget a given key
		forget(key) {
			cacheCopy = cache();
			delete cacheCopy[key + '_' + id()];
		}
}