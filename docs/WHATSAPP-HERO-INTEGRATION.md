# Approved WhatsApp-first hero

Integrated on 12 October 2026 after approval of the refined hero demo.

- WhatsApp is the primary visual; the FirmVault dashboard shows the same fictional record.
- The 17-second automatic loop forwards, files and retrieves Sharma_GST_Sep.pdf. Gentle floating motion and one travelling PDF connect the windows.
- The original header, navigation, demo enquiry flow and scrolling product workflow remain part of the website.
- The existing Light, Dark and System picker controls the hero. System remains the default.
- At phone widths, the windows stack with full-size text and a vertical connection.
- A pause control stops the loop. Reduced motion shows the completed retrieval; the loop pauses off screen and in hidden tabs.
- Fonts, SVG logos and scripts are served locally. No audio or video is loaded.

## Source

`scripts/hero.mjs` renders the approved composition, `scripts/hero.css` styles it and `scripts/hero.js` runs the motion. The homepage renderer includes these assets only where required.

The WhatsApp symbol geometry was extracted unchanged from the header logo at https://www.whatsapp.com/ on 12 October 2026, using the green monochrome treatment. It is stored at `dist/assets/whatsapp-logo.svg`.

## Publication

The GitHub checkout builds with the firmvault.co.in origin. The Sites checkout builds with the existing ChatGPT Sites origin. Publishing preserves the current Site audience.

Both static builds completed. The integrated desktop hero and 390px phone composition were inspected in the local browser. No automated test suite was run.
