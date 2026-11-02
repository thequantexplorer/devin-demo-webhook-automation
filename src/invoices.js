import { isAfterDueDate } from './dates.js';
import { percentOf } from './money.js';

export const LATE_FEE_PERCENT = 5;
export const MIN_LATE_FEE_CENTS = 2500;

export function subtotal(invoice) {
  return invoice.lines.reduce((sum, line) => sum + line.unitCents * line.quantity, 0);
}

export function tax(invoice) {
  return percentOf(subtotal(invoice), invoice.taxPercent ?? 0);
}

export function lateFee(invoice) {
  if (!invoice.paidAt) return 0;
  if (!isAfterDueDate(invoice.dueDate, invoice.paidAt)) return 0;
  const base = subtotal(invoice) + tax(invoice);
  return Math.max(percentOf(base, LATE_FEE_PERCENT), MIN_LATE_FEE_CENTS);
}

export function invoiceTotal(invoice) {
  const sub = subtotal(invoice);
  const taxCents = tax(invoice);
  const fee = lateFee(invoice);
  return { subtotal: sub, tax: taxCents, lateFee: fee, total: sub + taxCents + fee };
}
