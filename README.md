<div align="center">

# YAD MUN
### Youth Ambassadors in Diplomacy & Model United Nations

**Developing principled, competent, and globally minded youth leaders — through diplomacy, Model UN education, and civic engagement.**

[![Live Site](https://img.shields.io/badge/live-yadmun.org-1B4079?style=for-the-badge)](https://yadmun.org)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Database](https://img.shields.io/badge/database-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

</div>

---

## Overview

This repository contains the official website for **YAD MUN LBG**, a Ghana-based youth diplomacy and Model United Nations organization. The site serves as the organization's public face — showcasing its leadership, programmes, events, and impact — while also handling live member registration, backed by a real database with automated backups.

The site is built as a **dependency-free static site**: plain HTML, CSS, and JavaScript, with no build step, no framework, and no bundler. This is a deliberate choice — it keeps the project trivially easy to deploy, debug, and hand off, while still supporting a real backend (Supabase) for dynamic functionality like member registration.

**Live:** [yadmun.org](https://yadmun.org)

---

## Features

- 🎨 **Custom-designed UI** — navy & gold visual identity, fully responsive across phones, tablets, and desktop, with a dedicated landscape/orientation breakpoint
- 🌗 **Dark mode** — persisted across visits
- 👥 **Interactive leadership directory** — 18 profiles across Board of Directors, Executive Directorate, and Executive Committee, each opening a detailed bio modal on click (keyboard-accessible)
- 🎥 **Native video storytelling** — News & Stories cards embed real video with custom controls, no third-party embed/tracking scripts
- 📝 **Live member registration** — writes directly to a Postgres database (Supabase), with:
  - Row Level Security locking the public key to **insert-only** access (no read/update/delete possible from the browser)
  - A honeypot field to silently filter out bot/spam submissions
  - Graceful fallback to email-only mode if the database isn't configured
- 📬 **Contact & registration forms** — dual-delivery via database + email notification (Formspree)
- 💬 **WhatsApp quick-contact** — floating action button and share integrations
- ♿ **Accessibility-conscious** — skip link, keyboard navigation, ARIA roles/labels, `prefers-reduced-motion` support
- 🔒 **Hardened by default** — strict Content-Security-Policy header, no inline script execution, no third-party trackers
- 🖨️ **Print-friendly** — dedicated print stylesheet

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | Vanilla CSS3 (custom properties / CSS variables, no preprocessor) |
| Behavior | Vanilla JavaScript (ES6+, no framework) |
| Database | [Supabase](https://supabase.com) (Postgres) |
| Form delivery | [Formspree](https://formspree.io) |
| Hosting | [Vercel](https://vercel.com) |
| Domain | yadmun.org |
| Automation | GitHub Actions (scheduled DB backup + keep-alive) |
| Icons | Font Awesome 6 |
| Fonts | Inter, Playfair Display, IBM Plex Mono (Google Fonts) |

No package manager, no `node_modules`, no build command. What you edit is exactly what ships.

---

## Project Structure

```
.
├── index.html                          # All page markup and content
├── styles.css                          # All styling
├── script.js                           # All behavior (forms, modals, dark mode, etc.)
├── images/                             # Site photography, leadership portraits, favicon assets
├── videos/                             # News & Stories video files (video_one.mp4, video_two.mp4, video_three.mp4)
├── supabase_setup.sql                  # One-time SQL to provision the registrations table + security policy
└── .github/
    └── workflows/
        └── supabase-backup.yml         # Weekly automated DB backup + keep-alive ping
```

---

## Getting Started Locally

No build tools required.

```bash
git clone https://github.com/<your-username>/yadmun.git
cd yadmun
```

Then simply open `index.html` in a browser, or serve it locally to avoid any local file-path quirks:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Visit `http://localhost:8000`.

> **Note:** the `images/` and `videos/` folders are not tracked in this repository due to size — place your local copies alongside `index.html` before running, matching the filenames referenced in the HTML.

---

## Configuration

All runtime configuration lives in one place — the `CONFIG` object at the top of `script.js`:

```javascript
const CONFIG = {
  REGISTRATION_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID',
  CONTACT_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID',
  WHATSAPP_NUMBER: '233XXXXXXXXX',       // international format, no leading 0, no +
  CONFERENCE_DATE_ISO: '2026-12-15T09:00:00+00:00',
  SUPABASE_URL: 'https://xxxxxxxx.supabase.co',
  SUPABASE_ANON_KEY: 'eyJ...'
};
```

### Setting up the database (Supabase)

1. Create a free project at [supabase.com](https://supabase.com)
2. Open **SQL Editor → New query**, paste the contents of [`supabase_setup.sql`](./supabase_setup.sql), and run it. This creates the `registrations` table with Row Level Security already locked to insert-only for the public key.
3. Copy your **Project URL** and **anon public** key from **Settings → API** into `CONFIG` above.

> ⚠️ Only ever use the **anon public** key in this file. The `service_role` key grants full read/write access and bypasses all security rules — it must never appear in client-side code. It is used only inside the GitHub Actions backup workflow, stored as a repository secret.

If `SUPABASE_URL` / `SUPABASE_ANON_KEY` are left as placeholders, the registration form automatically falls back to email-only delivery via Formspree — nothing breaks, it just won't persist to a database.

### Setting up form delivery (Formspree)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form, set the delivery inbox to a real, monitored email address
3. Paste the generated endpoint into `REGISTRATION_ENDPOINT` / `CONTACT_ENDPOINT`

---

## Automated Backups

Since a free-tier Supabase project pauses automatically after 7 days of inactivity, this repo includes a GitHub Actions workflow (`.github/workflows/supabase-backup.yml`) that runs weekly and:

1. Queries the `registrations` table (this activity alone prevents the project from ever pausing)
2. Exports the current data to a dated CSV file
3. Pushes that file to a **separate, private** backup repository

Member data (names, phone numbers, emails) is never committed to this repository, which is public. Backups are pushed to a private repo instead, via a scoped GitHub Personal Access Token stored as a secret.

**Required repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Purpose |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Full-access key, used only server-side inside the Action — never in `script.js` |
| `BACKUP_REPO_TOKEN` | A GitHub PAT (`repo` scope) authorized to push to your private backup repo |

---

## Security

- **Row Level Security (RLS)** is enabled on every database table. The public key can only `INSERT` — reading, updating, or deleting registration data is not possible from the browser under any circumstances, regardless of what key an attacker obtains from the client-side code.
- **Content-Security-Policy** header restricts script, style, and connection sources to an explicit allowlist.
- **Honeypot field** on the registration form silently filters automated spam submissions without alerting the bot.
- **No client-side secrets** — the only credential present in `script.js` is the Supabase anon key, which is designed to be public by Supabase's own security model.

---

## Deployment

The site auto-deploys via **Vercel** on every push to `main`. No build command is configured — Vercel serves the static files directly.

```bash
git add .
git commit -m "your change"
git push origin main
```

Vercel picks up the push automatically; the live site updates within roughly a minute.

---

## Contributing

This is a living project maintained for YAD MUN LBG. If you're contributing:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Keep changes scoped — one logical change per commit
3. Test on both desktop and mobile viewport sizes before pushing
4. Open a pull request describing what changed and why

---

## License

© YAD MUN LBG. All rights reserved. This codebase is maintained for the exclusive use of Youth Ambassadors in Diplomacy and Model United Nations.

---

<div align="center">

**[yadmun.org](https://yadmun.org)** · Built with care for the next generation of diplomats.

</div>