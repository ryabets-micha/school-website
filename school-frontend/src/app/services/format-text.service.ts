export class FormatTextService {

  private static formatDayOrMonth(num: number) {
    return num < 9 ? '0' + num : num;
  }

  public static formatTextLength(text: string, maxLength: number): string {
    if (text.length > maxLength) return text.slice(0, 10) + '...';
    return text;
  }

  public static formatDate(date: string): string {
    const targetDate = new Date(date);
    return `${FormatTextService.formatDayOrMonth(targetDate.getDate())}.${FormatTextService.formatDayOrMonth(targetDate.getMonth()+1)}.${targetDate.getFullYear()}`;
  }
}
