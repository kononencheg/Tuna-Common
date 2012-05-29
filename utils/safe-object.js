


/**
 * @constructor
 * @param {!Object} data
 */
tuna.utils.SafeObject = function(data) {

    /**
     * @private
     * @type {!Object}
     */
    this.__core = data;
};


/**
 * @return {!Object}
 */
tuna.utils.SafeObject.prototype.getCore = function() {
    return this.__core;
};


/**
 * @param {...(string|number)} var_keys
 * @return {*}
 */
tuna.utils.SafeObject.prototype.get = function(var_keys) {
    return this.getByPath(tuna.utils.toArray(arguments));
};


/**
 * @param {*} value
 * @param {...(string|number)} var_keys
 */
tuna.utils.SafeObject.prototype.set = function(value, var_keys) {
    var path = tuna.utils.toArray(arguments);
    this.setByPath(path.shift(), path);
};


/**
 * @param {!Array.<(string|number)>} path
 * @return {*}
 */
tuna.utils.SafeObject.prototype.getByPath = function(path) {
    var result = this.__core;

    var i = 0,
        l = path.length;

    var value = null;
    while (i < l) {
        if (result === null || path[i] === '') {
            break;
        }

        value = result[path[i]];
        if (value !== undefined) {
            result = value;
        } else {
            result = null;
        }

        i++;
    }

    return result === this.__core ? null : result;
};


/**
 * @param {*} value
 * @param {!Array.<(string|number)>} path
 */
tuna.utils.SafeObject.prototype.setByPath = function(value, path) {
    var scope = this.__core;

    var i = 0,
        l = path.length;

    var key = null;
    while (i < l) {
        key = path[i++];

        if (key === '') {
            key = 0;

            while (scope[key] !== undefined) {
                key++;
            }
        }

        if (i === l) {
            scope[key] = value;
        } else if (scope[key] === undefined) {
            scope[key] = isNaN(path[i]) ? {} : [];
        }

        scope = scope[key];
    }
};