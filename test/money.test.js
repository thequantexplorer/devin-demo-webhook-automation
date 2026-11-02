import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatCents, percentOf } from '../src/money.js';

test('formats cents as dollars', () => {
  assert.equal(formatCents(0), '$0.00');
  assert.equal(formatCents(2500), '$25.00');
  assert.equal(formatCents(48005), '$480.05');
  assert.equal(formatCents(-199), '-$1.99');
});

test('percentOf rounds to the nearest cent', () => {
  assert.equal(percentOf(48000, 5), 2400);
  assert.equal(percentOf(333, 5), 17);
});
