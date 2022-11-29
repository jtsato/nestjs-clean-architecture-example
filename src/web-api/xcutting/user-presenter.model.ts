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
            this.toLocalISOString(user.createdAt),
        );
    }

    static toLocalISOString(date: Date): string {
        const offsetInHours = date.getTimezoneOffset() * 60 * 1000;
        const localDate = new Date(date.getTime() - offsetInHours);
        const isoString = localDate.toISOString();
        return isoString.split('.')[0].replace('T', ' ');
    }
}
