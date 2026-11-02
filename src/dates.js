const DAY_MS = 24 * 60 * 60 * 1000;

// Parses an ISO date ("2026-03-15") or timestamp ("2026-03-15T16:42:00Z").
export function toDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }
  return date;
}

// True when a payment made at `paidAt` is after the invoice's due date.
export function isAfterDueDate(dueDate, paidAt) {
  return toDate(paidAt) > toDate(dueDate);
}

// Whole days between the due date and `asOf`, or 0 if not overdue yet.
export function daysOverdue(dueDate, asOf) {
  if (!isAfterDueDate(dueDate, asOf)) return 0;
  return Math.ceil((toDate(asOf) - toDate(dueDate)) / DAY_MS);
}
