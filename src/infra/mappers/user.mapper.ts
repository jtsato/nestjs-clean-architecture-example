import { User } from '@/core/models';
import { UserEntity } from '@/infra/models';

export class UserMapper {
    public static toUserEntity(user: User): UserEntity {
        return new UserEntity(
            user.id,
            user.name,
            user.email,
            user.password,
            user.fullname,
            user.createdAt,
        );
    }

    public static toUser(userEntity: UserEntity): User {
        return new User(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.password,
            userEntity.fullname,
            userEntity.createdAt,
        );
    }
}
