import { User } from '@/core/models';
import { UserResponse } from '@/web-api/xcutting';

export class UserPresenter {
    static of(user: User): UserResponse {
        return new UserResponse(
            user.id,
            user.name,
            user.email,
            user.password,
            user.fullName,
            user.createdAt.toISOString(),
        );
    }
}
