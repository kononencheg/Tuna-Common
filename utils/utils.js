


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
 * Функция выполнения строки JavaScript кода в глобальной области имен.
 *
 * Не следует использовать нигде в логике приложенния.
 *
 * @param {string} code Строка кода.
 * @return {*} Результат выполнения.
 * @deprecated
 */
tuna.utils.eval = function(code) {
    return (window.execScript !== undefined) ?
        window.execScript(code) : window.eval(code);
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
 * @param {!Function} callback
 */
tuna.utils.nextTick = function(callback) {
    setTimeout(callback, 0);
};


/**
 * Преобразование объекта с индесами в массив.
 *
 * @param {?Object} list Объект похожий на массив.
 * @return {!Array} Массив.
 */
tuna.utils.toArray = function(list) {
    return list === null ? [] : Array.prototype.slice.call(list);
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
 * Клонирование массива.
 *
 * @param {Array} array
 * @return {Array} Копия массива.
 */
tuna.utils.cloneArray = function(array) {
    return array.slice(0);
};


/**
 * @param {Object} object1
 * @param {Object} object2
 * @return {boolean}
 */
tuna.utils.isObjectsEquals = function(object1, object2) {
    return object1 === object2 ||
           JSON.stringify(object1) === JSON.stringify(object2);
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
 * @private
 * @const
 * @type {string}
 */
tuna.utils.__DECODE_HELPER = '|';


/**
 * @param {string} search
 * @return {Object}
 */
tuna.utils.urlDecode = function(search) {
    var result = {};

    var parsedSearch = search.split('][').join(tuna.utils.__DECODE_HELPER);
    parsedSearch = parsedSearch.split('[').join(tuna.utils.__DECODE_HELPER);
    parsedSearch = parsedSearch.split(']').join('');

    var vars = parsedSearch.split('&');
    var i = 0,
        l = vars.length;

    var pair = null;
    var path = null;
    var pathToken = null;

    var context = null;
    while (i < l) {
        pair = vars[i].split('=');
        path = pair.shift().split(tuna.utils.__DECODE_HELPER);

        context = result;

        while (path.length > 0) {
            pathToken = path.shift();

            if (path.length === 0) {
                context[pathToken] = decodeURIComponent(pair.shift());
            } else if (context[pathToken] === undefined) {
                context[pathToken] = {};
            }

            context = context[pathToken];
        }

        i++;
    }

    return result;
};


/**
 * @type {!tuna.utils.Config}
 */
tuna.utils.config = new tuna.utils.Config();
