export const renderFilm = () => `
<section class="film-section section-space" id="firmvault-film" aria-labelledby="film-title">
  <div class="container">
    <div class="film-intro">
      <div><p class="eyebrow"><span class="live-dot"></span> FIRMVAULT IN MOTION</p><h2 id="film-title">From received<br><span class="accent">to retrieved.</span></h2></div>
      <div class="film-intro-copy"><p id="film-description">Follow one document from a WhatsApp message to an organised record — and back into your hands when you need it.</p><span class="film-duration">THE WHOLE WORKFLOW · 35 SECONDS</span></div>
    </div>
    <div class="film-shell">
      <div class="film-frame-bar"><span><i aria-hidden="true"></i> THE FIRMVAULT FILM</span><span>RECEIVE → FILE → FIND</span></div>
      <div class="film-screen">
        <video id="firmvault-video" controls playsinline preload="none" poster="/assets/firmvault-film-poster.jpg" width="1920" height="1080" aria-label="FirmVault explainer film" aria-describedby="film-description"><source src="/assets/firmvault-explainer.mp4" type="video/mp4">Your browser cannot play this film. <a href="/assets/firmvault-explainer.mp4">Download the FirmVault film</a>.</video>
        <button class="film-play" type="button" hidden aria-controls="firmvault-video"><span class="film-play-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z"/></svg></span><span><strong data-film-action>Play the film</strong><small>35 seconds · Sound available</small></span></button>
      </div>
    </div>
    <div class="film-below"><p class="film-note">One document. A clear path from chat to your firm’s records.</p><p class="film-status sr-only" role="status" aria-live="polite"></p><details class="film-overview"><summary>Read the film overview <span aria-hidden="true">+</span></summary><div><p>A client sends a GST document on WhatsApp. Forward it to FirmVault, then answer four prompts: client, service, document type and period.</p><p>The document is filed with that context. When you need it, ask FirmVault on WhatsApp and retrieve the matching record. From received to retrieved — every document, right where your firm needs it.</p><p class="film-example-note">The film uses an illustrative client record. Audio contains music and interface sounds; the workflow is explained on screen.</p></div></details></div>
  </div>
</section>`;
