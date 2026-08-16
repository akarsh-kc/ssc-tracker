# ✅ SSC Planner

**An offline-first, installable study planner for SSC exam prep — daily
tasks, subject-wise mock tracking, and notes, all saved locally on your
device.**

SSC Planner is a single-page, installable web app (PWA). No accounts, no
server, no tracking — everything you type is saved in your browser's local
storage.

---

## 🚀 Hosting it on GitHub Pages

1. Create a new GitHub repo and push every file in this folder to it
   (keep them all at the repo root — `index.html`, `manifest.json`,
   `service-worker.js`, `.nojekyll`, and the icon PNGs).
2. In the repo, go to **Settings → Pages**, and under "Build and
   deployment" set **Source: Deploy from a branch**, branch `main`,
   folder `/ (root)`.
3. Wait a minute for it to publish — your app will be live at
   `https://<your-username>.github.io/<repo-name>/`.
4. Open that link on your phone and use "Add to Home Screen" (iOS) or
   "Install app" (Android/Chrome) to add it like a native app.

The `.nojekyll` file is required — without it, GitHub Pages' default
Jekyll build step ignores files/folders starting with an underscore and
can interfere with how `manifest.json` and the service worker are served.

## ✨ Features

- **100% local & private** — tasks, notes, and settings are stored in
  your browser's localStorage. Nothing is ever uploaded anywhere.
- **Installable PWA** — add it to your phone's home screen and it runs
  like a native app, fully offline after the first load.
- **Today / Study / Notes** views — daily task list, per-subject mock
  countdowns, and a notes system with permanent notes or scheduled
  reminders.
- **Daily streak tracker** — a glass-styled streak badge for consecutive
  days you've opened the app.
- **Two built-in themes** (Graphite / Blue), plus a Liquid Glass toggle.
- **Light on dependencies** — no build step, no frameworks, no backend.
  Just static files.

## 🔒 Privacy

SSC Planner never makes a network request for your data. The service
worker only caches the app's own static files (HTML/manifest/icons) so
the app shell loads offline — your tasks and notes stay in your browser.

## 🛠️ Tech

Vanilla HTML/CSS/JS, localStorage (persistent storage), Service Worker
(offline app shell), Web App Manifest (installability). No build tools,
no external runtime dependencies (besides the Google Fonts CDN for the
app's typeface, which is optional — the app falls back to your system
font if it can't load).
