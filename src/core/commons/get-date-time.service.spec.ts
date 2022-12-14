import { IGetDateTimeService, GetDateTimeService } from '@/core/commons';

describe('GetDateTimeService, now()', () => {
    it('should return the current date', () => {
        // Arrange
        const service: IGetDateTimeService = new GetDateTimeService();

        // Act
        const date: Date = service.now();

        // Assert
        expect(date).not.toBeNull();
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });
});
