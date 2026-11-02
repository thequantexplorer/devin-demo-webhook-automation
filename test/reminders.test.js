import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reminderFor } from '../src/reminders.js';

const unpaid = { id: 'INV-T2', dueDate: '2026-03-15', paidAt: null, lines: [] };

test('no reminder before the due date', () => {
  assert.equal(reminderFor(unpaid, '2026-03-10'), null);
});

test('no reminder for paid invoices', () => {
  assert.equal(reminderFor({ ...unpaid, paidAt: '2026-03-20T10:00:00Z' }, '2026-04-30'), null);
});

test('friendly, firm and final reminders by days overdue', () => {
  assert.equal(reminderFor(unpaid, '2026-03-16'), 'friendly');
  assert.equal(reminderFor(unpaid, '2026-03-22'), 'friendly');
  assert.equal(reminderFor(unpaid, '2026-03-23'), 'firm');
  assert.equal(reminderFor(unpaid, '2026-04-14'), 'firm');
  assert.equal(reminderFor(unpaid, '2026-04-15'), 'final');
});
