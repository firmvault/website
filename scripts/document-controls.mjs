// Control categories confirmed by the owner on 18 October 2026.
// Audit event coverage, encryption algorithms and retention options are unspecified.
const controls = [
  ['Group and client access', 'Manage document access by group and client.'],
  ['Activity history', 'Review recorded activity in the audit trail.'],
  ['Encryption', 'Document data is encrypted in transit and at rest.'],
  ['Document retention', 'Configure how long documents are retained for your firm.']
];

export function documentControlsList() {
  return `<dl class="document-controls-grid">${controls.map(([title, description]) => `<div class="document-control"><dt>${title}</dt><dd>${description}</dd></div>`).join('')}</dl>`;
}

export function documentControlsSection(icon) {
  return `<section class="document-controls-section section-space" id="document-controls" aria-labelledby="document-controls-title"><div class="container document-controls-layout"><div class="document-controls-heading reveal"><h2 id="document-controls-title">Your documents.<br><span class="muted-heading">Clear controls.</span></h2><p class="section-description">Manage who has access, review recorded activity and set retention for your firm’s documents.</p><a class="text-link document-controls-link" href="/book-demo/">Discuss your requirements ${icon('arrow')}</a></div><div class="document-controls-panel reveal">${documentControlsList()}</div></div></section>`;
}
