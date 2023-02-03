 export function convertDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  export function daysFromNow(date: string): number {
    const d = new Date(date);
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  export function timeTillMidnight(): string {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    return new Date(diff).toISOString().substr(11, 8);
  }

 const today = new Date();
  const months = {
    'Jan': 0,
    'Feb': 1,
    'Mar': 2,
    'Apr': 3,
    'May': 4,
    'Jun': 5,
    'Jul': 6,
    'Aug': 7,
    'Sep': 8,
    'Oct': 9,
    'Nov': 10,
    'Dec': 11,
  }

 export function convertDateToString(date: string): string {
    const month_tmp = date.split(' ')[1];
    const month = months[month_tmp as keyof typeof months];
    const day_tmp = date.split(' ')[2];
    const day = parseInt(day_tmp);
    const year = today.getFullYear();

    const d = new Date(year, month, day);
    return d.toLocaleDateString();
  }

