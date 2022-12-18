export class DateTimeHelper {
    static toLocalISOString(date: Date): string {
        const offsetInHours = date.getTimezoneOffset() * 60 * 1000;
        const localDate = new Date(date.getTime() - offsetInHours);
        const isoString = localDate.toISOString();
        return isoString.split('.')[0].replace('T', ' ');
    }
}
