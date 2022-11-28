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
}
