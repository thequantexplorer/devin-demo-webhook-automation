// Amounts are integer cents everywhere to avoid floating-point drift.
export function formatCents(cents) {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  return `${sign}$${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, '0')}`;
}

export function percentOf(cents, percent) {
  return Math.round((cents * percent) / 100);
}
