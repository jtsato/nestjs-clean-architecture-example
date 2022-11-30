import { User } from '@/core/models';
import { UserRepository } from '@/infra/repositories';
import { GetUserByNameProvider, RegisterUserProvider } from '@/infra/providers';

const repository = new UserRepository();
const registerUserProvider = new RegisterUserProvider(repository);
const getUserByNameProvider = new GetUserByNameProvider(repository);

describe('GetUserByNameProvider, execute()', () => {
    it('should return null when user is not found', async () => {
        // Arrange
        // Act
        const userEntity = await getUserByNameProvider.execute('unknown');

        // Assert
        expect(userEntity).toBeNull();
    });

    it('should return user entity when provider is invoked', async () => {
        // Arrange
        await registerUserProvider.execute(new User(
            1,
            'jszero',
            'john.smith.zero@xyz.com',
            'P@ssw0rd',
            'John Smith Zero',
            new Date(2022, 11, 27, 0, 0, 0),
        ));

        // Act
        const user = await getUserByNameProvider.execute('jszero');

        // Assert
        expect(user).not.toBeNull();
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(1);
        expect(user.name).toBe('jszero');
        expect(user.email).toBe('john.smith.zero@xyz.com');
        expect(user.password).toBe('P@ssw0rd');
        expect(user.fullname).toBe('John Smith Zero');
        expect(user.createdAt).toBeInstanceOf(Date);
        expect(user.createdAt).toEqual(new Date(2022, 11, 27, 0, 0, 0));
    });
});
