import { Request, Response, NextFunction } from 'express';

interface RespondCallback {
    (data: any, ok: OkCallback, error: ErrorCallback);
}

interface OkCallback {
    (data: any);
}

interface ErrorCallback {
    (message: string, data: any, errorCode?: number)
}

export class BaseRoute {
    protected respond(request: Request, response: Response, process: RespondCallback) {
        const that = this;

        const ok = function(data) {
            that.Ok(response, data);
        } as OkCallback;
        
        const error = function(message, data, errorCode) {
            that.Error(response, message, data, errorCode)
        } as ErrorCallback

        process(request.body, ok, error)
    }

    private Ok(response: Response, data: any) {
        response.json({ success: true, data: data });
    }

    private Error(response: Response, message: string, data: any, errorCode: number) {
        response.json({ success: false, message: message, code: errorCode | 400 , data: data});
    }

}