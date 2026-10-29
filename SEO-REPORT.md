# SEO report — industryx0.pro (CIPA by Industry X.0)

Branch `hamza-src`, 13 commits on top of `a28c6c2` (29 October 2026).
Everything below was checked on a production build (`next build && next start`)
crawled by `npm run audit:seo`, plus Lighthouse (mobile) on three pages.

**Bottom line.** All 52 URLs (26 pages × FR/EN) now pass every automated check
except one: the French home title is 66 characters, because it is the exact
title the brief asked for. Search engines now get unambiguous entity data
(CIPA declared as the organisation's alternate name), keyword-first titles,
social cards for every page, crawlable navigation, and real `lastmod` dates.
English URL slugs were **not** migrated (see section 6).

---

## 0. What the codebase looks like (Phase 1)

- **Next.js 14.2 App Router**, TypeScript, Tailwind. i18n with **next-intl 3**:
  French at `/`, English under `/en` (`localePrefix: 'as-needed'`,
  `src/middleware.ts`, `src/i18n/routing.ts`). Bilingual copy lives next to
  the markup (`{ fr, en }` objects) or in `*.en.ts` overlays.
- **Metadata:** each layout or page calls `generateMetadata`. A shared helper now
  lives in `src/lib/seo/metadata.ts` (it was in `src/lib/i18n.ts`).
- **Sitemap / robots:** `src/app/sitemap.ts`, `src/app/robots.ts`; page list in
  `src/lib/site.ts` (`publicPaths()`, guarded by `tests/site.test.ts`).
- **Components:** nav `src/components/layout/Navbar.tsx`; hero H1
  `src/components/sections/Hero.tsx`; sector tiles
  `src/components/sections/CipaSection.tsx`; logo carousel
  `src/components/ui/LogoMarquee.tsx`; footer
  `src/components/layout/Footer.tsx`; testimonials
  `src/components/sections/TestimonialsSection.tsx`; guides
  `src/app/[locale]/resources/[slug]/page.tsx` + `src/lib/data/guides*.ts`;
  FAQ `src/components/sections/FaqSection.tsx` + `src/lib/data/faq.ts`.
- **Routes (×2 languages):** `/`, `/entreprise`, `/customers`, `/partners`,
  `/contact`, `/privacy`, `/conditions-utilisation`, `/resources`, 4 guides,
  7 platform pages (`/plateforme/remontee-terrain`, `planification-maintenance`,
  `gestion-ecarts`, `conformite-tracabilite`, `pilotage-performance`,
  `intelligence-operationnelle`, `integrations`), `/plateforme/entiwin`,
  6 industry pages (`pharma`, `food`, `cosmetics`, `automotive`, `electronics`,
  `packaging`).

**Where the brief and the code disagreed** (the code won):

- There is no `/faq` page: `/faq` redirects to the home `#faq` section. So the
  **FAQPage** schema is on the home page, built from that section.
- `/plateforme/terrain` no longer exists. It redirects to
  `/plateforme/remontee-terrain`, the first of seven platform pages. There is
  no platform overview page.
- « Voir la plateforme » linked to `/#solutions`, not `/contact`.
- The logo carousel already hid its duplicate set (`aria-hidden`, `alt=""`).

---

## 1. Changes made

### A. Brand visibility & structured data — `3d770fc`
- `src/components/seo/JsonLd.tsx` and `src/lib/seo/schema.ts`: one helper and
  typed builders. The output is escaped so no `</script>` can break out (tested).
- **Organization** on every page (`src/app/[locale]/layout.tsx`): name
  Industry X.0, `alternateName` CIPA / CIPA by Industry X.0, logo, email,
  phone, PostalAddress (Cité les pins, 1053, Tunis, TN), `sameAs` LinkedIn
  and Facebook.
- **Home** (`src/app/[locale]/page.tsx`): **WebSite** (per language,
  `inLanguage`), **SoftwareApplication** CIPA (`BusinessApplication`, no
  rating, review or price), **FAQPage** from the FAQ section's own data.
- **Platform pages:** SoftwareApplication (with the page's features as
  `featureList`) + **BreadcrumbList**. Enti Win gets its own
  SoftwareApplication (`operatingSystem: Web`, its external URL).
- **Industry pages:** BreadcrumbList. **Guides:** **Article** (headline,
  description, image, `datePublished`, `dateModified`, author, publisher,
  `inLanguage`) + BreadcrumbList.
- Brand constants: `BRAND` in `src/lib/site.ts`; `SOCIAL_PROFILES` in
  `src/lib/data/socials.ts`; structured address fields in
  `src/lib/data/contact.ts`. The site's existing single-source modules (URL,
  contact, socials) were extended rather than merged into one file, to avoid
  churning every import.

