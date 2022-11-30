import { User } from '@/core/models';

export class UserRepository {
    public static users: Array<User> = [];

    public save(user: User): Promise<User> {
        const nextId = UserRepository.users.length + 1;
        UserRepository.users.push(
            {
                id: nextId,
                ...user,
            },
        );
        return Promise.resolve(user);
    }

    public findByName(name: string): Promise<User> {
        const user = UserRepository.users.find((element) => element.name === name);
        return Promise.resolve(user);
    }
}
