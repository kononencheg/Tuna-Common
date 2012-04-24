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
 * Версия общей части библиотеки.
 *
 * @const
 * @type string
 */
tuna.VERSION = '1.0.580';


/**
 * Является ли текущий браузер Internet Explorer'ом.
 *
 * @const
 * @type {boolean}
 */
tuna.IS_IE = !!eval("'\v' == 'v'");


/**
 * @namespace Область имен классов реализующих AJAX запросы.
 */
tuna.net = {};


/**
 * @namespace Область имен функций для работы с DOM-моделью.
 */
tuna.dom = {};


/**
 * @namespace Область имен классов обработки и генерации событий.
 */
tuna.events = {};


/**
 * @namespace Область имен вспомогательных функций.
 */
tuna.utils = {};
