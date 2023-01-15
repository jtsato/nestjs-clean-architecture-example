import { DateTimeHelper } from '@/core/commons/helpers';
import { User } from '@/core/models';
import { UserResponse } from '@/web-api/xcutting';

export class UserPresenter {
    static of(user: User): UserResponse {
        return new UserResponse({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            fullname: user.fullname,
            createdAt: DateTimeHelper.toLocalISOString(user.createdAt),
        });
    }
}
