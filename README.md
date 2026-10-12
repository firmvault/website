# FirmVault website

Responsive marketing website with light/dark/system themes, a scroll-driven document journey, searchable illustrative records, and an email demo enquiry page.

Private preview: [FirmVault](https://firmvault.anishghanwat9.chatgpt.site).

Production domain: `firmvault.co.in`. GitHub Pages deployment is defined in `.github/workflows/github-pages.yml`.

## Local development

Node.js is the only required runtime. No dependency installation is needed.

```powershell
npm run build
npm run check
node scripts/serve.mjs
```

Open the printed local URL. The server binds to 127.0.0.1. Set PORT if 4173 is unavailable.

## Editing

- Homepage story, illustrative scenes, and example vault: `scripts/home.mjs`.
- Supporting page copy, navigation, shared layout, and metadata: `scripts/render.mjs`. Run `npm run build` after edits to regenerate the tracked HTML pages.
- Layout, theme tokens, responsive behavior, and animation: `scripts/styles.css`. The build copies it into `dist/styles.css`; edit the source stylesheet.
- Interaction behavior and enquiry preparation: `dist/app.js`.
- Theme boot, saved preference, and OS appearance changes: `dist/theme.js`.
- Brand files and licensed fonts: `dist/assets/`.

The default theme is System. Explicit choices are remembered with the browser-local `firmvault-theme` key. OS appearance changes update the page while System is selected. Reduced motion disables decorative animations, parallax, reveal movement, and smooth scrolling; the workflow text remains available.

## Product story and visual refinement

The homepage follows one fictional GST return through employee forwarding, filing, Pending review when needed, and retrieval. The illustrative vault in the animated hero includes search, a Pending filter, and document details.

Following owner feedback, the earlier visual composition is restored: floating documents and context cards, an orbit graphic, a moving forwarding connection, pointer response, scattered-file parallax, section reveals, and a sticky document journey. The original responsive layouts, system appearance, and reduced-motion support are preserved. The quieter visual revision remains recoverable in Git history.

Real product screenshots and approved customer feedback have not been supplied. All concept visuals remain labelled, and no testimonials or unverified product claims are added. See `docs/PRODUCT-STORY-VISUAL-REFINEMENT.md` for this iteration's delivery notes and evidence requirements.

## Demo enquiries

The user supplied `contact@nexosk.in`. The form validates and prepares a mailto message; the visitor sends it from their email client. There is also a selectable/copyable request fallback. It does not send a message from the server or reserve calendar appointments. No enquiry is saved in local storage.

## Scope and remaining business work

All shown document data is fictional and labelled as illustrative. This website implements presentation and browser-local examples, not the FirmVault document backend.

The About, Privacy, and Website Terms pages cover the supplied company attribution, email enquiry flow, theme storage, and hosting. Before a public business launch, review these against actual company and product arrangements. A direct calendar integration can be added when supplied and configured.

## Deployment

GitHub Actions builds and checks the website, uploads only `dist/`, and deploys it to GitHub Pages on each push to `main`. It can also be run manually from Actions.

A repository owner or Pages administrator must configure **Settings → Pages → Source → GitHub Actions**, set the custom domain to **firmvault.co.in**, and keep HTTPS enforcement enabled once the certificate is available. The generated `CNAME` file records the intended domain; it does not replace the GitHub settings step for an Actions deployment.

The workflow reads the live Pages base URL. Before the custom domain is configured, it can build working `/website/` links for the default GitHub Pages URL. Once the domain is set, it builds root links and production metadata for `https://firmvault.co.in`. Local builds default to that production origin. Set `SITE_ORIGIN` to override it.

The domain’s apex A records should point to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. The `www` CNAME should point to `firmvault.github.io`.

The existing `.openai/hosting.json` retains the earlier private ChatGPT Site identity. It is not used by the GitHub Pages workflow.

### Earlier private preview tooling

On Windows, run the Site source workflow with Git Bash first on PATH and TAR_OPTIONS set to `--force-local`. This avoids the WSL path interpretation and GNU tar treating a drive-letter archive path as a remote hostname.

```powershell
$env:PATH = 'C:\Program Files\Git\bin;' + $env:PATH
$env:TAR_OPTIONS = '--force-local'
```

The tracked PNG sharing image is generated from `dist/assets/social-cover.svg`, which uses the approved outlined logo. Regeneration requires Sharp; `scripts/render-cover.mjs` accepts a FIRMVAULT_SHARP_PATH environment variable when using the bundled runtime.

## Earlier website

The earlier website implementation is preserved on the [`v0` branch](https://github.com/firmvault/website/tree/v0). The current implementation, generated pages, and source scripts are on `main`.
