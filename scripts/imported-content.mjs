// Page copy supplied in FirmVault.html, with approved pricing updates.
export { pricingSection } from './pricing.mjs';

export function capabilitiesSection(icon) {
  const cases = [
    {icon:'chat', title:'Client onboarding', copy:'Forward ID records and agreements from WhatsApp. File each document under the right client, ready for the work ahead.'},
    {icon:'folder', title:'Recurring client work', copy:'Keep returns, statements and reports organised by client, service, document type and period.'},
    {icon:'search', title:'Client requests', copy:'Ask for a document on WhatsApp and retrieve the same file when a client or colleague needs it.'}
  ];
  return `<section class="capabilities-section section-space use-cases-section" aria-labelledby="use-cases-title"><div class="container"><div class="structure-header reveal"><p class="eyebrow">EVERYDAY USE CASES</p><h2 id="use-cases-title">Built for the way<br><span class="muted-heading">your firm works.</span></h2></div><div class="capability-grid use-case-grid">${cases.map(item=>`<article class="capability-card use-case-card reveal">${icon(item.icon)}<div class="use-case-copy"><h3>${item.title}</h3><p>${item.copy}</p></div></article>`).join('')}</div></div></section>`;
}

export { aboutSection } from './about.mjs';

export function quickDemoSection(icon) {
  return `<section class="quick-demo-section section-space" id="quick-demo"><div class="container"><div class="structure-header reveal"><p class="eyebrow">A DAY OF DOCUMENTS</p><h2>Watch a day of documents<br><span class="muted-heading">file themselves.</span></h2><p class="section-description">Documents land from WhatsApp, wait in Pending if unlabelled, get filed to the right client, and come back on request.</p></div><div class="context-grid demo-content-grid"><article class="context-item reveal"><span class="context-number">01 / RECEIVED</span><div class="context-illustration type-illustration" aria-hidden="true">${icon('chat')}</div><h3>Received on WhatsApp</h3><p>Sharma_GST_Sep.pdf<br>GST · Sharma Traders</p></article><article class="context-item reveal"><span class="context-number">02 / REVIEW</span><div class="context-illustration type-illustration" aria-hidden="true">${icon('clock')}</div><h3>Pending queue</h3><p>PAN_scan.jpg<br>KYC · unknown client</p></article><article class="context-item reveal"><span class="context-number">03 / FILED</span><div class="context-illustration type-illustration" aria-hidden="true">${icon('folder')}</div><h3>Filed to client vault</h3><p>HDFC_bank_stmt.pdf<br>Bank · Patil & Co</p></article><article class="context-item reveal"><span class="context-number">04 / RETRIEVED</span><div class="context-illustration type-illustration" aria-hidden="true">${icon('check')}</div><h3>Sent back on WhatsApp</h3><p>Partner asked on a call.<br>The record comes back on request.</p></article></div><div class="demo-content-footer"><p>Illustrative document examples with fictional records.</p><a class="text-link" href="#how-it-works">Watch the document journey ${icon('arrow')}</a></div></div></section>`;
}
