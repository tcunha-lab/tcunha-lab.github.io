# Tauana Cunha Lab — website

A Jekyll-based static site for the Tauana Cunha Lab at Loyola University
Chicago. Live at **https://cunhalab.com**, hosted on GitHub Pages from
the `tcunha-lab/tcunha-lab.github.io` repository.

---

## Editing the site (the workflow you'll forget)

When you sit down weeks or months from now to update the site, this is
the loop:

### 1. Open the project in Terminal

```bash
cd ~/path/to/CUNHALAB-website   # wherever you saved this folder
```

### 2. Start the local preview server

```bash
bin/serve
```

Open <http://localhost:4000> in your browser. Edits reload automatically
while `bin/serve` is running. Hit `Ctrl+C` in the terminal to stop it.

> **If a change doesn't appear**, the browser is caching the old CSS
> or HTML. Force a hard refresh with **Cmd+Shift+R** (Mac) or
> **Ctrl+Shift+R** (Windows/Linux). This applies to the live site at
> https://cunhalab.com too — same trick if a fresh deploy isn't showing
> up after a push.

### 3. Make changes

**Most content lives behind the widget.** Double-click
`widget/index.html` to open it. Click **Choose project folder** (top
right), point at *this* folder. Then pick a tab:

- **News** — write a new news post, optionally with a card image,
  gallery photos, and a PDF figure (auto-rasterized to a sharp JPG).
- **Team** — add a new member, edit an existing one, mark someone as
  alumni when they move on.
- **Publications** — paste a DOI, click **Fetch from Crossref**, the
  authors/venue/year auto-fill. Add a cover thumb or media-coverage
  links if you have them.
- **Fieldwork** — add an expedition, drop in photos, save.

The widget writes to the right files (`_news/`, `_data/team.yml`,
`_data/publications.yml`, `_data/fieldwork.yml`) and copies images into
`assets/images/`. You don't need to know the file structure to use it.

**Prose on the main pages** is not in the widget. Edit the corresponding
`.html` file directly:

| Page text                          | File to edit                              |
| ---------------------------------- | ----------------------------------------- |
| Home — About blurb                 | `index.html`                              |
| Home — tagline under the title     | `_config.yml` (the `tagline:` line)       |
| Research — intro + each line       | `research.html`                           |
| Teaching — page body               | `teaching.html`                           |
| Field Work — map + intro paragraph | `fieldwork.html`                          |
| Team — Prospectives block          | `team.html` (search for `id="join"`)      |
| Footer                             | `_includes/footer.html`                   |
| Title, institution, email, socials | `_config.yml`                             |

Inside an `.html` file, edit the text between tags. For italics use
`<em>…</em>`, bold use `<strong>…</strong>`, links use
`<a href="…">…</a>`. Copy the style of the surrounding text if you're
not sure.

### 4. Commit and push

When the local preview looks right:

```bash
git status                        # see what changed
git add .                         # stage everything
git commit -m "Add news item …"   # short description of the change
git push                          # send to GitHub
```

