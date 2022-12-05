import { Optional } from '@/core/commons/optional';
import { User } from '@/core/models';

export interface IGetUserByNameGateway {
    execute(name: string): Promise<Optional<User>>;
}

export const IGetUserByNameGatewaySymbol = Symbol('IGetUserByNameGateway');
