import { User } from '@/core/models';
import { UserRepository } from '@/infra/repositories';
import { RegisterUserProvider } from '@/infra/providers';

const repository = new UserRepository();
const provider = new RegisterUserProvider(repository);

describe('RegisterUserProvider, execute()', () => {
    it('should return user entity when provider is invoked', async () => {
        // Arrange
        // Act
        const user = await provider.execute(new User(
            1,
            'jszero',
            'john.smith.zero@xyz.com',
            'P@ssw0rd',
            'John Smith Zero',
            new Date(2022, 11, 27, 0, 0, 0),
        ));

        // Assert
        expect(user).not.toBeNull();
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(1);
        expect(user.name).toBe('jszero');
        expect(user.email).toBe('john.smith.zero@xyz.com');
        expect(user.password).toBe('P@ssw0rd');
        expect(user.fullName).toBe('John Smith Zero');
        expect(user.createdAt).toBeInstanceOf(Date);
        expect(user.createdAt).toEqual(new Date(2022, 11, 27, 0, 0, 0));
    });
});
