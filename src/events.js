(function() {

"use strict";

if (Echo.Events) return;

Echo.Events = {};

Echo.Events._subscriptions = {};

Echo.Events._dataByHandlerId = {};

Echo.Events.subscribe = function(params) {
	var handlerId = Echo.Utils.getUniqueString();
	var context = Echo.Events._initContext(params.topic, params.context);
	Echo.Events._executeForDeepestContext(params.topic, context, function(obj, lastContext) {
		obj[lastContext].handlers.push({
			"id": handlerId,
			"handler": params.handler
		});
	});
	Echo.Events._dataByHandlerId[handlerId] = {
		"context": context,
		"topic": params.topic
	};
	return handlerId;
};

Echo.Events.unsubscribe = function(params) {
	var unsubscribed = false;
	if (params.handlerId && Echo.Events._dataByHandlerId[params.handlerId]) {
		params.topic = Echo.Events._dataByHandlerId[params.handlerId].topic;
		params.context = Echo.Events._dataByHandlerId[params.handlerId].context;
	} else {
		params.context = Echo.Events._initContext(params.topic, params.context);
	}
	if (params.handlerId || params.topic) {
		var obj = Echo.Events._executeForDeepestContext(params.topic, params.context, function(obj, lastContext) {
			if (params.handlerId) {
				$.each(obj[lastContext].handlers, function(i, data) {
					if (data.id === params.handlerId) {
						obj[lastContext].handlers.splice(i, 1);
						delete Echo.Events._dataByHandlerId[data.id];
						unsubscribed = true;
						return false;
					}
				});
			} else {
				$.each(obj[lastContext].handlers, function(i, data) {
					delete Echo.Events._dataByHandlerId[data.id];
				});
				delete obj[lastContext];
				unsubscribed = true;
			}
		});
	} else {
		$.each(Echo.Events._subscriptions, function(topic, data) {
			Echo.Events._executeForDeepestContext(topic, params.context, function(obj, lastContext) {
				$.each(obj[lastContext].handlers, function(i, data) {
					delete Echo.Events._dataByHandlerId[data.id];
				});
				delete obj[lastContext];
				unsubscribed = true;
			});
		});
	}
	return unsubscribed;
};

Echo.Events.publish = function(params) {
	var needStop = function(result, type) {
		if (!result || !result.stop) {
			return false;
		}
		return type === "bubble"
			? ~$.inArray("propagate", result.stop)
			: ~$.inArray("propagate", result.stop) || ~$.inArray(type, result.stop);
	};
	var callHandlers = function(obj, restContexts) {
		var lastHandlerResult;
		$.each(obj.handlers || [], function(i, data) {
			lastHandlerResult = data.handler(params.topic, params.data);
			if (needStop(lastHandlerResult, "propagate.siblings")) {
				return false;
			}
		});
		if (params.bubble && !needStop(lastHandlerResult, "bubble")) {
			if (!restContexts.length) {
				return;
			}
			params.context = restContexts.join("/");
			Echo.Events.publish(params);
		} else if (!needStop("propagate.children")) {
			$.each(obj.contexts, function(id, context) {
				callHandlers(context);
			});
		}
	};
	params.context = Echo.Events._initContext(params.topic, params.context);
	Echo.Events._executeForDeepestContext(params.topic, params.context, function(obj, lastContext, restContexts) {
		callHandlers(obj[lastContext], restContexts);
	});
	if (!params.bubble && params.context !== "empty") {
		params.context = "empty";
		Echo.Events.publish(params);
	}
};

// private functions

Echo.Events._initContext = function(topic, context) {
	context = context || "empty";
	if (topic) {
		var obj = Echo.Events._subscriptions[topic] = Echo.Events._subscriptions[topic] || {};
		$.each(context.split("/"), function(i, part) {
			if (!obj[part]) {
				obj[part] = {
					"contexts": {},
					"handlers": []
				};
			}
			obj = obj[part].contexts;
		});
	}
	return context;
};

Echo.Events._executeForDeepestContext = function(topic, context, callback) {
	var parts = context.split("/");
	var lastContext = parts.pop();
	var obj = Echo.Events._subscriptions[topic];
	$.each(parts, function(i, part) {
		obj = obj[part].contexts;
	});
	if (obj[lastContext]) {
		callback(obj, lastContext, parts);
	}
};

})();