import { User } from '@/core/models';

export class UserRepository {
    public static users: Array<User> = [];

    public save(user: User): Promise<User> {
        const nextId = UserRepository.users.length + 1;
        const userWithId = new User(nextId, user.name, user.email, user.password, user.fullname, user.createdAt);
        UserRepository.users.push(userWithId);
        return Promise.resolve(userWithId);
    }

    public findByName(name: string): Promise<User> {
        const user = UserRepository.users.find((element) => element.name === name);
        return Promise.resolve(user);
    }
}
