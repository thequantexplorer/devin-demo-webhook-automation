# acme-billing

Acme's invoicing code: invoice totals, late fees and payment reminders. Plain Node.js 20, no dependencies.

```sh
npm test
npm run invoice -- INV-2041     # print one invoice
npm run reminders -- 2026-03-20 # reminders due on a date
```

- `src/invoices.js`: subtotal, tax, late fee and total
- `src/dates.js`: due-date checks
- `src/reminders.js`: reminder tiers
- `data/invoices.json`: sample invoices
- `docs/billing-rules.md`: the billing rules the code must follow
- `tickets/`: sample help desk tickets
- `.github/workflows/ticketing.yml`: sends a ticket to a webhook (see below)

---

This repo is a starter for a Devin demo. See [DEVIN_DEMO.md](DEVIN_DEMO.md) for setup and the prompt.