GitHub Pages rebuilds within ~1 minute. Refresh **https://cunhalab.com**
to see it live. (To watch the build status, visit
https://github.com/tcunha-lab/tcunha-lab.github.io/actions.)

### 5. Home banner photo

The full-width banner at the top of the home page pulls from
`assets/images/team-hero.jpg`. Drop a new photo at that exact path to
replace it. Adjust the crop by editing `hero_image_position:` in
`_config.yml` — format is `horizontal vertical` (e.g. `"center 30%"`
shows more of the top; `"center 80%"` favors the bottom).

---

## First-time setup (once per computer)

The project is pinned to **Ruby 3.3.6** so what you see locally matches
what GitHub Pages builds. `rbenv` isolates that Ruby from whatever
version Homebrew installs system-wide, so a Homebrew update can't break
your dev environment.

```bash
brew install rbenv ruby-build
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
exec $SHELL

cd ~/path/to/CUNHALAB-website
rbenv install 3.3.6        # ~5 min; the .ruby-version file auto-selects it
gem install bundler
bundle install             # installs Jekyll + plugins per Gemfile
```

After that, `bin/serve` works.

> Why the `bin/serve` wrapper? Jekyll 3.9 (bundled by `github-pages`)
> calls `String#tainted?`, which Ruby 3.2+ removed. The wrapper loads a
> tiny compatibility shim (`.jekyll-shims.rb`) via `RUBYOPT` so Jekyll
> starts cleanly. Safe to delete once Jekyll 4 is mainstream on Pages.

---

## Folder tour

```
.
├── _config.yml           # site-wide settings (title, email, socials, URL)
├── _data/
│   ├── nav.yml           # top navigation order/labels
│   ├── team.yml          # lab members          (managed by widget Team tab)
│   ├── publications.yml  # papers               (managed by widget Publications tab)
│   └── fieldwork.yml     # expeditions          (managed by widget Fieldwork tab)
├── _includes/            # reusable HTML snippets (head, nav, footer, news-card, lightbox)
├── _layouts/             # page templates (default, page, news)
├── _news/                # one Markdown file per news item (managed by widget News tab)
├── _sass/                # styles (tokens, base, layout, components, animations)
├── _plugins/             # local-only Ruby polyfill for Jekyll 3.9 on Ruby 3.3+
├── assets/
│   ├── css/main.scss     # stylesheet entry point
│   ├── js/               # reveal animations, mobile nav, email obfuscation, external links
│   └── images/           # team-hero, favicon, plus per-section subfolders
├── html/                 # standalone HTML embeds (e.g. interactive 3D figures linked from news)
├── widget/               # double-click local editor (writes to _data/, _news/, assets/)
├── bin/
│   ├── serve             # local preview server with livereload
│   └── build             # one-shot static build into _site/
├── index.html            # home page
├── team.html             # team page (includes Prospectives block)
├── research.html         # research page
├── publications.html     # publications page
├── teaching.html         # teaching page
├── fieldwork.html        # field work page (map + per-expedition galleries)
├── news.html             # news listing page (paginated)
├── CNAME                 # tells GitHub Pages to serve cunhalab.com
├── .ruby-version         # pins Ruby to 3.3.6 for rbenv
└── Gemfile               # Ruby dependencies
```

---

## Design tokens

Colors, fonts, and spacing live in `_sass/_tokens.scss`. Change a value
there and it propagates everywhere via SCSS variables.

```scss
$color-primary: #2F5D56;   // forest-teal, the lab's main color
$color-accent:  #7A0019;   // Loyola maroon, used sparingly
$color-bg:      #F7F7F8;   // page background, barely-there gray
```

---

## Deployment reference

The site is published from `tcunha-lab/tcunha-lab.github.io` on GitHub
Pages, branch `main`, root folder. Pages settings: Source = Deploy from
a branch, Branch = `main` / `/`.

### Custom domain (cunhalab.com via Cloudflare)

The `CNAME` file at the repo root tells GitHub Pages to serve from
`cunhalab.com`. DNS lives at Cloudflare with these records:

| Type  | Name | Value                  | Proxy status |
| ----- | ---- | ---------------------- | ------------ |
| A     | @    | `185.199.108.153`      | DNS only     |
| A     | @    | `185.199.109.153`      | DNS only     |
| A     | @    | `185.199.110.153`      | DNS only     |
| A     | @    | `185.199.111.153`      | DNS only     |
| AAAA  | @    | `2606:50c0:8000::153`  | DNS only     |
| AAAA  | @    | `2606:50c0:8001::153`  | DNS only     |
| AAAA  | @    | `2606:50c0:8002::153`  | DNS only     |
| AAAA  | @    | `2606:50c0:8003::153`  | DNS only     |
| CNAME | www  | `tcunha-lab.github.io` | DNS only     |

Important: keep Cloudflare's proxy on **DNS only** (gray cloud), at
least at first, so GitHub Pages can issue and renew its Let's Encrypt
SSL certificate without the orange-cloud proxy interfering. After SSL
is stable you *can* flip to orange if you want Cloudflare's CDN — but
the site is small enough that it doesn't really need one.
