import { ValidationException } from '@/core/exceptions';
import { CatchExceptionHelper } from '~/test/helpers';
import { GetUserByNameQuery, GetUserByNameQueryValidator } from '@/core/usecases/get-user-by-name';

describe('GetUserByNameQuery, constructor()', () => {
    const singletonSpy = jest.spyOn(GetUserByNameQueryValidator as any, 'createInstance');

    it('should throw an error when the query has empty parameters', () => {
        // Arrange
        const errors = {
            name: 'validation.user.name.blank',
        };

        // Act
        const exception: ValidationException = CatchExceptionHelper
            .catch(() => new GetUserByNameQuery(null));

        // Assert
        expect(singletonSpy).toHaveBeenCalledTimes(1);

        expect(exception).not.toBeNull();
        expect(exception.message).toBe('common.validation.alert');
        expect(exception.parameters).not.toBeNull();
        expect(exception.parameters).toHaveLength(2);
        expect(exception.parameters[1]).toEqual(errors);
    });

    it('should create query object when the parameters are filled correcly', () => {
        // Arrange
        // Act
        const query: GetUserByNameQuery = new GetUserByNameQuery('jszero');

        // Assert
        expect(singletonSpy).toHaveBeenCalledTimes(1);

        expect(query).not.toBeNull();
        expect(query.name).toBe('jszero');
    });
});
