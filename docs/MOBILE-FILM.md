# Step 6: the desktop film experience on every screen

Approved for publication by the owner, 20 October 2026.

The owner rejected the separate touch toolbar. It has been removed from markup, scripts and styles, along with its custom seek, sound and fullscreen controls.

Use the existing desktop film window on phones and tablets: 16:9 footage, muted in-view preview, the Play with sound overlay and native video controls after playback starts. Native controls supply seeking, sound and fullscreen where the browser supports them. Touchscreens keep the play button fixed; devices with a mouse retain the existing smooth pointer follower. Reduced-motion and offscreen behaviour are unchanged.

The overlay has a 48px minimum target on smaller screens, a 14px label and an SVG play icon. The preview toggle keeps a 44px target. The original frame, overview and theme styles are retained.

Built with node scripts/render.mjs. No automated tests added or run. Phone and tablet visual previews were approved; native iPhone/iPad fullscreen still needs device review.

Step 2 was pushed separately in d8b58c3, and Step 3 in 8498d64. This revision completes implementation of the original ten-step refinement plan.