### B. Titles & meta descriptions — `b94e1fe`
- `src/lib/seo/pages.ts`: **one registry** of title + description for every
  static page. Platform, industry and guide pages keep theirs in their data
  files (`metaTitle`/`metaDescription`, new on guides).
- `pageMetadata` appends the brand once: `<topic> | CIPA` (`| Industry X.0`
  for Enti Win, a different product).
- New keyword-first copy for all 52 URLs. Titles are 50–60 characters and
  descriptions 140–160, each ending with a call to action. Every claim comes
  from the existing copy (e.g. the 45-minute demo and 24 h reply on contact).
- Home: FR `Logiciel qualité, audits & non-conformités pour l’industrie | CIPA`,
  EN `Quality, audit & CAPA software for manufacturing | CIPA`.
- **Meta keywords removed.** Home metadata moved from the root layout to the home
  page, so no page can inherit the home canonical by accident.
- `tests/seo.test.ts` enforces: every page has metadata, no duplicates,
  lengths in range.

### C. Open Graph & social cards — `352a092`
- `src/app/og/[image]/route.tsx`: a **1200×630 card per page and language**
  (`/og/fr__plateforme__gestion-ecarts.png`…). It shows the CIPA logo, a
  section label and the page title on the dark/gold brand colours, in the
  site's fonts (Syne, Outfit). The TTFs are committed under the SIL OFL licence.
- Every page sets `og:url`, `og:site_name`, `og:image` (+ width, height,
  `og:image:alt`), `og:locale` `fr_FR`/`en_US`, `og:locale:alternate`, and
  `twitter:card` `summary_large_image`.
- The route runs on the **Edge runtime**: `next/og`'s Node build crashes on
  Windows in Next 14.2 (`path.join` on a `file://` URL), which would break
  local builds. Cards render on first request and are cached for a day
  (`s-maxage` one week).

### D. Internal linking — `f19bea3` (+ two links in `1cfbdef`)
- **Sector tiles** (`CipaSection.tsx`) link to their page when one exists:
  Pharma → `/industries/pharma`, Agroalimentaire → `/industries/food`,
  Dispositifs médicaux → `/industries/cosmetics`. The mismatch is a TODO (§4).
- **Footer:** new **Industries** column (six pages) and **Customer stories**
  (`/customers`) in both languages.
- **« Voir la plateforme »** → `/plateforme/remontee-terrain`.
- **Navigation:** every dropdown entry is now an `<a href>` in the server
  HTML, in a `hidden` list (out of view, focus order and screen readers).
- **Guides:** contextual links in the body text (FR and EN) to the relevant
  platform pages. Paragraph blocks gained an optional `links` field, and a
  test checks each linked phrase exists in both languages.
- Links to home anchors now render `/en#faq`, not `/en/#faq` (a duplicate URL).
- Vague anchors replaced: « Explorer » → « Explorer la plateforme »; cookie
  banner « En savoir plus » → « Politique de confidentialité ».

### E. Headings & accessibility — `1cfbdef`
- A real space now separates heading lines split over block spans or `<br>`:
  home H1 and H2s, platform and industry H1s, customers, contact and company
  headings. Text extraction no longer reads « opérationssont » or
  « transformevos ».
- FAQ numbers are `aria-hidden` and spaced from the question.
- Heading order: the SDG title and the industry « démarche » steps went from
  H4 to H3 (same styling). One H1 per page everywhere.
