import { DateTimeHelper } from './date-time.helper';

describe('DateTimeHelper, toLocalISOString()', () => {
    it('should format to local ISO string when date is valid', () => {
        // Arrange
        // Act
        // Assert
        expect(DateTimeHelper.toLocalISOString(
            new Date('2019-12-31 00:00:00'),
        )).toEqual('2019-12-31 00:00:00');

        expect(DateTimeHelper.toLocalISOString(
            new Date('2020-02-01 00:00:00'),
        )).toEqual('2020-02-01 00:00:00');

        expect(DateTimeHelper.toLocalISOString(
            new Date('1980-04-23 15:00:00'),
        )).toEqual('1980-04-23 15:00:00');
    });
});
