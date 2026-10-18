# Step 10: monthly billing clarity

Approved for GitHub publication by the owner on 18 October 2026.

## Confirmed by the owner

- ₹999 per month includes 3 seats and 20GB.
- ₹500 per additional seat per month.
- ₹500 per additional 50GB per month.
- All displayed prices include GST.
- Additions are charged immediately, proportionally to the time left in the existing monthly cycle.
- Seat/storage reductions take effect at the next renewal.
- Cancellation stops the next renewal; access continues until the paid period ends.
- Storage usage must fit the lower limit before reducing storage.

The owner explicitly selected “Yes, use these rules” after separately confirming GST-inclusive pricing.

## Presentation

- GST notes next to the base price and monthly calculator estimate.
- A billing guide under the pricing cards, plus a collapsible worked example.
- Matching FAQ answers generated from the same billing content module.
- The calculator remains a full monthly estimate, not an immediate-change charge calculator.

Example: add one seat and 50GB, with 15 days left in a 30-day cycle. The additions are ₹1,000 per month; ₹1,000 × 15/30 = ₹500 for the remaining time. From the next renewal, the full configuration is ₹999 + ₹500 + ₹500 = ₹1,999/month. All figures include GST.

## Scope

This step implements website explanations. It does not implement subscription provisioning, billing enforcement, payment collection or invoices. No GST rate, refund promise, cancellation data-retention policy, late-payment rule or detailed usage-measurement convention is inferred.

Sources: `scripts/billing.mjs`, `scripts/pricing.mjs`, `scripts/pricing.css`, `scripts/pricing.js`, `scripts/home.mjs`.

Build: `node scripts/render.mjs`. No tests were added or run.
