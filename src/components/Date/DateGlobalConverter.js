let gregorianDate = new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
let arabicDate = new Date().toLocaleDateString('ar-TN-u-ca-islamic', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
let normalDate = new Date().toLocaleDateString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
let formatNormalDate = ''
export const DateGlobalConvertor = (date) => {
  const event = new Date(date.format('D MMMM YYYY'));
  
  const formatDate = (dateString) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return  `${day} ${months[monthIndex]} ${year}`;
}
  const getDt = (getparam) => {
    if (getparam === 'fa-IR') {
      const arr = ['دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'];
      const convertmonths = ['جدی', 'دلو', 'حوت', 'حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس'];

      const getMonth = event.toLocaleDateString(getparam, { month: 'long' });
      const currentDate = event.toLocaleDateString(getparam, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
      const currentDateIntoString = currentDate.toString();
      const getIndMonth = arr.indexOf(getMonth)
      return currentDateIntoString.replace(getMonth, convertmonths[getIndMonth]);
    }
    return event.toLocaleDateString(getparam, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  if (date) {
    gregorianDate = getDt('fa-IR');
    arabicDate = getDt('ar-TN-u-ca-islamic');
    formatNormalDate = formatDate(normalDate)
  }


  return {formatNormalDate, gregorianDate, arabicDate}
};
