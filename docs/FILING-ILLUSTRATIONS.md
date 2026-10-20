# Step 5: clearer filing illustrations

Approved for GitHub publication by the owner on 20 October 2026.

## Story

Follow the same fictional document used in the approved WhatsApp workflow:

- File: Sharma_GST_Sep.pdf.
- Client: Sharma Traders.
- Service: GST.
- Document type: GST Return.
- Period: September 2026.

The filename is shown once above four connected filing details. The old AE/MC/RS initials, unrelated service chips and isolated month chips have been replaced with client and service folders, a PDF sheet and a calendar with the year included.

## Presentation

- Four columns on desktop, two on tablets, and compact illustration/text rows on phones.
- Readable field names and values, with a short explanation for each.
- Illustrations are native HTML/CSS and decorative for accessibility; the actual record values remain ordinary readable text.
- One illustrative-record note identifies the example.
- Existing section reveals, themes and the Step 4 frame tokens are retained.

## Scope

Only the four filing-detail illustrations and their immediate example copy are changed. The separate quick-demo section, hero, scroll workflow, pricing, product claims and use-case grouping are unchanged.

Sources: `scripts/filing-context.mjs`, `scripts/filing-context.css`, `scripts/home.mjs`, `scripts/render.mjs`.

Build: `node scripts/render.mjs`. No tests were added or run. Visual previews are provided on localhost.
