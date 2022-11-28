import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@/core/exceptions';
import { User } from '@/core/models';
import { GetUserByNameQuery, IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';

@Injectable()
export class GetUserByNameUseCase implements IGetUserByNameUseCase {
    constructor(@Inject(GetUserByNameGateway) private gateway: GetUserByNameGateway) { }
    async execute(query: GetUserByNameQuery): Promise<User> {
        const user: User = await this.gateway.execute(query.name);
        if (!user) {
            throw new NotFoundException('validation.user.name.not.found {}', [query.name]);
        }
        return user;
    }
}
