// Monthly billing rules and GST treatment confirmed by the owner on 18 October 2026.
const rules = [
  ['Add during the month', 'Extra seats and storage are charged immediately, in proportion to the time left in your billing cycle.'],
  ['Reduce at renewal', 'Seat and storage reductions take effect at your next renewal.'],
  ['Cancel the next renewal', 'Cancel to stop renewal. Access continues until the end of your paid period.'],
  ['Check storage first', 'Bring storage usage within the lower limit before reducing it.']
];

export function billingGuide() {
  return `<section class="pv-billing-guide" id="billing" aria-labelledby="pv-billing-title">
<div class="pv-billing-heading"><h3 id="pv-billing-title">How monthly billing works.</h3><p>All prices include GST. Additions follow your existing monthly billing cycle.</p></div>
<dl class="pv-billing-rules">${rules.map(([title, description]) => `<div><dt>${title}</dt><dd>${description}</dd></div>`).join('')}</dl>
<details class="pv-proration-example"><summary>See a mid-month example<span class="pv-billing-plus" aria-hidden="true"></span></summary><div class="pv-proration-content">
<p>Add <strong>1 seat and 50GB</strong> with <strong>15 days left in a 30-day billing cycle.</strong> The additions normally cost ₹1,000 per month.</p>
<div class="pv-proration-amounts"><div><span>For the additions now</span><strong>₹500</strong><p>₹1,000 × 15 ÷ 30</p></div><div><span>From your next renewal</span><strong>₹1,999 <small>/ month</small></strong><p>Base plan + 1 seat + 50GB</p></div></div>
<p class="pv-proration-note">Both amounts include GST. This example starts with the ₹999 base plan; the charge for an addition depends on the time remaining when you make the change.</p>
</div></details>
</section>`;
}

export function billingFaq() {
  const questions = [
    ['Can I add seats or storage mid-month?', `${rules[0][1]} From your next renewal, the additions are charged at their full monthly price.`],
    ['When can I reduce seats or storage?', `${rules[1][1]} ${rules[3][1]}`],
    ['What happens when I cancel?', rules[2][1]],
    ['Do the displayed prices include GST?', 'Yes. The ₹999 monthly base plan, ₹500 per additional seat and ₹500 per additional 50GB all include GST. The calculator shows a full monthly estimate including GST; mid-month additions are charged proportionally.']
  ];
  return questions.map(([question, answer]) => `<details><summary>${question}<span class="faq-plus" aria-hidden="true"></span></summary><p>${answer}</p></details>`).join('');
}
