# Devin demo: Start sessions from webhooks

**What it shows:** A help desk sends a bug ticket to a Devin [Automation](https://docs.devin.ai/product-guides/automations#webhook-triggers) with a **Webhook** trigger. The automation starts a session that fixes the bug in this repo and opens a PR. Here the "help desk" is the `ticketing` GitHub Actions workflow, so everything runs in your browser.

**Needs:** GitHub connected to your Devin org

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## The bug

Ticket `SUP-1042` ([tickets/SUP-1042.json](tickets/SUP-1042.json)): a customer paid invoice `INV-2041` on its due date, in the afternoon, and still got a late fee. [docs/billing-rules.md](docs/billing-rules.md) says any payment on the due date is on time.

```text
$ npm run invoice -- INV-2041
INV-2041  Brightline Studio
due:      2026-03-15
paid at:  2026-03-15T16:42:00Z
subtotal: $480.00
tax:      $0.00
late fee: $25.00
total:    $505.00
```

Expected: late fee `$0.00`, total `$480.00`. The tests pass today because none of them pays later on the due date.

## Set it up

1. Click **Use this template → Create a new repository**, choose your GitHub account or org as the owner, and keep the name `devin-demo-webhook-automation`. The links and prompt below assume that name. Use the template rather than a fork: pull requests on a fork go to the original repo by default.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.
3. In Devin, click **Automations** in the sidebar, then **Create automation**. Name it `Help desk tickets`. Under **Triggers**, click **Add trigger** and choose **Webhook**. Keep this tab open: the **Secret** is only shown until you create the automation.
4. In a new tab, open your repo on GitHub and go to **Settings → Secrets and variables → Actions**. Click **New repository secret** twice:
   - Name `DEVIN_WEBHOOK_URL`, value: the **Webhook URL** from Devin.
   - Name `DEVIN_WEBHOOK_SECRET`, value: the **Secret** from Devin.
5. Back in Devin, under **Agent definition**, leave **Agent type** as **Start new session**. Set **Run as** to **Creator (you)**.
6. Paste the prompt below into **Instructions**. Click **Create automation**.
7. On GitHub, open the **Actions** tab, click **ticketing** in the list on the left, then **Run workflow → Run workflow**. The run posts the ticket to your webhook and should finish green.
8. In Devin, open your automation. The ticket appears under **Events**. Click **View session** to watch Devin work.

## Prompt

Paste this into the automation's **Instructions** box. Replace `<you>` with your GitHub user or org.

```text
A help desk ticket arrives in the event payload. It reports a bug in https://github.com/<you>/devin-demo-webhook-automation.

1. Read the ticket and docs/billing-rules.md.
2. Reproduce the bug with the command in the ticket's agent_notes.
3. Fix the code. Add a regression test that uses the ticket's case.
4. Run npm test and make sure every test passes.
5. Open a pull request. Put the ticket ID in the title. In the description, explain the cause, the fix and the test.

If the ticket is not a bug in this repo, do not change any code. Reply with a short summary instead.
```

## What to expect

- The `ticketing` run shows `Devin answered with HTTP 200` and `{"status":"accepted"}`.
- The session starts with your instructions followed by a **Triggering Event** block that holds the ticket JSON.
- Devin opens a PR that fixes the due-date check in `src/dates.js` and adds a test. `npm run invoice -- INV-2041` then shows a late fee of `$0.00`.

If the workflow fails with HTTP 403, the secret is wrong. Edit the automation, regenerate the secret, and update `DEVIN_WEBHOOK_SECRET`.
