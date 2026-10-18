# Step 9: a reachable demo enquiry

Approved for GitHub publication by the owner on 18 October 2026.

## Changes

- Shorten the introduction to one sentence explaining the 15-minute demo.
- Put the enquiry before the agenda in the source, reading and keyboard order.
- Keep the desktop presentation in two columns; stack intro, form and agenda at 900px and below.
- Keep name, firm and email visible. Put the two optional fields in a native details disclosure.
- Remove the redundant introductory labels from this page.
- Use 50px inputs, a 52px primary button, readable labels and 16px input text.
- Include email keyboard hints and disable unwanted capitalisation for the email field.
- Explain that the visitor reviews and sends a prepared email.

## Behaviour retained

All existing form IDs and field names remain available to `scripts/app.js`. The form still prepares an email to contact@nexosk.in and offers the existing copy fallback. It does not submit to a server or reserve a calendar appointment. The existing free-trial anchor remains supported.

## Source

- `scripts/booking.mjs`: enquiry markup.
- `scripts/booking.css`: layout and field refinements scoped to this page.
- `scripts/render.mjs`: template integration and stylesheet assembly.

Build: `node scripts/render.mjs`. No tests were added or run. Browser work is a visual preview; no email enquiry was submitted.
