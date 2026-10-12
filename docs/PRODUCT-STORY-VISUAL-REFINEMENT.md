# Product story and visual refinement

Implementation date: 12 October 2026.

## Delivered

- Clear opening description of employees forwarding documents to FirmVault's WhatsApp number, followed by filing and central retrieval.
- Connected narrative using a fictional GST return and the four filing dimensions: client, service, document type, and period.
- Pending presented as a conditional review path rather than an obligatory stage or missing-document tracker.
- Separate interactive example vault with readable rows, search, Pending filter, document detail dialog, and clear-search/filter recovery.
- Audience examples for CA firms, tax consultants, and law firms without adding tax filing or case-management claims.
- Consistent homepage, FAQ, About, and demo-page messaging.
- Rebuilt visual foundation: shared spacing and motion values, responsive type, steady product panels, clearer surface separation, larger metadata, consistent controls and supporting pages.
- Desktop scene panel, compact stacked examples on tablets/phones/short screens, and a static reduced-motion presentation.
- Small once-only reveals, transform-based scene transitions, decorative-only pointer response, and animation pause for hidden/off-screen regions.
- Existing light/dark/System selection and email enquiry route preserved.

## Product evidence still required

Current visuals are illustrative website examples, not captures of the working product. Replacement real UI captures should use fictional demonstration data and show:

1. Document vault overview.
2. Four filing details.
3. Pending and its actual review action.
4. A supported search interaction and result.

Publish customer or pilot feedback only with original feedback, accurate attribution, and permission for the exact wording and any logo. There is no placeholder testimonial section in this implementation.

Confirm classification behaviour, file types, search capabilities, team access, onboarding, and support before adding related public claims. The supplied voice guide is the factual baseline for this revision.

## Source map

- `scripts/home.mjs`: homepage story and illustrative visual markup.
- `scripts/styles.css`: source visual system and responsive layouts.
- `scripts/render.mjs`: shared layout, supporting copy, build, metadata, and base-path handling.
- `dist/app.js`: browser interactions, scroll scene state, motion preferences, and enquiry preparation.
- `dist/theme.js`: initial system appearance and saved explicit theme choices.

The build generates the six pages and copies the source stylesheet into `dist/`. GitHub Pages continues to use the existing workflow and domain configuration.

## Review notes

The website builds successfully. The local preview was used to review desktop light/dark and phone compositions during refinement. Screenshots from the local preview are kept in the ignored `qa/` directory. No automated test commands were run locally and no new tests were added. The existing GitHub Actions source checks remain configured.

The demo form still prepares an email to `contact@nexosk.in`; it does not send mail from the website or reserve a calendar appointment. This iteration implements the product-story and visual-refinement plans, with real screenshots and testimonials awaiting the required inputs.
