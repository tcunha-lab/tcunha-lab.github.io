# Site updater — the double-click widget

A small local tool for adding and editing news items, team members, and
publications on the Cunha Lab site. No R, no terminal, no build step.

## How to use

1. **Double-click `widget/index.html`.** It opens in your default browser.
2. Click **Choose project folder** (top right) and pick the site folder
   (the one that contains `_config.yml`). You only do this once per session.
3. Pick a tab — **News**, **Team**, or **Publications** — fill in the form,
   click save. Existing items show at the top of each tab and can be edited
   or deleted in place.

That's it. Saved changes land in the right files (`_news/`, `_data/team.yml`,
`_data/publications.yml`). Commit and push when ready; GitHub Pages rebuilds.

## Browser notes

- **Chrome, Edge, Arc, Brave:** full experience — the widget writes directly
  into your project folder after you grant access once.
- **Safari, Firefox:** the widget falls back to downloading generated files,
  which you then drop into the right folder. Functional, just a touch more
  manual.

## What it does for you

- **News.** Generates a correctly-named `_news/YYYY-MM-DD-slug.md` file, with
  optional card image. Image file is copied into `assets/images/news/`.
- **Team.** Appends to `_data/team.yml` (or edits an existing entry). Photo
  is copied into `assets/images/team/` and path wired up automatically.
- **Publications.** Paste a DOI, click **Fetch from Crossref**, and title,
  authors, year, and journal auto-fill. Edit or add fields, then save.

## Privacy

The widget is a local static file. It talks to the Crossref API when you
click "Fetch" (a standard public API for publication metadata) and to Google
Fonts to render Lora/Inter. Nothing else leaves your machine.

## Making a Dock/Launchpad shortcut (optional)

On macOS, drag `widget/index.html` to your Dock or make an alias on the
Desktop for one-click access.
