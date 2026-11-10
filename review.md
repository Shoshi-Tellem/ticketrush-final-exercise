# Code review: `noa/refund`

**Verdict: not ready to merge, changes requested.**

## How I checked
- Opened the branch in a separate worktree (read and run only, no edits to the code).
- Ran `node tests/run.js` → **3 passed, 4 failed**.

## Findings

### 1. Bug: the service fee is refunded (blocking)
The header comment in `js/refund.js` says *"the customer gets back 90% of the ticket price; the service fee is not refunded"*, but the code does:

```js
return qty * (TICKET_PRICE + SERVICE_FEE) * REFUND_RATE;
```

So 90% of the fee is refunded as well. For 1 ticket the result is 325.8 instead of 315, so we overpay ₪10.8 per ticket.
The branch's own tests fail on exactly this:
- `refund for 1 ticket`: expected 315, got 325.8
- `refund for 2 tickets`: expected 630, got 651.6

**Suggested fix:** `return qty * TICKET_PRICE * REFUND_RATE;`

"It works for me" doesn't hold up. The tests on this branch fail.

### 2. The branch is based on an old `main` (fix it before merging)
The two `format.test.js` failures (₪0.00) are not Noa's. They're the bug that was already fixed on `main` (revert of `perf: faster price formatting`). Before merging, update the branch from the current `main` (merge or rebase on a private branch) and re-run the tests.

### 3. Notes for later (not blocking)
- Members / students: `calcRefund` refunds by the full ticket price even when the customer paid at a discount. Decide whether the refund should be based on what was actually paid.
- There's no validation of `qty` (0, a negative number, or a non-integer).
- Floating-point money: consider rounding (`Math.round(x * 100) / 100`) to avoid values like 325.79999.

## Summary
Fix finding 1, update the branch from `main`, and make sure `node tests/run.js` passes in full. Then we can merge.
