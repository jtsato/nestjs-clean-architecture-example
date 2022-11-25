import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class StopwatchInterceptor implements NestInterceptor {
    private readonly logger = new Logger(StopwatchInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(tap(this.log(context, now)));
    }

    private log(context: ExecutionContext, now: number): (value: any) => void {
        return () => {
            this.logger.log(`Method ${context.getClass().name} executed in ${Date.now() - now} ms.`);
        };
    }
}
