import { DateTimeHelper } from './date-time.helper';

describe('DateTimeHelper, toLocalISOString()', () => {
    it('should convert to local ISO string when date is UTC', () => {
        // Arrange
        // Act
        // Assert
        expect(DateTimeHelper.toLocalISOString(
            new Date('2019-12-31T00:00:00.000Z'),
        )).toEqual('2019-12-30 21:00:00');

        expect(DateTimeHelper.toLocalISOString(
            new Date('2020-02-01T00:00:00.000Z'),
        )).toEqual('2020-01-31 21:00:00');

        expect(DateTimeHelper.toLocalISOString(
            new Date('1980-04-23T15:00:00.000Z'),
        )).toEqual('1980-04-23 12:00:00');
    });
});
