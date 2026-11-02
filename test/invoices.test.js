import { test } from 'node:test';
import assert from 'node:assert/strict';
import { invoiceTotal, lateFee } from '../src/invoices.js';

const invoice = (overrides = {}) => ({
  id: 'INV-T1',
  customer: 'Test Co',
  dueDate: '2026-03-15',
  paidAt: null,
  taxPercent: 10,
  lines: [{ description: 'Service', unitCents: 10000, quantity: 3 }],
  ...overrides,
});

test('adds subtotal and tax', () => {
  const t = invoiceTotal(invoice({ paidAt: '2026-03-01T09:00:00Z' }));
  assert.deepEqual(t, { subtotal: 30000, tax: 3000, lateFee: 0, total: 33000 });
});

test('no late fee when paid before the due date', () => {
  assert.equal(lateFee(invoice({ paidAt: '2026-03-14T22:10:00Z' })), 0);
});

test('no late fee while unpaid', () => {
  assert.equal(lateFee(invoice()), 0);
});

test('late fee is 5% of subtotal plus tax when paid after the due date', () => {
  const big = invoice({ paidAt: '2026-03-20T10:00:00Z', lines: [{ description: 'Big', unitCents: 100000, quantity: 1 }] });
  assert.equal(lateFee(big), 5500);
});

test('late fee has a $25.00 minimum', () => {
  assert.equal(lateFee(invoice({ paidAt: '2026-03-18T10:00:00Z' })), 2500);
});