- SDG pictograms now have localized alt text. The language-switch flags keep
  `alt=""`.

### F. Sitemap, hreflang & robots — `5338b1e`
- `src/lib/seo/lastModified.ts`: guides use their content date (`updated`,
  else `date`). Other pages use the date of the last commit touching their
  own source files. Without full git history, `lastmod` is omitted rather than
  faked. `deploy.yml` now checks out with `fetch-depth: 0`.
- `x-default` (→ French) added to the sitemap. It was already in the `<head>`.
- robots.txt: `Host` removed; `Disallow: /api/` and the sitemap kept.

### G. English slugs — not done
See section 6. `TODO(seo)` in `src/i18n/routing.ts` (`b3d0240`).

### H. Content credibility — `01b21b0`
- `TODO(seo)` on the home statistics. No source was invented.
- Guide headers show « Publié le … » and, when an `updated` date is set,
  « Mis à jour le … ». The author was already visible.

### I. Performance — `93007ba`, `b08fa8a`
- The 8625 px `logo.png` was declared at full width in the customer
  constellation and the partner orbit, so browsers fetched a **3840 px** file
  for a ~150 px logo. It now has `sizes`.
- `sizes` added to client/partner logos, SDG icons, the welcome logo, the home
  hero, and the 16–20 px language flags (which shipped up to 3840 px).
- `priority` is now only on each page's hero image. The navbar logo loads
  eagerly without priority. The welcome-intro logo (Lighthouse's LCP element
  on the home page) is no longer lazy.
- Fonts already used `next/font` with `display: swap`; no layout shift
  measured (CLS ≤ 0.001).

---

## 2. Re-audit results

`npm run audit:seo` (`scripts/seo-audit.mjs`) on the production build, every
URL in the sitemap. *Before* = commit `a28c6c2`.

| Check (52 URLs) | Before | After |
|---|---|---|
| HTTP 200, no redirect chains, no broken internal links/images | ✅ | ✅ |
| Exactly one `<title>` | ✅ | ✅ |
| Title 50–60 characters | ❌ 38 pages | ⚠️ 1 page — FR home, 66 chars, title imposed by the brief |
| Title unique | ❌ 4 pages | ✅ |
| Meta description present / 140–160 / unique | ❌ 32 out of range | ✅ |
| No meta keywords | ❌ 52 | ✅ |
| Exactly one H1 | ✅ | ✅ |
| H1 without merged words | ❌ 22 | ✅ |
| Other headings without merged words | ❌ 6 pages | ✅ |
| Heading order without skipped levels | ❌ 14 | ✅ |
| Self-referencing absolute canonical | ✅ | ✅ |
| hreflang fr / en / x-default in `<head>` | ✅ | ✅ (and now in the sitemap) |
| Correct `<html lang>` | ✅ | ✅ |
| `og:title`, `og:description`, `og:image`, `og:url` | ❌ 52 (no image, no url) | ✅ |
| `twitter:card` `summary_large_image` | ❌ 44 (guides only had it) | ✅ |
| Content images have alt text, in the page's language | ✅ (SDG icons empty) | ✅ |
| JSON-LD valid, expected `@type`s | ❌ none | ✅ |
| No `noindex` on indexable pages | ✅ | ✅ |
| Every sitemap URL linked from another page | ✅ | ✅ |
| No linked page missing from the sitemap | ❌ `/en/` duplicate | ✅ |
| Sitemap `lastmod` | one build timestamp | 9 distinct real dates |
| robots.txt `Host` line | present | removed |

`npm run check:i18n`: no French left on the 26 English pages.

### Lighthouse (mobile, local)

Both builds used the local server as site URL so the canonical audit is
meaningful. Measured on the same machine while a `next dev` server was also
running: ±3 points of performance is run-to-run noise. The *after* run predates
the last commit (eager intro logo).

