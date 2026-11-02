import { daysOverdue } from './dates.js';

// Which reminder email (if any) an unpaid invoice should get on `asOf`.
export function reminderFor(invoice, asOf) {
  if (invoice.paidAt) return null;
  const days = daysOverdue(invoice.dueDate, asOf);
  if (days === 0) return null;
  if (days <= 7) return 'friendly';
  if (days <= 30) return 'firm';
  return 'final';
}
