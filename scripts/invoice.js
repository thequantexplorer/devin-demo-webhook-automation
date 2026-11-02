// Prints the bill for one invoice: npm run invoice -- INV-2041
import { invoiceTotal } from '../src/invoices.js';
import { formatCents } from '../src/money.js';
import { findInvoice } from '../src/store.js';

const id = process.argv[2];
const invoice = id && findInvoice(id);
if (!invoice) {
  console.error(`Usage: npm run invoice -- <invoice id>${id ? ` (no invoice ${id})` : ''}`);
  process.exit(1);
}

const t = invoiceTotal(invoice);
console.log(`${invoice.id}  ${invoice.customer}`);
console.log(`due:      ${invoice.dueDate}`);
console.log(`paid at:  ${invoice.paidAt ?? 'unpaid'}`);
console.log(`subtotal: ${formatCents(t.subtotal)}`);
console.log(`tax:      ${formatCents(t.tax)}`);
console.log(`late fee: ${formatCents(t.lateFee)}`);
console.log(`total:    ${formatCents(t.total)}`);
