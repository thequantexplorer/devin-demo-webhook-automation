// Lists the reminder email each unpaid invoice gets on a date: npm run reminders -- 2026-04-01
import { reminderFor } from '../src/reminders.js';
import { loadInvoices } from '../src/store.js';

const asOf = process.argv[2] ?? new Date().toISOString();
for (const invoice of loadInvoices()) {
  const reminder = reminderFor(invoice, asOf);
  if (reminder) console.log(`${invoice.id}  ${reminder}`);
}
