import { CoreException } from '@/core/exceptions';

export class CatchExceptionHelper {
    static catch(func: () => void): CoreException {
        let exception: CoreException = null;
        try {
            func();
        } catch (error) {
            if (error instanceof CoreException) {
                exception = error;
            }
        }
        return exception;
    }

    static async catchAsync(func: () => Promise<any>): Promise<CoreException> {
        let exception: CoreException = null;
        try {
            await func();
        } catch (error) {
            if (error instanceof CoreException) {
                exception = error;
            }
        }
        return exception;
    }
}
