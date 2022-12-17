import { DateTimeHelper } from '@/core/commons/helpers';
import { User } from '@/core/models';
import { UserResponse } from '@/web-api/xcutting';

export class UserPresenter {
    static of(user: User): UserResponse {
        return new UserResponse(
            user.id,
            user.name,
            user.email,
            user.password,
            user.fullname,
            DateTimeHelper.toLocalISOString(user.createdAt),
        );
    }
}
