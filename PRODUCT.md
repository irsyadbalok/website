# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Parents choosing a school** in and around Kuantan, usually on a phone, deciding where to enrol a primary-age child.
- **Corporate sponsors and donors** being approached for sponsorship. They need to see a credible, registered education institution, not only a small private school.
- **Current parents** checking dates and news, and **staff** reaching their portals. Secondary.

## Product Purpose

The public website of Akademi Pendidikan Irsyad Balok, with Sekolah Rendah Islam Al-Irsyad Balok (SRAIB) built first. It must make a first-time visitor understand what kind of institution this is, trust it, and act: register a child, contact the office, or open a sponsorship conversation. Success is management approval of the prototype, then editors publishing without help.

## Positioning

An Islamic education institution, founded by the local community in 2000 on waqf land, registered with the Ministry of Education (KPM school code CYR4003) and the Pahang Islamic Religious Department. It forms character first ("Ke Arah Pembentukan Insan Rabbani") and delivers both the national curriculum and religious studies under one roof, with the same school life a national school offers.

Message priority, as confirmed by the maintainer:

1. Character first (insan Rabbani, tarbiyah, adab).
2. Religious studies are offered alongside the national curriculum (KAFA, UPKK, Jawi, Arabic, Al-Quran).
3. School life as lively as a KPM school: uniformed bodies, clubs, sports houses.
4. History.

## Operating Context

- Part of a three-unit academy: SRAIB (primary), SMAIB (secondary), TATIB (tahfiz). One domain, one repository, each unit a path.
- Registration, parent and staff portals are run by Awfatech and are linked, not replaced.
- Content comes from the school's annually updated Buku Pengurusan. Editors will use Pages CMS forms.
- Long-term goal: the web product becomes an installable app (PWA, then store apps), alongside a staff attendance app.

## Capabilities and Constraints

- Static Astro site, no JavaScript required for content, about 90 KB per page excluding images.
- Bilingual: Bahasa Melayu default, English under `/en/`.
- Must work on phone, tablet and desktop.
- Public repository: no staff rosters, pupil data or keys.
- Names published: the five administrators, plus unit committee office-bearers only. Ordinary teachers are never listed.
- Online payments (ToyyibPay for fees) are on hold.
- Undecided: academy-level (APIB) text and contact details; admission requirements, intake dates and fees; school term calendar.

## Brand Commitments

- Name: Sekolah Rendah Islam Al-Irsyad Balok (SRAIB); "Al-Irsyad" means guidance.
- Motto: "Ke Arah Pembentukan Insan Rabbani".
- Logo: a pointed arch (Kubah Islamik, Gerbang Jalan Kejayaan) holding a green field (Amal), a pen (Kalam) and an open book (Ilmu Al-Quran). The school likens it to a tree that bears fruit in every season (Surah Ibrahim, verse 25).
- Logo colours and their stated meanings: turquoise blue (knowledge), green (Islam), blue (breadth), black (steadfastness).
- Must not feel childish or flashy.

## Evidence on Hand

- Buku Pengurusan sesi 2026: Tinta Guru Besar, history, profile, vision and mission, unit directions, co-curricular calendar.
- Logo raster extracted from the book (`public/images/logo-sraib.webp`).
- Facts: founded 2000 with 25 pupils and 3 teachers in a rented house; waqf building in year two; three acres of waqf land; 69 teachers in 2026; four uniformed bodies; four sports houses (Hunain, Badar, Khaibar, Mu'tah).
- Photographs: none yet. The maintainer expects a good set soon. Do not fabricate photographs of the school or pupils.
- No testimonials, results statistics, sponsor names or fee figures exist. Do not invent them.

## Product Principles

1. Institution, not brochure: every screen should read as a registered, accountable place of education.
2. Character leads, proof follows: state what the school forms, then show the programme that does it.
3. One tap to act: registration and contact are never more than one tap away.
4. Nothing stale presented as current: doubtful facts carry a visible marker.
5. Built to be handed over: content in plain files, design reusable by SMAIB and TATIB.

## Accessibility & Inclusion

WCAG 2.1 AA. Low-end Android phones on mobile data are the baseline device.
