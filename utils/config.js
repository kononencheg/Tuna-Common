


/**
 * @constructor
 */
tuna.utils.Config = function() {

    /**
     * @private
     * @type {Object.<(string|number), *>}
     */
    this.__data = null;
};


/**
 * @param {Object} data
 */
tuna.utils.Config.prototype.init = function(data) {
    this.__data = data;
};


/**
 * @param {...(string|number)} var_keys
 * @return {*}
 */
tuna.utils.Config.prototype.get = function(var_keys) {
    var args = tuna.utils.toArray(arguments);

    var result = this.__data;

    var i = 0,
        l = args.length;

    var key = null;
    while (i < l) {
        key = args[i];

        if (result[key] !== undefined) {
            result = result[key];
        } else {
            result = null;
            break;
        }

        i++;
    }

    return result;
};


/**
 * @param {string|number} key
 * @param {*} value
 */
tuna.utils.Config.prototype.set = function(key, value) {
    this.__data[key] = value;
};
