// Intro → enquiry → supporting details is also the reading and keyboard order.
export function renderBooking(icon, arrow) {
  return `<main id="main" class="booking-main">
<div class="container booking-grid">
  <section class="booking-copy" aria-labelledby="demo-page-title">
    <a class="breadcrumb" href="/">${icon('arrow')} Back to FirmVault</a>
    <h1 id="demo-page-title">See the workflow.<br><span class="accent">Picture your firm.</span></h1>
    <p class="section-description">Explore WhatsApp intake, filing and retrieval in a 15-minute demo.</p>
  </section>
  <section class="booking-panel" id="trial-enquiry" aria-labelledby="booking-title">
    <h2 id="booking-title">Arrange your demo.</h2>
    <p class="booking-intro">Share your details. We’ll coordinate a time by email.</p>
    <form id="demo-form" aria-describedby="demo-email-help">
      <div class="form-row"><label for="demo-name">Your name <span aria-hidden="true">*</span></label><input id="demo-name" name="name" autocomplete="name" required maxlength="100" placeholder="e.g. Priya Shah"></div>
      <div class="form-row"><label for="demo-firm">Firm name <span aria-hidden="true">*</span></label><input id="demo-firm" name="firm" autocomplete="organization" required maxlength="150" placeholder="Your firm or practice"></div>
      <div class="form-row"><label for="demo-email">Email address <span aria-hidden="true">*</span></label><input id="demo-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="none" spellcheck="false" required maxlength="254" placeholder="you@example.com"></div>
      <details class="booking-optional">
        <summary>Add a little context <span class="optional">Optional</span><span class="optional-marker" aria-hidden="true">+</span></summary>
        <div class="booking-optional-fields">
          <div class="form-row"><label for="demo-type">Type of practice <span class="optional">Optional</span></label><select id="demo-type" name="type"><option value="">Choose your practice</option><option>CA firm</option><option>Tax consultancy</option><option>Law firm</option><option>Other professional practice</option></select></div>
          <div class="form-row"><label for="demo-message">What would you like to improve? <span class="optional">Optional</span></label><textarea id="demo-message" name="message" rows="3" maxlength="1500" placeholder="Tell us about your document workflow…"></textarea></div>
        </div>
      </details>
      <p class="form-disclosure" id="demo-email-help">This opens your email app with a prepared enquiry to contact@nexosk.in. You review and send it to arrange a time.</p>
      <button class="button form-submit" type="submit">Prepare demo email ${arrow}</button>
      <p class="form-privacy">Please keep client documents out of your enquiry.<br><a href="/privacy/">How we handle your details</a></p>
    </form>
    <div class="email-fallback" id="email-fallback" hidden><p id="email-status" role="status">Your request is ready. Send it from your email app to arrange your demo.</p><p class="small-print">If your email app didn’t open, copy your request and email it to contact@nexosk.in.</p><textarea id="email-copy" rows="7" readonly aria-label="Prepared demo request"></textarea><button class="button button-secondary" type="button" id="copy-email">Copy request ${icon('copy')}</button></div>
  </section>
  <aside class="booking-details" aria-labelledby="demo-agenda-title">
    <div class="demo-agenda"><h2 id="demo-agenda-title">What we’ll walk through</h2><div><span aria-hidden="true">01</span><p>Forwarding documents through WhatsApp</p></div><div><span aria-hidden="true">02</span><p>Filing by client, service, document type and period</p></div><div><span aria-hidden="true">03</span><p>Retrieval, team access and activity history</p></div></div>
    <p class="booking-contact">Prefer to email us directly?<br><a href="mailto:contact@nexosk.in">contact@nexosk.in ${arrow}</a></p>
  </aside>
</div>
</main>`;
}
