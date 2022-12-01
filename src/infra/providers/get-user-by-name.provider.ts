import { Injectable } from '@nestjs/common';
import { User } from '@/core/models';
import { UserRepository } from '@/infra/repositories';
import { UserEntity } from '@/infra/models';
import { UserMapper } from '@/infra/mapper';
import { IGetUserByNameGateway } from '@/core/usecases/xcutting';

@Injectable()
export class GetUserByNameProvider implements IGetUserByNameGateway {
    constructor(private userRepository: UserRepository) { }

    async execute(name: string): Promise<User> {
        const entity: UserEntity = await this.userRepository.findByName(name);
        return UserMapper.toUser(entity);
    }
}
