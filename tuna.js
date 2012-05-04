/**
 * TUNA FRAMEWORK COMMON
 *
 * @author Kononenko Sergey <kononenheg@gmail.com>
 */


/**
 * Глобальная область имен.
 *
 * @namespace
 */
var tuna = {};


/**
 * Является ли текущий браузер Internet Explorer'ом.
 *
 * @const
 * @type {boolean}
 */
tuna.IS_IE = !!eval("'\v' == 'v'");


/**
 * Область имен классов реализующих AJAX запросы.
 *
 * @namespace
 */
tuna.net = {};


/**
 * Область имен функций для работы с DOM-моделью.
 *
 * @namespace
 */
tuna.dom = {};


/**
 * Область имен классов обработки и генерации событий.
 *
 * @namespace
 */
tuna.events = {};


/**
 * Область имен вспомогательных функций.
 *
 * @namespace
 */
tuna.utils = {};
