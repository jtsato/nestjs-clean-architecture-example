import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { NotFoundException } from '@/core/exceptions';
import { User } from '@/core/models';
import { CatchExceptionHelper } from '~/test/helpers';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { IGetUserByNameUseCase, GetUserByNameQuery, GetUserByNameUseCase } from '@/core/usecases/get-user-by-name';

const getUserByNameGatewayMock: MockProxy<GetUserByNameGateway> = mock<GetUserByNameGateway>();

const usecase: IGetUserByNameUseCase = new GetUserByNameUseCase(getUserByNameGatewayMock);

describe('GetUserByNameUseCase', () => {
    beforeEach(() => {
        mockReset(getUserByNameGatewayMock);
    });

    describe('execute()', () => {
        it('should throw an error when the user is not found', async () => {
            // Arrange
            getUserByNameGatewayMock
                .execute
                .calledWith('jszero')
                .mockResolvedValue(null);

            const query: GetUserByNameQuery = new GetUserByNameQuery('jszero');

            // Act
            const exception: NotFoundException = await CatchExceptionHelper.catchAsync(() => usecase.execute(query));

            // Assert
            expect(exception).not.toBeNull();
            expect(exception.message).toBe('validation.user.name.not.found {}');
            expect(exception.Parameters).not.toBeNull();
            expect(exception.Parameters).toHaveLength(1);
            expect(exception.Parameters[0]).toBe('jszero');
        });

        it('should return the user when the user is found', async () => {
            // Arrange
            getUserByNameGatewayMock
                .execute
                .calledWith('jszero')
                .mockResolvedValue(new User(
                    1,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                ));

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
            expect(user.fullName).toBe('John Smith Zero');
            expect(user.createdAt).toBeInstanceOf(Date);
            expect(user.createdAt).toEqual(new Date(2022, 11, 27, 0, 0, 0));
        });
    });
});
