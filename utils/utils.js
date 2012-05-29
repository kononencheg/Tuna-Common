


/**
 * @private
 * @constructor
 */
tuna.utils.__ExtendLink = function() {};


/**
 * Наследование типа.
 *
 * Передает прототип родительского класса дочернему классу без ссылки на
 * него, сохраняя конструктор.
 *
 * @param {!Object} Class Класс который должен наследовать тип.
 * @param {!Object} Parent Родительский класс.
 */
tuna.utils.extend = function(Class, Parent) {
    tuna.utils.__ExtendLink.prototype = Parent.prototype;

    Class.prototype = new tuna.utils.__ExtendLink();
    Class.prototype.constructor = Class;
};


/**
 * Привязывание определенного контекста к функции или методу.
 *
 * @param {!function()} func
 * @param {Object} context
 * @return {function()}
 */
tuna.utils.bind = function(func, context) {
    if (func.bind !== undefined) {
        return func.bind(context);
    } else {
        return function() {
            return func.apply
                (context, tuna.utils.toArray(arguments));
        };
    }
};


/**
 * Отложенное выполнение метода.
 *
 * @param {function()} callback
 */
tuna.utils.nextTick = function(callback) {
    setTimeout(callback, 0);
};


/**
 * Клонирование объекта.
 *
 * @param {*} object
 * @return {*} Копия объекта.
 */
tuna.utils.clone = function(object) {
    return JSON.parse(JSON.stringify(object));
};


/**
 * @param {!Object} base
 * @param {Object} target
 */
tuna.utils.merge = function(base, target) {
    for (var key in target) {
        base[key] = target[key];
    }
};


/**
 * @param {Object} first
 * @param {Object} second
 * @return {boolean}
 */
tuna.utils.isObjectsEquals = function(first, second) {
    return first === second || JSON.stringify(first) === JSON.stringify(second);
};

/**
 * Преобразование объекта с индесами в массив.
 *
 * @param {Object} list Объект похожий на массив.
 * @return {!Array} Массив.
 */
tuna.utils.toArray = function(list) {
    return list === null ? [] : Array.prototype.slice.call(list);
};


/**
 * Клонирование массива.
 *
 * @param {!Array} array
 * @return {!Array} Копия массива.
 */
tuna.utils.cloneArray = function(array) {
    return array.slice(0);
};


/**
 * Поиск индекса объекта в массиве.
 *
 * @param {*} element
 * @param {Array} array
 * @return {number}
 */
tuna.utils.indexOf = function(element, array) {
    if (array.indexOf !== undefined) {
        return array.indexOf(element);
    } else {
        var i = 0,
            l = array.length;

        while (i < l) {
            if (array[i] === element) {
                return i;
            }

            i++;
        }
    }

    return -1;
};


/**
 * Кодирование объекта в x-www-form-urlencoded форму.
 *
 * @param {Object} object Объект кодирования.
 * @return {string} Перекодированный в строку объект.
 */
tuna.utils.urlEncode = function(object) {
    return tuna.utils.__splitUrlData(object).join('&');
};


/**
 * Рекурсивное разбиение объекта н данные для кодирования в x-www-form-urlencoded.
 *
 * @private
 * @param {Object} object Объект кодирования.
 * @param {Object=} path Путь к элементарной единице данных.
 * @return {Array} Массив элементарных данных составляющих объект
 */
tuna.utils.__splitUrlData = function(object, path) {
    var result = [];

    if (path === undefined) {
        path = [];
    }

    if (object !== null && !(object instanceof Function)) {
        if (object instanceof Object) {
            for (var key in object) {
                var newPath = path.length === 0 ?
                    [key] : (path.join(',') + ',' + key).split(',');

                result = result.concat(tuna.utils.__splitUrlData(object[key], newPath));
            }
        } else {
            result = [
                path.shift() + (path.length > 0 ? '[' + path.join('][') + ']=' : '=') +
                    encodeURIComponent('' + object)
            ];
        }
    }

    return result;
};


/**
 * @param {string} search
 * @return {!Object}
 */
tuna.utils.urlDecode = function(search) {
    var result = new tuna.utils.SafeObject({});

    var values = search.split('&');
    var i = 0,
        l = values.length;

    var pair = null;
    var path = null;
    var value = null;
    while (i < l) {
        pair = values[i].split('=');
        path = decodeURIComponent(pair.shift());
        value = pair.shift();

        if (value !== undefined) {
            result.setByPath
                (decodeURIComponent(value), tuna.utils.parseUrlToken(path));
        }

        i++;
    }

    return result.getCore();
};


/**
 * @param {string} path
 * @return {!Array.<string>}
 */
tuna.utils.parseUrlToken = function(path) {
    var nameLength = path.indexOf('[');
    if (nameLength === -1) {
        return [path];
    }

    return [path.substring(0, nameLength)].concat
                (path.substring(nameLength + 1, path.length - 1).split(']['));
};