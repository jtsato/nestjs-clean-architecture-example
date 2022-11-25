import { User } from '@/core/models';
import { UserEntity } from '@/infra/models';

export class UserMapper {
    public static toUserEntity(user: User): UserEntity {
        if (!user) { return null; }
        return new UserEntity(
            user.id,
            user.name,
            user.email,
            user.password,
            user.fullName,
            user.createdAt,
        );
    }

    public static toUser(userEntity: UserEntity): User {
        if (!userEntity) { return null; }
        return new User(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.password,
            userEntity.fullName,
            userEntity.createdAt,
        );
    }
}
