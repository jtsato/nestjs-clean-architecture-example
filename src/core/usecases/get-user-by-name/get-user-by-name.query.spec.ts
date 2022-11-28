import { ValidationException } from '@/core/exceptions';
import { CatchExceptionHelper } from '~/test/helpers';
import { GetUserByNameQuery } from '@/core/usecases/get-user-by-name';

describe('GetUserByNameQuery', () => {
    describe('constructor()', () => {
        it('should throw an error when the query has empty parameters', () => {
            // Arrange
            const errors = {
                name: 'validation.user.name.blank',
            };

            // Act
            const exception: ValidationException = CatchExceptionHelper
                .catch(() => new GetUserByNameQuery(null));

            // Assert
            expect(exception).not.toBeNull();
            expect(exception.message).toBe('common.validation.alert');
            expect(exception.Parameters).not.toBeNull();
            expect(exception.Parameters).toHaveLength(2);
            expect(exception.Parameters[1]).toEqual(errors);
        });

        it('should create query object when the parameters are filled correcly', () => {
            // Arrange
            // Act
            const query: GetUserByNameQuery = new GetUserByNameQuery('jszero');

            // Assert
            expect(query).not.toBeNull();
            expect(query.name).toBe('jszero');
        });
    });
});
