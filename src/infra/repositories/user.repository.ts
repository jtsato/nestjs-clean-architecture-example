import { User } from '@/core/models';

export class UserRepository {
    public static users: Array<User> = [];

    public save(user: User): Promise<User> {
        // eslint-disable-next-line no-param-reassign
        user.id = UserRepository.users.length + 1;
        UserRepository.users.push(user);
        return Promise.resolve(user);
    }

    public findByName(name: string): Promise<User> {
        const user = UserRepository.users.find((element) => element.name === name);
        return Promise.resolve(user);
    }
}
