# Design

The visual system of the Irsyad Balok website. Chosen by the maintainer on 4 October 2026 from three directions: the conventional institutional layout, in the colours of the SRAIB logo. Reference he named for structure: a Malaysian government agency site (hub, then a clean home page that links out to detail pages).

## Principles

1. **Clean home pages.** A home page states who the institution is and links onward. Detail lives on its own page.
2. **Institution first.** Registration codes sit directly under the opening section. The tone is formal, never childish or flashy.
3. **Works without photographs.** The opening section shows the school crest until a real photo is set in the CMS (`gambar_utama`). Photos are never invented.
4. **One system for every unit.** SMAIB and TATIB reuse these tokens and components; only content and menu change.

## Tokens (`src/styles/global.css`)

| Token | Value | Role |
| --- | --- | --- |
| `--nila` | `#221e72` | Primary: opening sections, page-title bands, buttons, links |
| `--nila-tua` | `#171450` | Top bar, footer, hover |
| `--langit` | `#7cc8f0` | Primary button on indigo, highlights |
| `--langit-lembut` | `#e8f5fc` | Quiet band, quotations |
| `--hijau` | `#0e6b38` | Tile top edge, dates, current menu item |
| `--kertas` | `#f6f7fb` | Alternate section ground |
| `--dakwat` / `--dakwat-lembut` | `#15133d` / `#4a4877` | Text and secondary text |
| `--garis` | `#d9daea` | Rules and borders |
| `--kuning` | `#f3d53b` | Urgent notice, focus ring on dark grounds |

Colours come from the logo. The school gives them meanings: turquoise blue for knowledge, green for Islam, blue for breadth.

## Type

- Headings: Poppins 600 and 700, self-hosted.
- Text: Open Sans (variable), self-hosted.
- Scale: h1 `clamp(2rem, 3.6vw + 1rem, 3.4rem)`, h2 `clamp(1.45rem, 1.4vw + 1rem, 2rem)`, h3 `1.15rem`, body `1.0625rem` at line-height 1.6. Running text is capped at 44rem.

## Layout

- Container `72rem`, side gutter `clamp(1rem, 4vw, 2.5rem)`.
- Breakpoints: 36rem (tiles go two-up), 56rem (two-column sections, crest appears), 62rem (menu on one line, tiles four-up). Below 62rem the menu is a single row that scrolls sideways.
- Sections alternate white, `--kertas` and `--langit-lembut`.

## Components

| Class | What it is |
| --- | --- |
| `.jalur-atas` | Top utility bar: link back to the academy hub, language switch |
| `.kepala`, `.jenama`, `.menu` | Header with the unit's own menu and a Register button |
| `.pembuka` | Opening section: indigo cloth ground with crest, or a photo with an indigo overlay when `gambar_utama` is set |
| `.jalur` | The tie-stripe divider in green, sky and white. The one decorative signature; use once per page |
| `.butiran` | Registration facts strip |
| `.jubin` | Link tiles. `.empat` for four, `.besar` for the unit chooser, `.pegun` for a unit that is not built yet |
| `.petikan` | Short quotation band |
| `.senarai` | Dated lists for news and events (`.lebar` puts the date in its own column) |
| `.tajuk-halaman` | Indigo page-title band on detail pages |
| `.prosa` | Markdown content: headings, lists, tables, quotations |
| `.nota` | Awaiting-confirmation note (yellow) or information note (`.biru`) |
| `.butang` | Button; `.kedua` outline, `.kecil` compact |

## Rules

- No JavaScript is needed to read or navigate the site.
- Side-stripe borders on cards and notes are not used; tiles carry a top edge instead.
- Every image needs alt text; a news post with a photo and no alt text fails the build.
- Target: WCAG 2.1 AA. Focus rings are indigo on light grounds and yellow on indigo.

## Not yet done

- An independent design review and a full accessibility audit.
- Dark theme (the attendance app has one; the website does not).
- Alignment with the attendance app's look (system fonts, green `#0b5d4b`).
