import { Injectable } from '@nestjs/common';
import { User } from '@/core/models';
import { UserRepository } from '@/infra/repositories';
import { UserEntity } from '@/infra/models';
import { UserMapper } from '@/infra/mappers';
import { IRegisterUserGateway } from '@/core/usecases/register-user/register-user.gateway';

@Injectable()
export class RegisterUserProvider implements IRegisterUserGateway {
    constructor(private userRepository: UserRepository) { }

    async execute(user: User): Promise<User> {
        const entity: UserEntity = UserMapper.toUserEntity(user);
        return UserMapper.toUser(await this.userRepository.save(entity));
    }
}
