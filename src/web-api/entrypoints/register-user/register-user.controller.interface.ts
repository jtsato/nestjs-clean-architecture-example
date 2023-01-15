import { HttpResponse } from '@/web-api/commons/models';
import { RegisterUserRequest } from './register-user-request.model';

export interface IRegisterUserController {
    execute(request: RegisterUserRequest): Promise<HttpResponse>;
}

export const IRegisterUserControllerSymbol = Symbol.for('IRegisterUserController');
