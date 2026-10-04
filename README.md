# irsyadbalok.com.my website

Static website for Akademi Pendidikan Irsyad Balok. Phase 0 covers the academy hub and the full SRAIB section. SMAIB and TATIB are added later as content folders.

- **Framework:** Astro 7.3.5 (pinned). Needs Node 22.12 or later.
- **Editor:** Pages CMS, configured in `.pages.yml`. Editors fill in forms; they never touch HTML.
- **Hosting:** any static host. The GitHub Pages workflow is in `.github/workflows/deploy.yml`.
- **Languages:** Bahasa Melayu at `/`, English at `/en/`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (once) |
| `npm run dev` | Live preview at http://localhost:4321 |
| `npm run build` | Build the site into `dist/` |
| `npm run check:links` | Fail if any internal link in `dist/` is broken |

## Where things live

| Path | Purpose |
| --- | --- |
| `src/content/halaman/ms/…` | Fixed pages in BM. The file path is the URL: `ms/sraib/profil.md` is `/sraib/profil/` |
| `src/content/halaman/en/…` | English twins. A missing twin falls back to the BM text with a label |
| `src/content/berita/` | News posts. Only `status: terbit` is published |
| `src/content/takwim/2026.yaml` | Calendar events |
| `src/content/tetapan/laman.yaml` | Phone, address, portal links, donation links, urgent notice |
| `src/content.config.ts` | The rules each content file must follow |
| `src/pages/[...path].astro` | Generates every URL in both languages |
| `src/views/` | One template per page type |
| `src/layouts/Base.astro` | Header, menus, footer |
| `src/styles/global.css` | Colours, type and layout |
| `src/lib/i18n.ts` | Menus and interface text in both languages |

## Adding content without code

- **A new fixed page:** add a Markdown file under `src/content/halaman/ms/sraib/`. It gets a URL and appears in the "Lagi dalam bahagian ini" list automatically.
- **A new unit (SMAIB, TATIB):** add `src/content/halaman/ms/smaib/…`, then add a menu list in `src/lib/i18n.ts` and a home view modelled on `SraibUtama.astro`.
- **A payment or donation link:** add an entry under `sumbangan` in `laman.yaml` (empty for now; payments are on hold).

## Moving to another host

`npm run build` produces plain files in `dist/`. Upload that folder to any web host (cPanel `public_html`, Cloudflare Pages, Netlify). If the site is not at the root of the domain, build with `BASE_PATH=/subfolder`.

## Content source

Text was taken from *Buku Pengurusan SRI Al-Irsyad Balok, sesi 2026*. English pages are translations and need review by the school. Pages that carry a yellow "Menunggu pengesahan sekolah" note contain facts the school must confirm.

## Privacy rule for this repository

The repository is public. Never commit staff lists, phone lists, pupil data, passwords or API keys.