| Page | Perf | SEO | Accessibility | Best practices | LCP | Page weight |
|---|---|---|---|---|---|---|
| Home | 81 → 80 | 100 → 100 | 91 → 92 | 100 → 100 | 4.3 → 4.6 s | 841 → 723 KB (images 299 → 136 KB) |
| `/industries/pharma` | 81 → 79 | 100 → 100 | 90 → 92 | 100 → 100 | 4.7 → 5.1 s | 580 → 629 KB |
| Guide `non-conformites-capa` | 86 → 85 | 100 → 100 | 100 → 100 | 100 → 100 | 4.1 → 4.3 s | 510 → 520 KB |

Lighthouse's SEO category only checks basics, which the site already passed.
The gains of this work show in the audit table above, not in this column. The
remaining performance lever is LCP (see §3, item 7).

---

## 3. New issues found in Phase 3

| # | Issue | What I did |
|---|---|---|
| 1 | **FAQ answers were JavaScript-only.** Only the open answer existed in the DOM; the other four existed only in the JSON-LD. | **Fixed** (`e892afc`): all answers rendered, collapsed in CSS, `aria-hidden` while closed. Same look. |
| 2 | **404 page** was Next's default English page, outside the site layout, with no links. | **Fixed:** localized `[locale]/not-found.tsx` (nav, footer, four useful links) + `[locale]/[...rest]` catch-all. Status is a real **404** + `noindex`. In Next 14.2 its HTML is a shell that renders the page on hydration; harmless for SEO (noindex), would resolve with Next 15. |
| 3 | **No security headers**; `X-Powered-By: Next.js` exposed. | **Fixed:** HSTS (1 year, no `includeSubDomains`), `nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`; powered-by off. **Not added:** Content-Security-Policy. It needs a tested policy for Next's inline scripts, GA4 and PostHog. |
| 4 | **No web manifest.** | **Fixed:** `/manifest.webmanifest` with the existing icons. `/favicon.ico` is still 404, but every page declares `/icon.png` (512 px) and `/apple-icon.png`, which is what Google uses. |
| 5 | `/#anchor` links rendered as `/en/#faq`, a duplicate of `/en`. | **Fixed** (nav, footer, customers, company). |
| 6 | `next/og` (Node) crashes on Windows in Next 14.2. | **Worked around** with the Edge runtime (see C). |
| 7 | **LCP 4–5 s on mobile:** hero headings and images start at `opacity: 0` and wait for framer-motion to hydrate. On the pharma page the LCP element is the H1 text itself. | **Not fixed** (motion design). Biggest remaining win: make above-the-fold entrances CSS-only, or start them visible. |
| 8 | **Colour contrast:** brand gold `#DAA250` used as text on light backgrounds (industry H1 accents, « Découvrir la fonctionnalité » links, the customers CTA accent). `lib/tokens.ts` itself says to use `gold-deep` there. | **Not fixed** (visual change). Swap to `gold-deep`. |
| 9 | **Touch targets:** carousel dots are 8–10 px. | **Not fixed** (visual). Enlarge the hit area with padding around the dot. |
| 10 | `sharp` is not installed, so production image optimisation uses Next's slow fallback encoder. | **Not added:** it is a native binary, and the README notes Windows application control already blocks native rollup. Test `npm i sharp` on a dev machine first; it would also make AVIF practical. |
| 11 | `skipTrailingSlashRedirect` makes `/entreprise/` return 200 alongside `/entreprise`. | **Left:** the canonical points to the clean URL. A redirect would sit next to the PostHog proxy rule. |
| 12 | `.dockerignore.txt` is not read by Docker (the file must be named `.dockerignore`), so `.env.local` and `.git` enter the Docker build context. | **Not changed** (deploy uses the zip workflow, not Docker). Rename it if Docker is used. Note that excluding `.git` means no `lastmod` in Docker builds. |
| 13 | French pages use English slugs (`/customers`, `/partners`, `/privacy`, `/resources`): the mirror image of G. | Listed; same decision as G. |
| 14 | **Missing pages** that searches would expect: pricing, security & compliance (footer « Sécurité » points to an anchor on `/resources`), an industries index, case studies. | Listed for the owner; no pages invented. |
| 15 | **Thin or duplicate content:** the 7 platform pages share 3 hero images. `guides.ts` says the guides are *drafts* to validate (« en particulier `author` et `date` »). | Listed. Validate the guides before promoting them. Their dates now drive `datePublished` and the sitemap. |

