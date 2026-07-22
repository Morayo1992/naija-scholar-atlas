import { differenceInCalendarDays, format, isPast, isWithinInterval, addDays } from "date-fns";

export function formatDeadline(iso: string) {
  return format(new Date(iso), "d MMM yyyy");
}

export function daysUntil(iso: string) {
  return differenceInCalendarDays(new Date(iso), new Date());
}

export function isClosingSoon(iso: string) {
  const days = daysUntil(iso);
  return days >= 0 && days <= 14;
}

export function isExpired(iso: string) {
  return isPast(new Date(iso));
}

export function deadlineLabel(iso: string) {
  const days = daysUntil(iso);
  if (days < 0) return "Deadline passed";
  if (days === 0) return "Closes today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

export function isWithinNextDays(iso: string, days: number) {
  const date = new Date(iso);
  const now = new Date();
  return isWithinInterval(date, { start: now, end: addDays(now, days) });
}
