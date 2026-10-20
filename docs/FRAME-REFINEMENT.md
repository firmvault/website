# Step 4: coordinated outer frames

Approved for GitHub publication by the owner on 20 October 2026.

## Treatment

- One 8px outer corner radius for the film, FirmVault dashboard, pricing panels, billing guide, document-controls panel, capability cards and enquiry panel.
- 6px corners at phone widths up to 600px.
- One theme-aware, fine border treatment across these frames.
- Soft contact and ambient shadows for static panels; one additional level for the floating dashboard.
- Matching header surfaces and dividers on the film window and FirmVault dashboard.
- Preserve the base pricing card's blue top edge.
- Informational capability cards keep their resting frame when hovered.

## Preserved

WhatsApp's window, chat bubbles, wallpaper and composer; paper/document illustrations; button shapes; typography; content; layouts; floating and scroll motion; video framing, playback and pointer behaviour; light/dark/system selection.

The work changes presentation through shared CSS tokens and scoped frame selectors. Film viewing on phones remains a separate Step 6 task. Illustration content remains Step 5.

## Files

- `scripts/frames.css`: frame tokens and component mapping.
- `scripts/render.mjs`: stylesheet assembly.
- `dist/styles.css`: generated CSS.

Build: `node scripts/render.mjs`. No tests were added or run. Visual preview is provided on localhost for approval.
