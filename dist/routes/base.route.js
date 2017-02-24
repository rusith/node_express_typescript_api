"use strict";
class BaseRoute {
    respond(request, response, process) {
        const that = this;
        const ok = function (data) {
            that.Ok(response, data);
        };
        const error = function (message, data, errorCode) {
            that.Error(response, message, data, errorCode);
        };
        process(request.body, ok, error);
    }
    Ok(response, data) {
        response.json({ success: true, data: data });
    }
    Error(response, message, data, errorCode) {
        response.json({ success: false, message: message, code: errorCode | 400, data: data });
    }
}
exports.BaseRoute = BaseRoute;
