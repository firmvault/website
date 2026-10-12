# FirmVault website

Responsive marketing website with light/dark/system themes, a scroll-driven document journey, searchable illustrative records, and an email demo enquiry page.

## Local development

Node.js is the only required runtime. No dependency installation is needed.

```powershell
node scripts/render.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

Open the printed local URL. The server binds to 127.0.0.1. Set PORT if 4173 is unavailable.

## Editing

- Page copy, navigation, shared layout, and metadata: `scripts/render.mjs`. Run it after edits to regenerate the tracked HTML pages.
- Layout, theme tokens, responsive behavior, and animation: `dist/styles.css`.
- Interaction behavior and enquiry preparation: `dist/app.js`.
- Theme boot, saved preference, and OS appearance changes: `dist/theme.js`.
- Brand files and licensed fonts: `dist/assets/`.

The default theme is System. Explicit choices are remembered with the browser-local `firmvault-theme` key. OS appearance changes update the page while System is selected. Reduced motion disables decorative animations, parallax, reveal movement, and smooth scrolling; the workflow text remains available.

## Demo enquiries

The user supplied `contact@nexosk.in`. The form validates and prepares a mailto message; the visitor sends it from their email client. There is also a selectable/copyable request fallback. It does not send a message from the server or reserve calendar appointments. No enquiry is saved in local storage.

## Scope and remaining business work

All shown document data is fictional and labelled as illustrative. This website implements presentation and browser-local examples, not the FirmVault document backend.

The About, Privacy, and Website Terms pages cover the supplied company attribution, email enquiry flow, theme storage, and current hosting. Before a public business launch, review these against actual company and product arrangements. A direct calendar integration and the `firmvault.co.in` custom domain can be added when supplied and configured.

## Deployment

The tracked `.openai/hosting.json` binds this checkout to its private ChatGPT Site and deploys `dist/`. Use the Sites plugin source workflow to synchronize and publish the exact source version. Keep private access until the owner requests a change.

On Windows, run the Site source workflow with Git Bash first on PATH and TAR_OPTIONS set to `--force-local`. This avoids the WSL path interpretation and GNU tar treating a drive-letter archive path as a remote hostname.

```powershell
$env:PATH = 'C:\Program Files\Git\bin;' + $env:PATH
$env:TAR_OPTIONS = '--force-local'
```

The tracked PNG sharing image is generated from `dist/assets/social-cover.svg`, which uses the approved outlined logo. Regeneration requires Sharp; `scripts/render-cover.mjs` accepts a FIRMVAULT_SHARP_PATH environment variable when using the bundled runtime.
