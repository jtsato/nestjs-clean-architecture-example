/* eslint-disable sonarjs/no-duplicate-string */
import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { NotFoundException } from '@/core/exceptions';
import { GetUserByNameQuery, IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameController } from '@/web-api/entrypoints/get-user-by-name';
import { UserResponse } from '@/web-api/xcutting';
import { CatchExceptionHelper, dataObjectMatcher } from '~/test/helpers';
import { User } from '@/core/models';

const usecase: MockProxy<IGetUserByNameUseCase> = mock<IGetUserByNameUseCase>();

describe('GetUserByNameController', () => {
    let controller: GetUserByNameController;

    beforeEach(async () => {
        mockReset(usecase);
        const app: TestingModule = await Test.createTestingModule({
            controllers: [GetUserByNameController],
            providers: [
                {
                    provide: IGetUserByNameUseCase,
                    useValue: usecase,
                },
            ],
        }).compile();

        controller = app.get<GetUserByNameController>(GetUserByNameController);
    });

    describe('execute()', () => {
        it('should return user response when user is registered', async () => {
            // Arrange
            usecase
                .execute
                .calledWith(dataObjectMatcher(new GetUserByNameQuery('jszero')))
                .mockResolvedValue(new User(
                    1,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                ));

            // Act
            const user = await controller.execute('jszero');

            // Assert
            expect(user).not.toBeNull();
            expect(user).toBeInstanceOf(UserResponse);

            const expected = {
                id: 1,
                name: 'jszero',
                email: 'john.smith.zero@xyz.com',
                password: 'P@ssw0rd',
                fullName: 'John Smith Zero',
                createdAt: '2022-12-27 00:00:00',
            };

            expect(JSON.stringify(user)).toBe(JSON.stringify(expected));
        });

        it('should throw NotFoundException when user is not registered', async () => {
            // Arrange
            usecase
                .execute
                .calledWith(dataObjectMatcher(new GetUserByNameQuery('unknown')))
                .mockRejectedValue(new NotFoundException('validation.user.name.not.found {}', ['unknown']));

            // Act
            const exception: NotFoundException = await CatchExceptionHelper.catchAsync(() => controller.execute('unknown'));

            // Assert
            expect(exception).not.toBeNull();
            expect(exception.message).toBe('validation.user.name.not.found {}');
            expect(exception.Parameters).not.toBeNull();
            expect(exception.Parameters).toHaveLength(1);
            expect(exception.Parameters[0]).toBe('unknown');
        });
    });
});
