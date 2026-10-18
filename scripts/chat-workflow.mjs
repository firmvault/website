const documentCard = `<div class="chat-file-inner"><span class="chat-pdf">PDF</span><div><strong>Sharma_GST_Sep.pdf</strong><span>PDF document</span></div></div>`;
const staff = [
  [0, 'out', 'chat-file fallback-keep', `<div class="chat-forwarded">↗ Forwarded</div>${documentCard}`],
  [2.4, 'in', 'fallback-keep', '<p>Document received! Let’s file it.</p>'],
  [4.2, 'in', '', '<p>Which client does this belong to?</p><span class="chat-choice">Sharma Traders</span>'],
  [5.6, 'out', '', '<p>Sharma Traders</p>'],
  [7, 'in', '', '<p>Select service</p><span class="chat-choice">GST</span>'],
  [8.4, 'out', '', '<p>GST</p>'],
  [9.8, 'in', '', '<p>Document type?</p><span class="chat-choice">GST Return</span>'],
  [11.2, 'out', '', '<p>GST Return</p>'],
  [12.6, 'in', '', '<p>Select period</p><span class="chat-choice">September 2026</span>'],
  [14, 'out', '', '<p>September 2026</p>'],
  [15.6, 'in', 'fallback-keep', '<p class="chat-confirmation"><span aria-hidden="true">✓</span> Document filed successfully!</p>'],
  [17.2, 'in', 'chat-record fallback-keep', '<span class="chat-record-label">Filed in your firm’s vault</span><strong class="chat-record-name">Sharma_GST_Sep.pdf</strong><dl><div><dt>Client</dt><dd>Sharma Traders</dd></div><div><dt>Service</dt><dd>GST</dd></div><div><dt>Document type</dt><dd>GST Return</dd></div><div><dt>Period</dt><dd>September 2026</dd></div></dl><p class="chat-receipt">✓ Document organised and ready to retrieve</p>']
];
const partner = [
  [22.5, 'out', 'fallback-keep', '<p>Send Sharma Traders GST return for September</p>'],
  [24.6, 'in', 'chat-typing', '<span></span><span></span><span></span>'],
  [25.8, 'in', 'fallback-keep', '<p>Found your document!</p>'],
  [27.3, 'in', 'chat-file fallback-keep', documentCard],
  [29.2, 'in', 'fallback-keep', '<p class="chat-confirmation"><span aria-hidden="true">✓</span> Document retrieved. Access logged.</p>']
];
function messages(items, timestamp) {
  return items.map(([at, side, classes, content]) => `<div class="chat-message ${side} ${classes}" data-chat-at="${at}">${content}${classes.includes('chat-typing') ? '' : `<span class="chat-message-meta"><span>${timestamp}</span>${side === 'out' ? '<span class="chat-delivered" aria-label="Delivered">✓✓</span>' : ''}</span>`}</div>`).join('');
}
export function renderChatWorkflow(icon, arrow) {
  return `<section class="chat-workflow" id="how-it-works" aria-labelledby="workflow-heading">
  <div class="container">
    <div class="workflow-intro reveal"><p class="eyebrow">FROM RECEIVED TO RETRIEVED</p><h2 id="workflow-heading">From chat to vault<br><span class="muted-heading">in four moves.</span></h2><p class="section-description">Forward, file, organise and retrieve.<br>Follow one document through your firm’s WhatsApp workflow.</p></div>
    <div class="chat-scroll-track">
      <div class="chat-scroll-stage">
        <div class="chat-story" aria-label="Document workflow">
          <div class="chat-story-segments">
            <article class="chat-story-step" data-chat-chapter="0"><p class="chat-step-count">01 <span>/ 04</span></p><h3>Forward.</h3><p>A client sends a document. Staff forward it to FirmVault, and receipt is acknowledged.</p><span class="chat-step-note">FROM THE CONVERSATION</span></article>
            <article class="chat-story-step" data-chat-chapter="1"><p class="chat-step-count">02 <span>/ 04</span></p><h3>File.</h3><p>Choose the client, service, document type and period. Four details give the document its place.</p><span class="chat-step-note">CLIENT · SERVICE · TYPE · PERIOD</span></article>
            <article class="chat-story-step" data-chat-chapter="2"><p class="chat-step-count">03 <span>/ 04</span></p><h3>Organise.</h3><p>The same PDF becomes a filed record, with its context kept together in your firm’s vault.</p><span class="chat-step-note">ONE DOCUMENT. THE RIGHT CONTEXT.</span></article>
            <article class="chat-story-step" data-chat-chapter="3"><p class="chat-step-count">04 <span>/ 04</span></p><h3>Retrieve.</h3><p>A partner asks for the September GST return. FirmVault returns the same document, ready for the work.</p><span class="chat-step-note">READY WHEN YOUR TEAM NEEDS IT</span></article>
          </div>
          <a class="text-link chat-story-demo" href="/book-demo/">See it with your team ${arrow}</a>
        </div>
        <div class="workflow-chat">
          <div class="chat-window" aria-label="Illustrative FirmVault conversation">
            <div class="chat-header"><span class="chat-avatar"><img src="/assets/symbol.svg" width="26" height="28" alt=""></span><div><strong>FirmVault</strong><span class="chat-person">Staff member’s conversation</span></div><span class="chat-online" aria-hidden="true"></span></div>
            <div class="chat-body"><span class="chat-date" aria-hidden="true">Today</span><div class="chat-flow chat-staff" aria-label="Staff filing conversation">${messages(staff, '10:24')}</div><span class="chat-partner-divider">Partner’s conversation</span><div class="chat-flow chat-partner" aria-label="Partner retrieval conversation">${messages(partner, '10:32')}</div></div>
            <div class="chat-composer" aria-hidden="true"><span class="chat-plus">+</span><span class="chat-compose-text">Message</span><span class="chat-send">${icon('arrow-up')}</span></div>
          </div>
          <div class="chat-caption"><span>Illustrative workflow · fictional document</span><span class="chat-scroll-cue">Scroll to explore ↓</span></div>
          <div class="chat-chapter-nav" role="group" aria-label="Explore the FirmVault workflow"><button type="button" data-chat-jump="0" aria-pressed="true"><span>01</span> Forward</button><button type="button" data-chat-jump="1" aria-pressed="false"><span>02</span> File</button><button type="button" data-chat-jump="2" aria-pressed="false"><span>03</span> Organise</button><button type="button" data-chat-jump="3" aria-pressed="false"><span>04</span> Retrieve</button></div>
          <div class="chat-progress" aria-hidden="true"><span></span></div>
        </div>
      </div>
    </div>
    <p class="chat-accessible-summary sr-only">Illustrative workflow: staff forward Sharma_GST_Sep.pdf, then file it under Sharma Traders, GST, GST Return and September 2026. FirmVault confirms filing. A partner requests that September GST return and receives the same PDF. The document and conversations are fictional.</p>
  </div>
</section>`;
}
