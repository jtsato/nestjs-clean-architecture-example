import { UserResponse } from '@/web-api/xcutting';

export interface IGetUserByNameController {
    execute(name: string): Promise<UserResponse>;
}

export const IGetUserByNameControllerSymbol = Symbol.for('IGetUserByNameController');
