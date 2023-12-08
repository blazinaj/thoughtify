import {isSameDay, isSameWeek, isSameMonth, isSameYear} from "date-fns";

export const checkDate = (date1, date2, cadence) => {
  if (cadence === 'DAILY') {
    return isSameDay(date1, date2);
  }
  if (cadence === 'WEEKLY') {
    return isSameWeek(date1, date2);
  }
  if (cadence === 'MONTHLY') {
    return isSameMonth(date1, date2);
  }
  if (cadence === 'YEARLY') {
    return isSameYear(date1, date2);
  }
}