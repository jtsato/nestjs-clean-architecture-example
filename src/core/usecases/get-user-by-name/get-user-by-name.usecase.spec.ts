import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { CatchExceptionHelper } from '~/test/helpers';
import { NotFoundException } from '@/core/exceptions';
import { User } from '@/core/models';
import { IGetUserByNameGateway } from '@/core/usecases/xcutting';
import { GetUserByNameQuery, GetUserByNameUseCase, IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { Optional } from '@/core/commons/optional';

const gateway: MockProxy<IGetUserByNameGateway> = mock<IGetUserByNameGateway>();
const usecase: IGetUserByNameUseCase = new GetUserByNameUseCase(gateway);

describe('GetUserByNameUseCase', () => {
    beforeEach(() => {
        mockReset(gateway);
    });

    describe('execute()', () => {
        it('should throw an error when the user is not found', async () => {
            // Arrange
            gateway
                .execute
                .calledWith('jszero')
                .mockResolvedValue(Optional.empty());

            const query: GetUserByNameQuery = new GetUserByNameQuery('jszero');

            // Act
            const exception: NotFoundException = await CatchExceptionHelper.catchAsync(() => usecase.execute(query));

            // Assert
            expect(exception).not.toBeNull();
            expect(exception.message).toBe('validation.user.name.not.found');
            expect(exception.parameters).not.toBeNull();
            expect(exception.parameters).toHaveLength(1);
            expect(exception.parameters[0]).toBe('jszero');
        });

        it('should return the user when the user is found', async () => {
            // Arrange
            gateway
                .execute
                .calledWith('jszero')
                .mockResolvedValue(Optional.of(new User(
                    1,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                )));

            const query: GetUserByNameQuery = new GetUserByNameQuery('jszero');

            // Act
            const user: User = await usecase.execute(query);

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
});
