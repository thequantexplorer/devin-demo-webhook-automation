import { readFileSync } from 'node:fs';

const DATA_URL = new URL('../data/invoices.json', import.meta.url);

export function loadInvoices() {
  return JSON.parse(readFileSync(DATA_URL, 'utf8'));
}

export function findInvoice(id) {
  return loadInvoices().find((invoice) => invoice.id === id) ?? null;
}
