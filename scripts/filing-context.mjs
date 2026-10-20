// The same fictional record used in the approved WhatsApp workflow.
export function filingContextSection(icon) {
  const fields = [
    {kind:'client', label:'Client', value:'Sharma Traders', description:'The client this record belongs to.', art:'<div class="filing-folder"><span class="filing-folder-sheet"></span><span class="filing-folder-front"></span></div>'},
    {kind:'service', label:'Service', value:'GST', description:'The work the document belongs to.', art:'<div class="filing-service-folder"><span class="filing-service-parent"></span><span class="filing-service-front">GST</span></div>'},
    {kind:'type', label:'Document type', value:'GST Return', description:'A return, rather than a statement or agreement.', art:'<div class="filing-paper"><span class="filing-pdf-mark">PDF</span><span class="filing-paper-rule"></span><span class="filing-paper-rule"></span></div>'},
    {kind:'period', label:'Period', value:'September 2026', description:'The month this example record covers.', art:'<div class="filing-calendar"><span class="filing-calendar-year">2026</span><strong>SEP</strong><span class="filing-calendar-line"></span></div>'}
  ];
  return `<section class="structure-section section-space" id="filing-context" aria-labelledby="filing-context-title"><div class="container">
<div class="structure-header reveal"><p class="eyebrow">THE DETAILS MAKE THE DIFFERENCE</p><h2 id="filing-context-title">A filename is a start.<br><span class="muted-heading">Context makes it useful.</span></h2><p class="section-description">Four filing details give the same document its place.</p></div>
<div class="filing-example-file reveal"><span class="filing-file-icon" aria-hidden="true">${icon('file')}</span><div><strong>Sharma_GST_Sep.pdf</strong><span>Forwarded from WhatsApp</span></div></div>
<div class="context-grid filing-grid">${fields.map(field=>`<article class="context-item filing-item reveal"><div class="filing-visual filing-${field.kind}" aria-hidden="true">${field.art}</div><div class="filing-detail"><p class="filing-label">${field.label}</p><h3>${field.value}</h3><p class="filing-description">${field.description}</p></div></article>`).join('')}</div>
<p class="filing-example-note">Illustrative record, matching the WhatsApp workflow above.</p>
</div></section>`;
}
