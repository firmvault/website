// Approved monthly pricing and calculator, shared by all deployments.
export function pricingSection() {
  return `<section class="pricing-section section-space" id="pricing" aria-labelledby="pv-pricing-title"><div class="container"><div class="pv-intro"><div><p class="pv-eyebrow"><span class="pv-dot"></span> SIMPLE PRICING, PER FIRM</p><h2 id="pv-pricing-title">One simple plan.<br><span>Room to grow.</span></h2></div><p class="pv-intro-copy">Start with your team and your documents.<br>Add more seats or storage whenever you need.</p></div>
<div class="pv-pricing-layout">
<section class="pv-base-card" aria-labelledby="pv-base-title">
<div class="pv-plan-top"><h3 id="pv-base-title">FirmVault</h3><span class="pv-billing-tag">Billed monthly</span></div>
<p class="pv-base-price"><span class="pv-currency">₹</span><strong>999</strong><span class="pv-per-month">/ month</span></p>
<p class="pv-plan-description">Your firm’s documents. In order.</p>
<div class="pv-included" aria-label="Included in the base plan">
<div><svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/></svg><strong>3 seats</strong><span>For your team</span></div>
<div><svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg><strong>20GB</strong><span>Document storage</span></div>
</div>
<ul class="pv-features">
<li><svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>Receive documents through WhatsApp</li>
<li><svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>File with the right client and context</li>
<li><svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>Find and retrieve your records</li>
</ul>
<a class="pv-book-button" href="/book-demo/">Book a demo<svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>
<p class="pv-plan-footnote">One base plan. Add only what your firm needs.</p>
</section>
<section class="pv-calculator" aria-labelledby="pv-calculator-title">
<div class="pv-calculator-heading"><p class="pv-eyebrow">MAKE IT FIT YOUR FIRM</p><h3 id="pv-calculator-title">Find your monthly price.</h3><p>3 seats and 20GB are already included.</p></div>
<div class="pv-addon-row"><div class="pv-addon-copy"><span class="pv-addon-label"><svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/></svg>Team seats</span><p>₹500 / additional seat / month</p></div><div class="pv-stepper" role="group" aria-label="Total team seats"><button type="button" data-change="seats:-1" aria-label="Remove a seat" disabled>−</button><output id="pv-seats-display" aria-label="Total seats">3</output><button type="button" data-change="seats:1" aria-label="Add a seat">+</button></div></div>
<div class="pv-addon-row"><div class="pv-addon-copy"><span class="pv-addon-label"><svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>Storage</span><p>₹500 / additional 50GB / month</p></div><div class="pv-stepper pv-storage-stepper" role="group" aria-label="Total document storage"><button type="button" data-change="storage:-1" aria-label="Remove 50GB storage" disabled>−</button><output id="pv-storage-display" aria-label="Total storage">20<span>GB</span></output><button type="button" data-change="storage:1" aria-label="Add 50GB storage">+</button></div></div>
<div class="pv-breakdown"><span class="pv-mini-label">YOUR MONTHLY BREAKDOWN</span><dl><div><dt>Base plan <span>3 seats + 20GB</span></dt><dd>₹999</dd></div><div><dt>Extra seats <span id="pv-seat-quantity">0 added</span></dt><dd id="pv-seat-cost">₹0</dd></div><div><dt>Extra storage <span id="pv-storage-quantity">0 added</span></dt><dd id="pv-storage-cost">₹0</dd></div></dl></div>
<div class="pv-estimate"><div><span class="pv-mini-label">MONTHLY ESTIMATE</span><p id="pv-configuration">3 seats · 20GB storage</p></div><p class="pv-total-price"><strong id="pv-estimate">₹999</strong><span>/ month</span></p></div>
<p class="pv-sr-only" id="pv-calculation-status" role="status" aria-live="polite"></p>
<div class="pv-example-row"><button id="pv-example" type="button">Try 4 seats + 70GB <svg class="pv-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></button><button id="pv-reset" type="button" disabled>Reset</button></div>
</section>
</div>
<div class="pv-bottom-note"><span class="pv-dot"></span><p>Extra storage comes in 50GB blocks. All prices shown are monthly.</p></div>
</div></section>`;
}
