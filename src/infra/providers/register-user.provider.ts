import { Injectable } from '@nestjs/common';
import { User } from '@/core/models';
import { UserRepository } from '@/infra/repositories';
import { UserEntity } from '@/infra/models';
import { UserMapper } from '@/infra/mapper';
import { RegisterUserGateway } from '@/core/usecases/register-user/register-user.gateway';

@Injectable()
export class RegisterUserProvider implements RegisterUserGateway {
    constructor(private userRepository: UserRepository) { }

    execute(user: User): Promise<User> {
        const entity: UserEntity = UserMapper.toUserEntity(user);
        return this.userRepository.save(entity);
    }
}
