# Billing rules

These rules come from Acme's customer terms. Code and tests must follow them.

1. All dates and times are in UTC.
2. An invoice's `dueDate` is a calendar day. The customer can pay any time on that day, up to 23:59:59 UTC, without a late fee.
3. A payment made after the due date gets a late fee of 5% of the subtotal plus tax, with a minimum of $25.00.
4. Unpaid invoices get reminder emails, starting the day after the due date:
   - 1 to 7 days overdue: `friendly`
   - 8 to 30 days overdue: `firm`
   - more than 30 days overdue: `final`
5. Amounts are stored and calculated in integer cents.
