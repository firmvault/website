import { documentControlsList } from './document-controls.mjs';

// Company identity and contact details already supplied for the website.
const company = {
  name: 'Nexosk Group Private Limited',
  location: 'Pune, India',
  email: 'contact@nexosk.in'
};

function companyPanel(icon, heading = 'h3') {
  return `<div class="about-company-panel"><p class="about-company-label">Developed by</p><${heading} id="about-company-name">${company.name}</${heading}><dl class="about-company-facts"><div><dt>Product</dt><dd>FirmVault</dd></div><div><dt>Based in</dt><dd>${company.location}</dd></div></dl><a class="about-company-email" href="mailto:${company.email}">${company.email} ${icon('arrow-up')}</a></div>`;
}

export function aboutSection(icon) {
  return `<section class="about-product-section section-space" id="about-product" aria-labelledby="about-product-title"><div class="container about-company-layout"><div class="about-company-intro reveal"><p class="eyebrow">ABOUT FIRMVAULT</p><h2 id="about-product-title">The company<br><span class="muted-heading">behind FirmVault.</span></h2><p class="section-description">FirmVault connects WhatsApp document intake with a dashboard for filing, organisation and retrieval. A shared document workspace for professionals and their teams.</p><a class="text-link about-company-more" href="/about/">More about FirmVault ${icon('arrow')}</a></div><div class="reveal">${companyPanel(icon)}</div></div></section>`;
}

export function renderAboutPage(icon, arrow) {
  return `<main id="main" class="editorial-main about-page"><div class="container"><section class="about-page-intro" aria-labelledby="about-page-title"><div><p class="eyebrow">ABOUT FIRMVAULT</p><h1 id="about-page-title">FirmVault.<br><span class="accent">By Nexosk.</span></h1><p class="about-page-lead">A document intake, filing and retrieval platform for professionals and their teams.</p></div>${companyPanel(icon, 'h2')}</section><div class="about-page-content"><section class="about-page-section" aria-labelledby="about-scope-title"><h2 id="about-scope-title">One workspace, two ways in.</h2><p>WhatsApp connects your team to FirmVault’s document workflow. The dashboard gives your firm a central view of its records.</p><dl class="about-scope-list"><div><dt>WhatsApp assistant</dt><dd>Forward documents to FirmVault, supply their filing details and request a filed record when you need it.</dd></div><div><dt>FirmVault dashboard</dt><dd>View the firm’s document vault and the client, service, document type and period attached to each record.</dd></div></dl></section><section class="about-page-section" aria-labelledby="about-controls-title"><h2 id="about-controls-title">Clear controls for your documents.</h2><p>Manage document access, review recorded activity and set retention for your firm.</p>${documentControlsList()}</section><section class="about-page-section about-page-demo" aria-labelledby="about-demo-title"><h2 id="about-demo-title">Talk through your workflow.</h2><p>Arrange a 15-minute walkthrough of WhatsApp intake, filing and retrieval. Share how your team works so we can discuss the setup, access and storage you need.</p><a class="button" href="/book-demo/">Book a demo ${arrow}</a></section></div></div></main>`;
}
