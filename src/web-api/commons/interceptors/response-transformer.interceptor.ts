import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@/web-api/commons/models';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map((httpResponse: HttpResponse) => {
                    if (httpResponse instanceof HttpResponse) {
                        return this.transform(context, httpResponse);
                    }
                    return httpResponse;
                }),
            );
    }

    private transform(context: ExecutionContext, httpResponse: HttpResponse) {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse<Response>();
        const { status, headers, body } = httpResponse;
        const headersKeys = Object.getOwnPropertyNames(headers);
        headersKeys.forEach((headerKey) => {
            const headerValue = headers[headerKey] as string;
            this.httpAdapter.setHeader(response, headerKey, headerValue);
        });
        this.httpAdapter.status(response, status);
        return body;
    }
}
