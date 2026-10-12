# Approved chat workflow integration

The homepage workflow now uses the chat-only design approved on 12 October 2026. The hero motion, document marquee, product content, contact flow and theme preference remain in place.

## Interface and story

- Live HTML text, CSS message surfaces and the approved vector symbol replace the old orbit/document illustration. No raster film frames, video, audio, or media decoding are loaded.
- The same fictional Sharma_GST_Sep.pdf is forwarded, filed under Sharma Traders / GST / GST Return / September 2026, organised and returned to a partner.
- The main page's Forward, File, Organise and Retrieve chapters follow the conversation. The organised record stays inside the chat.
- System remains the default appearance, with the existing website theme preference controlling the entire component.
- The composer and response choices are illustrations, not product inputs. The Book a demo/contact flow remains the real next step.

## Motion implementation

`scripts/chat-workflow.js` maps native scroll progress through the workflow track onto the approved conversation sequence. Message entrance and camera movement use scroll-derived smoothstep values. A 62 ms exponential damp is independent of display refresh rate and settles to the exact scroll position.

The animation schedules one requestAnimationFrame stream while the section is visible or settling. Message positions are cached on resize and font readiness instead of measured every animation frame. Only opacity and transforms animate; will-change is applied while the section is in view. No wheel or touch scrolling is intercepted.

The pinned stage accounts for the measured site header. Phone layouts stack the current story chapter above the chat. Small viewports without enough usable height, reduced-motion settings and browsers without the enhancement receive a normal static workflow with representative conversation messages and the four document details. The semantic summary remains stable rather than announcing each animated frame.

Chapter buttons seek to representative positions in the same scroll track. Scroll reversal reverses the illustration. Staff-to-partner handoff, typed retrieval request, response dots and the returned PDF all follow scroll position.

## Source structure

- `scripts/chat-workflow.mjs`: server-rendered markup and illustrative messages.
- `scripts/chat-workflow.css`: theme-aware interface and responsive layouts.
- `scripts/chat-workflow.js`: scroll motion and static fallback selection.
- `scripts/app.js`: existing site interactions, with the old workflow controller removed.
- `scripts/render.mjs`: copies the scripts and combines the styles into the deployment output.

Build completed through the normal static generator. Visual refinement used the local in-app preview; no automated test suite was run or added.
