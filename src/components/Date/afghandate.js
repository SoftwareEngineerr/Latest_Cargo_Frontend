export function formatAfghanDate(gregorianDate) {
  try {
    if (!gregorianDate) return '--';

    const event = new Date(gregorianDate);

    const arr = [
      'دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت', 'خرداد',
      'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'
    ];

    const convertmonths = [
      'جدی', 'دلو', 'حوت', 'حمل', 'ثور', 'جوزا',
      'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس'
    ];

    const locale = 'fa-IR';

    // Afghan date
    const monthName = event.toLocaleDateString(locale, { month: 'long' });
    const formattedDate = event.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const monthIndex = arr.indexOf(monthName);
    const afghanDate =
      monthIndex === -1
        ? formattedDate
        : formattedDate.replace(monthName, convertmonths[monthIndex]);

    // ✅ Gregorian date (DD-MM-YYYY)
    const day = event.getDate();
    const month = event.getMonth() + 1;
    const year = event.getFullYear();
    const gregorianFormatted = `${day}-${month}-${year}`;

    return `(${afghanDate}) / (${gregorianFormatted})`;

  } catch (e) {
    console.error('formatAfghanDate error:', e);
    return '--';
  }
}