---

## 4. TODOs for the owner (`TODO(seo)` in the code)

| File | Line | Decision needed |
|---|---|---|
| `src/components/sections/CipaSection.tsx` | 40 | Home sector tiles vs industry pages. **No page:** Nutraceutique & santé, Chimie & matières premières, Industrie manufacturière, Distribution & logistique, Autres secteurs. **No tile:** automotive, electronics, packaging; cosmetics only via « Dispositifs médicaux ». Create pages or align the tiles. |
| `src/components/sections/HowItWorks.tsx` | 36 | +30 % / 2,5x / −25 % cite only « Industry X.0 field experience ». Provide the method (scope, sites, period, calculation) or a publishable source, or present them as orders of magnitude. |
| `src/lib/seo/schema.ts` | 101 | `operatingSystem: "Web, iOS, Android"` comes from the brief; the site never names an app store. Confirm native apps exist, otherwise set `Web`. |
| `src/lib/data/socials.ts` | 17 | Facebook is in `sameAs`, but its footer link was removed on 28/10. Confirm `facebook.com/industryx.0` is still the official page. |
| `src/i18n/routing.ts` | 13 | English URL slugs (see section 6). |

Also not marked in code: the street is spelled « Cité les pins » across the site
(the brief wrote « Cité les Pins »); fix it once in `src/lib/data/contact.ts` if
needed.

---

## 5. Manual tasks outside the code

1. Verify the site in **Google Search Console** and **Bing Webmaster Tools**;
   submit `https://www.industryx0.pro/sitemap.xml`.
2. Create and complete a **Google Business Profile** for the Tunis office
   (same name, address and phone as the Organization schema).
3. After deploying, validate a few URLs in Google's **Rich Results Test**
   (home, a guide, a platform page). Check a page in the LinkedIn Post
   Inspector to warm the social card.
4. Ask partners (**Novation City, The Dot, GIZ**) and clients for links from
   their partner or supplier pages.
5. Get listed in the **Startup Act** directory and in Tunisian tech/industry press.
6. Publish **1–2 guides a month**: non-conformités / CAPA software, audit
   qualité, BPF/GMP pharma audits, ISO 22000, IATF 16949, digitalisation
   qualité Tunisie. Each guide needs a `metaTitle`, `metaDescription`, `date`,
   at least one in-text `links` entry, and an English overlay.
7. Build **case-study pages** (Médis, Saiph, Warda…) with real, approved numbers.
8. Pick up §3 items 7–9 (LCP, contrast, touch targets) with design sign-off.

---

## 6. Deliberately not done

- **English slugs (G).** A safe migration means switching next-intl to typed
  `pathnames`, rewriting about 40 hard-coded internal links (many with
  `#section` anchors), and translating slug values in the language switcher.
  It also needs a 301 for every old `/en/…` URL, and there is no browser test
  suite to catch a broken link. The brief allows skipping it.
  **Suggested plan:**
  1. Add `pathnames` for the static routes (`/entreprise` → `/en/company`,
     `/plateforme/*` → `/en/platform/*`).
  2. Add an `enSlug` to platform and guide data and resolve it in their routes.
  3. Use a `localizedHref()` helper everywhere, plus redirects generated from
     the same table.
  4. Run `npm run audit:seo` to catch any 404 or redirect chain.
- **Visual changes** beyond what the brief asked (contrast, touch targets,
  motion): listed in §3 for design sign-off.
- **Content-Security-Policy**, **sharp**, **favicon.ico**: see §3.
- **No invented facts**: no ratings, prices, customer numbers, sources or
  dates were added; the open questions are the TODOs in §4.

---

## How to re-run

```bash
npm run build && npm start          # in one terminal
npm run audit:seo                   # BASE_URL=http://localhost:3000 by default
npm run check:i18n                  # French left on English pages
npm test                            # includes tests/seo.test.ts
```
