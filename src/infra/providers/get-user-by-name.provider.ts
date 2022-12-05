import { Injectable } from '@nestjs/common';
import { User } from '@/core/models';
import { UserRepository } from '@/infra/repositories';
import { UserMapper } from '@/infra/mappers';
import { IGetUserByNameGateway } from '@/core/usecases/xcutting';
import { Optional } from '@/core/commons/optional';

@Injectable()
export class GetUserByNameProvider implements IGetUserByNameGateway {
    constructor(private userRepository: UserRepository) { }

    async execute(name: string): Promise<Optional<User>> {
        const optional = await this.userRepository.findByName(name);
        return optional.map((entity) => UserMapper.toUser(entity));
    }
}
