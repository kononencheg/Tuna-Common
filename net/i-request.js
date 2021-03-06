


/**
 * Интерфейс классов отправки удаленных запросов.
 *
 * @event <code>complete</code> - При получении ответа на запрос.
 * @interface
 * @extends {tuna.events.IEventDispatcher}
 */
tuna.net.IRequest = function() {};


tuna.utils.extend(tuna.net.IRequest, tuna.events.IEventDispatcher);


/**
 * Отслыка запроса.
 *
 * @param {Object=} opt_data Сопуствующие запросу данные.
 */
tuna.net.IRequest.prototype.send = function(opt_data) {};


/**
 * Прерывание запроса.
 *
 * Прерывание вызывает преждевременное получение ответа на запрос.
 */
tuna.net.IRequest.prototype.abort = function() {};
