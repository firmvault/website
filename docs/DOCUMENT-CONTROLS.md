# Step 8: document controls

Approved for GitHub publication by the owner on 18 October 2026.

## Evidence

The owner answered “yes” when asked whether these controls are implemented today:

- Group/client access permissions.
- An audit log.
- Encryption in transit and at rest.
- Configurable document retention.

This is owner confirmation of the control categories, not an independent inspection of the application. Existing workspace material contains marketing descriptions and illustrative website interfaces, not backend implementation evidence.

## Copy boundaries

- Describe access at group and client level, without inventing role names or permitted actions.
- Say “recorded activity”; no claim that every action is logged. Specific event coverage is still unspecified.
- State encryption in transit and at rest, without algorithms, key management details or end-to-end encryption claims.
- State configurable retention, without inventing periods, deletion schedules, backup policies or recovery guarantees.
- No certifications, compliance badges, uptime or absolute security promises.

## Presentation

- Replace the generic Security first card with a dedicated document-controls section between pricing and About.
- Present four concise definitions in one panel, with a link to discuss requirements during a demo.
- Use the same definitions on the About page.
- Remove “Audit trail of every action” from the earlier capability summary.
- Keep the approved hero, motion, pricing and themes intact.

## Build

`node scripts/render.mjs` generates the static pages and stylesheet. No tests were added or run for this copy and presentation step.
