export class DateTimeHelper {
    private static timeZoneOffsetInHours = 180 * 60 * 1000;

    static toLocalISOString(date: Date): string {
        const localDate = new Date(date.getTime() - DateTimeHelper.timeZoneOffsetInHours);
        const isoString = localDate.toISOString();
        return isoString.split('.')[0].replace('T', ' ');
    }
}
