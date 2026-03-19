# NeuroVeda ADHD + Ayurveda Planner — Gemini One-Shot Prompt Template

> **How to use this file:**
> 1. Fill in every `{{PLACEHOLDER}}` with your chosen values (see the Variables section below).
> 2. Copy the entire block inside the code-fence in Section 1.
> 3. Paste it into [Google Gemini](https://gemini.google.com) (Gemini 1.5 Pro or later recommended).
> 4. Follow the print-prep checklist in Section 7 before sending to your printer.

---

## Table of Contents

| # | Section | Purpose |
|---|---------|---------|
| 1 | [One-Shot Gemini Prompt](#1-one-shot-gemini-prompt) | Copy-paste into Gemini |
| 2 | [Placeholder Variables](#2-placeholder-variables) | Customise before pasting |
| 3 | [Print-Ready Output Instructions](#3-print-ready-output-instructions) | B5, CMYK, bleed, margins |
| 4 | [Table of Contents & Page Blueprint](#4-table-of-contents--page-blueprint) | Section layout for the planner |
| 5 | [ADHD-Friendly Design Rules](#5-adhd-friendly-design-rules) | Non-negotiable constraints |
| 6 | [QR-Code Placeholder List](#6-qr-code-placeholder-list) | 14 resource links |
| 7 | [PDF Export Checklist](#7-pdf-export-checklist) | Pre-press checklist |
| 8 | [Investor-Safe Disclaimer Template](#8-investor-safe-disclaimer-template) | Wellness/no-medical-claims copy |

---

## 1. One-Shot Gemini Prompt

Copy everything inside the triple-backtick fence below and paste it directly into Gemini.

```
You are a professional planner designer and Ayurvedic wellness copywriter.

Create a complete, ready-to-print NeuroVeda ADHD + Ayurveda Planner with the following specifications.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOK SPECS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Trim size       : {{TRIM_SIZE}}             (default: B5 / 176 × 250 mm)
• Total pages     : {{TOTAL_PAGES}}           (default: 180 pages)
• Colour mode     : {{COLOUR_MODE}}           (default: CMYK — no RGB values)
• Interior style  : {{INTERIOR_STYLE}}        (default: Warm cream + terracotta + sage green)
• Font pairing    : {{FONT_PAIRING}}          (default: Heading — Playfair Display; Body — Nunito)
• Binding         : {{BINDING_TYPE}}          (default: Perfect-bound / lay-flat spiral)
• Language        : {{LANGUAGE}}              (default: English)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLANNER IDENTITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name   : NeuroVeda — The ADHD-Aware Ayurvedic Planner
Tagline: "Plan with your brain, not against it."
Audience: Adults with ADHD or executive-function challenges who resonate with
          Ayurvedic rhythms (Vata / Pitta / Kapha doshas).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY ADHD-FRIENDLY DESIGN RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Maximum 3 tasks per day — never more. Label them "Today's 3 Seeds".
2. ALL dated fields are UNDATED (user fills in the date) — no pre-printed month/year.
3. Use ONLY guilt-free, non-shaming language (see word list below).
   BANNED words: "failed", "missed", "incomplete", "behind", "should have",
                 "didn't", "lazy", "procrastinated", "wasted".
   PREFERRED words: "rescheduled", "carried forward", "rest was needed",
                    "tomorrow is fresh", "gentle reset".
4. Every day spread includes a 1-line "Body Check-In" (energy level 1–5, dosha emoji).
5. Weekly spread includes a "Nervous System Snapshot" (3 words, no sentences needed).
6. White space ratio: minimum 40% per spread — never fill every box.
7. Icons replace long instructions wherever possible (max 6-word captions).
8. All habit trackers use circles, not checkboxes (circles feel less punitive).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT TO GENERATE — SECTION BY SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generate full copy, layout descriptions, and page-by-page instructions for each
section listed below. For each page/spread, output:
  [PAGE X] Title
  Layout description (columns, zones, box sizes)
  All body copy / prompts / labels (print-ready text, no placeholders)
  Any colour-zone or icon callouts

SECTIONS (follow this order):

[FRONT MATTER — pages 1–12]
  p.01      Half-title page
  p.02      Blank (verso)
  p.03–04   Full-bleed cover spread (describe artwork + colour palette)
  p.05      Full title page (title, tagline, edition, disclaimer line)
  p.06      Copyright & disclaimer page (use the investor-safe template verbatim — see below)
  p.07–08   "How This Planner Works" — 2-page visual guide
  p.09–10   Dosha Discovery Quiz (Vata / Pitta / Kapha — 10 questions, illustrated)
  p.11–12   "My Dosha Profile" fill-in page + colour key legend

[ANNUAL VISION — pages 13–28]
  p.13–14   Year at a Glance (undated 12-month grid, 2 pages)
  p.15–16   Annual Intentions (3 themes × 3 intentions each)
  p.17–18   "Wheel of Ayurvedic Life" reflection (8 segments, rate 1–10)
  p.19–20   Word of the Year + Sankalpa (Sanskrit intention-setting)
  p.21–22   Seasonal Rhythms overview (Vata/Pitta/Kapha seasons mapped to calendar)
  p.23–24   Habit Roots — 12 monthly habit circles (1 habit per month)
  p.25–26   Reading + Learning list (books, podcasts, courses)
  p.27–28   Gratitude Soil — annual gratitude log (52 lines, one per week)

[QUARTERLY REVIEW — pages 29–44  (×1, user copies for each quarter)]
  p.29–30   Quarterly Compass (goals, theme, dosha focus)
  p.31–32   Quarter Brain-Dump (free-write zone, lined + dotted)
  p.33–34   Project Runway (3 projects × timeline bar)
  p.35–36   Energy Budget (4 quadrants: Must-do / Love-to / Delegate / Release)
  p.37–38   Body + Mind Care plan (sleep, meals, movement, nature, rest)
  p.39–40   Relationship Nourishment (5 people to appreciate this quarter)
  p.41–42   Quarter-End Reflection (what bloomed / what can compost)
  p.43–44   "Carry Forward" page (guilt-free reschedule zone)

[MONTHLY SPREADS — pages 45–88  (2 pages × 12 months = 24 monthly spread pages + 20 bonus/toolkit pages = 44 pages total)]
  Left page  : Month overview grid (undated, 5 rows × 7 cols)
  Right page : Monthly intentions (3 tasks, moon phase tracker, dosha tip)

[WEEKLY SPREADS — pages 89–152  (2 pages × 32 weeks = 64 pages)]
  Left page  : 4-day spread (Mon–Thu) — each day: Today's 3 Seeds, Body Check-In,
               Time-blocks (AM ritual / Focus block / PM wind-down), Notes
  Right page : 3-day spread (Fri–Sun) + Weekly Nervous System Snapshot +
               "What needs a gentle reset?" + weekly gratitude line

[DAILY TOOLKIT — pages 153–168]
  p.153–154  Morning Ritual Builder (pick 3 from a menu of 12 Ayurvedic practices)
  p.155–156  Evening Wind-Down Planner (Abhyanga, journalling, screen-free window)
  p.157–158  ADHD Rescue Kit (dopamine menu, 5-4-3-2-1 grounding, body doubling tips)
  p.159–160  Meal & Digestion Tracker (Agni check-in, 3-meal log, spice notes)
  p.161–162  Movement & Prana Log (yoga, walks, breathwork — circle not checkbox)
  p.163–164  Sleep Sanctuary Log (bed/wake time, dream notes, quality moon rating)
  p.165–166  Emotional Weather Map (daily mood, trigger, soother)
  p.167–168  "Body Speaks" Symptom & Sensation Journal (non-clinical, intuitive)

[RESOURCES & BACK MATTER — pages 169–180]
  p.169–170  Ayurvedic Glossary (20 key terms, plain-English definitions)
  p.171–172  ADHD Self-Compassion Affirmations (30 affirmations, one per box)
  p.173–174  QR Code Resource Page (14 QR codes — see list in prompt below)
  p.175–176  Recommended Reading & Apps list
  p.177–178  "My NeuroVeda Story" journalling pages (free write)
  p.179      About the Author / Brand page
  p.180      Back cover (tagline, ISBN barcode placeholder, website, social handles)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QR CODE RESOURCES (print on p.173–174)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generate a labelled placeholder block for each of the 14 QR codes below.
For each, output: QR label, short description (≤15 words), destination URL placeholder.

 1. Dosha Quiz (extended online version)        → {{QR_URL_01}}
 2. Morning Ritual Audio Guide                  → {{QR_URL_02}}
 3. Evening Wind-Down Meditation                → {{QR_URL_03}}
 4. ADHD + Ayurveda Workshop replay             → {{QR_URL_04}}
 5. NeuroVeda Community (private group)         → {{QR_URL_05}}
 6. Printable Habit Tracker bonus sheets        → {{QR_URL_06}}
 7. Ayurvedic Recipe Book (free PDF)            → {{QR_URL_07}}
 8. ADHD-friendly breathwork video              → {{QR_URL_08}}
 9. Nervous System Reset audio                  → {{QR_URL_09}}
10. Seasonal Self-Care calendar download        → {{QR_URL_10}}
11. Book a 1:1 Ayurvedic consultation           → {{QR_URL_11}}
12. NeuroVeda newsletter sign-up                → {{QR_URL_12}}
13. Planner tutorial (how-to video)             → {{QR_URL_13}}
14. Feedback & review form                      → {{QR_URL_14}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTOR-SAFE DISCLAIMER (print verbatim on p.06 and p.180)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"NeuroVeda is a wellness planning tool designed to support mindful self-organisation
and daily routine-building inspired by Ayurvedic principles. It is not a medical
device, clinical treatment, or therapeutic intervention. The content in this planner
does not constitute medical, psychiatric, or psychological advice and is not intended
to diagnose, treat, cure, or prevent any condition, including Attention Deficit
Hyperactivity Disorder (ADHD). Always consult a qualified healthcare professional
before making changes to your health or wellness routine. Individual results will
vary. The publisher and author disclaim all liability arising from reliance on the
information contained herein."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Output the full planner content as structured Markdown.
• Each page block starts with: ## [PAGE XX] — Title
• Use tables for grid layouts, bullet lists for menu items, blockquotes for
  pull-quotes and affirmations.
• At the end, append a "Design Handoff Notes" section with:
  - Exact CMYK colour codes for each palette swatch
  - Font size recommendations (heading / subheading / body / caption)
  - Grid specs (columns, gutter, margin sizes in mm)
  - Bleed and safe-zone measurements
```

---

## 2. Placeholder Variables

Replace every `{{VARIABLE}}` before pasting the prompt. Defaults are shown in parentheses.

| Variable | Description | Default Value |
|---|---|---|
| `{{TRIM_SIZE}}` | Final trimmed page size | `B5 — 176 × 250 mm` |
| `{{TOTAL_PAGES}}` | Total page count (must be divisible by 4 for perfect binding) | `180` |
| `{{COLOUR_MODE}}` | Colour space for print | `CMYK` |
| `{{INTERIOR_STYLE}}` | Visual mood / palette name | `Warm cream + terracotta + sage green` |
| `{{FONT_PAIRING}}` | Heading font + body font | `Playfair Display + Nunito` |
| `{{BINDING_TYPE}}` | How the book is bound | `Perfect-bound` |
| `{{LANGUAGE}}` | Primary language of content | `English` |
| `{{QR_URL_01}}` – `{{QR_URL_14}}` | Destination URLs for each of the 14 QR codes | *(your real URLs)* |
| `{{PUBLICATION_YEAR}}` | Year of first publication for copyright page | `2025` |
| `{{ISBN_PLACEHOLDER}}` | ISBN-13 assigned by your publisher or self-publishing platform | `978-X-XXXXX-XXX-X` |
| `{{LAST_UPDATED}}` | Date this template document was last revised | `YYYY-MM-DD` |

> **Tip:** If you want a different page count, keep it divisible by 4 (e.g., 168, 180, 192) to avoid binding waste pages.

---

## 3. Print-Ready Output Instructions

### 3.1 Document Setup (InDesign / Affinity Publisher / Canva Print)

| Setting | Value |
|---|---|
| Trim size | 176 mm × 250 mm (B5) |
| Bleed | 3 mm on all four sides → document size: 182 mm × 256 mm |
| Slug / safe zone | 5 mm inside trim on all sides (keep all live text & logos inside) |
| Facing pages | Yes (spreads) |
| Colour space | CMYK |
| Black (text) | Rich black for headlines: C 40 / M 30 / Y 30 / K 100; Pure black (K 100) for body text |
| Minimum font size | 8 pt body; 6 pt footnote/caption |
| Image resolution | 300 dpi minimum at 100% print size |
| Embedded fonts | All fonts must be embedded or outlined before export |

### 3.2 Margins (inside a B5 spread)

| Margin | Size |
|---|---|
| Top | 15 mm |
| Bottom | 18 mm |
| Outside (page edge) | 14 mm |
| Inside (gutter / spine) | 20 mm (extra for perfect-bind creep) |

### 3.3 Colour Palette (CMYK values)

| Swatch Name | CMYK | Usage |
|---|---|---|
| Cream (background) | C 0 / M 3 / Y 12 / K 0 | Page background |
| Terracotta (accent) | C 0 / M 52 / Y 58 / K 12 | Headers, icons, borders |
| Sage Green | C 28 / M 0 / Y 30 / K 10 | Section dividers, habit circles |
| Deep Forest | C 70 / M 20 / Y 55 / K 30 | Body text, captions |
| Dusty Rose | C 0 / M 25 / Y 15 / K 5 | Pull quotes, soft highlights |
| Warm Gold | C 0 / M 18 / Y 65 / K 5 | Accent lines, icons |

### 3.4 Export Settings (PDF for Print)

See Section 7 for the full export checklist.

---

## 4. Table of Contents & Page Blueprint

### Planner Structure at a Glance

```
┌─────────────────────────────────────────────────────────────────────┐
│  SECTION                       │  PAGES       │  PAGE COUNT         │
├─────────────────────────────────────────────────────────────────────┤
│  Front Matter                  │  01 – 12     │  12 pages           │
│  Annual Vision                 │  13 – 28     │  16 pages           │
│  Quarterly Review (template)   │  29 – 44     │  16 pages           │
│  Monthly Spreads               │  45 – 88     │  44 pages (24 monthly + 20 bonus) │
│  Weekly Spreads                │  89 – 152    │  64 pages           │
│  Daily Toolkit                 │  153 – 168   │  16 pages           │
│  Resources & Back Matter       │  169 – 180   │  12 pages           │
├─────────────────────────────────────────────────────────────────────┤
│  TOTAL                         │              │  180 pages          │
└─────────────────────────────────────────────────────────────────────┘
```

### Detailed Page Blueprint

#### Front Matter (pp. 1–12)

| Page | Content | Notes |
|---|---|---|
| 1 | Half-title | "NeuroVeda" only, centred, large type |
| 2 | Blank verso | |
| 3–4 | Full-bleed cover spread | Artwork description + palette brief for designer |
| 5 | Full title page | Title, tagline, edition year, one-line disclaimer |
| 6 | Copyright & disclaimer | Full investor-safe disclaimer (see Section 8) |
| 7–8 | "How This Planner Works" | 2-page illustrated guide, 6 steps |
| 9–10 | Dosha Discovery Quiz | 10 questions, illustrated, tick-boxes |
| 11–12 | My Dosha Profile fill-in | Colour-coded legend for Vata / Pitta / Kapha |

#### Annual Vision (pp. 13–28)

| Page | Content | Notes |
|---|---|---|
| 13–14 | Year at a Glance | 12-month undated grid |
| 15–16 | Annual Intentions | 3 themes × 3 intentions |
| 17–18 | Wheel of Ayurvedic Life | 8 segments, 1–10 rating |
| 19–20 | Word of the Year + Sankalpa | Sanskrit + transliteration + meaning |
| 21–22 | Seasonal Rhythms | Dosha seasons mapped to calendar wheel |
| 23–24 | Habit Roots | 12 monthly habit circles |
| 25–26 | Reading + Learning list | Books, podcasts, courses |
| 27–28 | Gratitude Soil | 52 lines, one per week |

#### Quarterly Review (pp. 29–44, reusable template)

| Page | Content | Notes |
|---|---|---|
| 29–30 | Quarterly Compass | Goals, theme, dosha focus for the quarter |
| 31–32 | Quarter Brain-Dump | Free-write, lined + dotted mix |
| 33–34 | Project Runway | 3 projects × Gantt-style bar |
| 35–36 | Energy Budget | 4-quadrant matrix |
| 37–38 | Body + Mind Care plan | Sleep, meals, movement, nature, rest |
| 39–40 | Relationship Nourishment | 5 people to appreciate |
| 41–42 | Quarter-End Reflection | What bloomed / what can compost |
| 43–44 | "Carry Forward" page | Guilt-free reschedule zone |

#### Monthly Spreads (pp. 45–88)

| Page | Content | Notes |
|---|---|---|
| Left | Month overview grid | Undated 5 × 7 grid, moon phase icons |
| Right | Monthly intentions | 3 tasks, dosha tip of the month |

#### Weekly Spreads (pp. 89–152)

| Page | Content | Notes |
|---|---|---|
| Left | 4-day spread (Mon–Thu) | Today's 3 Seeds, Body Check-In, time-blocks, notes |
| Right | 3-day spread (Fri–Sun) + wrap | Nervous System Snapshot, gentle reset, gratitude line |

#### Daily Toolkit (pp. 153–168)

| Page | Content | Notes |
|---|---|---|
| 153–154 | Morning Ritual Builder | Pick 3 from 12 Ayurvedic practices |
| 155–156 | Evening Wind-Down Planner | Abhyanga, journalling, screen-free window |
| 157–158 | ADHD Rescue Kit | Dopamine menu, 5-4-3-2-1, body-doubling tips |
| 159–160 | Meal & Digestion Tracker | Agni check-in, 3-meal log, spice notes |
| 161–162 | Movement & Prana Log | Yoga, walks, breathwork — circles not checkboxes |
| 163–164 | Sleep Sanctuary Log | Bed/wake time, dream notes, moon quality rating |
| 165–166 | Emotional Weather Map | Daily mood, trigger, soother |
| 167–168 | "Body Speaks" Journal | Non-clinical, intuitive symptom/sensation log |

#### Resources & Back Matter (pp. 169–180)

| Page | Content | Notes |
|---|---|---|
| 169–170 | Ayurvedic Glossary | 20 key terms, plain-English |
| 171–172 | ADHD Self-Compassion Affirmations | 30 affirmations |
| 173–174 | QR Code Resource Page | 14 QR codes (see Section 6) |
| 175–176 | Recommended Reading & Apps | Curated list |
| 177–178 | "My NeuroVeda Story" | Free-write journalling pages |
| 179 | About the Author / Brand | Bio + brand story |
| 180 | Back cover | Tagline, ISBN barcode placeholder, socials |

---

## 5. ADHD-Friendly Design Rules

These constraints are **non-negotiable** and must survive every revision. Gemini and any human editor must check against this list before finalising any page.

### 5.1 Task Load Cap

- **Maximum 3 tasks per day** — always labelled "Today's 3 Seeds."
- No sub-tasks, dependencies, or priority matrices on daily pages.
- If a task doesn't fit today, the page says: *"Carrying forward — rest was needed."*

### 5.2 Undated Format

- No pre-printed day names, month names, or year values anywhere in the planner.
- Every date field is a blank line or small box for the user to handwrite.
- This removes the guilt spiral of "skipped days" and allows flexible, non-linear use.

### 5.3 Guilt-Free Language Policy

**Never use:**
| Banned | Replace with |
|---|---|
| Failed | Rescheduled |
| Missed | Carried forward |
| Incomplete | In progress |
| Behind | Finding my pace |
| Should have | Next time I'll try |
| Didn't | Chose to rest |
| Lazy | Conserving energy |
| Procrastinated | Waiting for the right moment |
| Wasted | Learning time |

**Voice guidelines:**
- Warm, second-person ("you"), never imperative commands.
- Encourages self-compassion after low-output days.
- Celebrates partial wins ("You planted one seed today — that's enough.").

### 5.4 White Space & Cognitive Load

- Minimum **40% white space** on every spread.
- No more than **3 distinct font sizes** per page.
- No more than **3 colours** per page (excluding white/cream background).
- Icons replace text instructions wherever possible (6 words max per caption).

### 5.5 Habit Tracker Format

- All trackers use **circles** (○), never checkboxes (☐).
- Circles feel less binary and less punitive — they invite completion rather than demanding it.
- A half-filled circle (◑) is always valid and labelled "gentle progress."

### 5.6 Body & Nervous System Awareness

- Every daily spread includes a **1-line Body Check-In**:
  - Energy level: ① ② ③ ④ ⑤
  - Dosha emoji today: 🌬️ Vata · 🔥 Pitta · 🌿 Kapha
- Every weekly spread includes a **"Nervous System Snapshot"** (3 words only, no sentences required).

---

## 6. QR-Code Placeholder List

Print these 14 QR codes on **pages 173–174**. Each code links to a resource. Replace each `{{QR_URL_XX}}` with the live URL before generating QR images.

| # | Label | Short Description (≤15 words) | URL Placeholder |
|---|---|---|---|
| 1 | Dosha Quiz | Take the extended online Vata-Pitta-Kapha quiz | `{{QR_URL_01}}` |
| 2 | Morning Ritual Audio | Guided audio for your Ayurvedic morning routine | `{{QR_URL_02}}` |
| 3 | Evening Wind-Down | Calming evening meditation for nervous-system reset | `{{QR_URL_03}}` |
| 4 | ADHD + Ayurveda Workshop | Watch the full workshop replay at your own pace | `{{QR_URL_04}}` |
| 5 | Community Group | Join the private NeuroVeda peer-support community | `{{QR_URL_05}}` |
| 6 | Bonus Habit Sheets | Download free printable habit-tracker bonus pages | `{{QR_URL_06}}` |
| 7 | Ayurvedic Recipe Book | Free PDF: 30 dosha-balancing recipes for any season | `{{QR_URL_07}}` |
| 8 | Breathwork Video | ADHD-friendly pranayama practice (10 minutes) | `{{QR_URL_08}}` |
| 9 | Nervous System Reset | Audio: instant nervous-system regulation exercise | `{{QR_URL_09}}` |
| 10 | Seasonal Calendar | Download the seasonal self-care calendar | `{{QR_URL_10}}` |
| 11 | Book a Consultation | Schedule a 1:1 Ayurvedic wellness consultation | `{{QR_URL_11}}` |
| 12 | Newsletter | Sign up for the weekly NeuroVeda newsletter | `{{QR_URL_12}}` |
| 13 | Planner Tutorial | Watch the how-to-use-your-planner video walkthrough | `{{QR_URL_13}}` |
| 14 | Feedback Form | Share your experience and help improve the planner | `{{QR_URL_14}}` |

> **QR Code Generation Tips:**
> - Use a reliable generator such as [QR Code Generator](https://www.qr-code-generator.com) or [Canva QR](https://www.canva.com/features/qr-code-generator/).
> - Generate at **1000 × 1000 px** minimum for print clarity at 300 dpi.
> - Use **SVG** format if your design tool supports it (scales without quality loss).
> - Add a 4-module quiet zone (white border) around each QR code.
> - Test every code with two different phone cameras before sending to print.

---

## 7. PDF Export Checklist

Work through this checklist in order before uploading your file to the printer.

### 7.1 Document Checks (in design tool)

- [ ] All pages are **B5 trim size** (176 × 250 mm)
- [ ] **3 mm bleed** set on all four sides; bleed elements extend to the bleed edge
- [ ] **5 mm safe zone** respected — no live text or logos within 5 mm of trim line
- [ ] Facing pages set up correctly (odd pages right, even pages left)
- [ ] Page count is divisible by 4: `{{TOTAL_PAGES}}` ÷ 4 = whole number
- [ ] All fonts are **embedded** or **outlined to paths**
- [ ] No **RGB, Lab, or Pantone** colours — all swatches converted to CMYK
- [ ] Black text uses **K 100** (pure black), not rich black
- [ ] Headline/large text uses rich black: **C 40 / M 30 / Y 30 / K 100**
- [ ] All images are **minimum 300 dpi** at 100% print size
- [ ] QR codes exported at **minimum 300 dpi** (or use SVG/EPS)
- [ ] Spine text is correct width for `{{TOTAL_PAGES}}` pages and `{{BINDING_TYPE}}`
- [ ] No missing links — all images are re-linked from original high-resolution files

### 7.2 PDF Export Settings (Adobe PDF Print / Affinity Publisher)

- [ ] PDF standard: **PDF/X-4** (preferred) or **PDF/X-1a** (ask your printer)
- [ ] Colour conversion: **Convert to Destination** → CMYK profile (e.g., ISO Coated v2 or FOGRA39)
- [ ] Marks: **Crop marks** + **Bleed marks** ON; Registration marks ON (if printer requires)
- [ ] Bleed: **3 mm** included in export
- [ ] Compression: Images → **ZIP** or **JPEG (maximum quality)** — never "screen" or "web" presets
- [ ] Transparency flattening: **High Resolution** (for effects/shadows)
- [ ] Output intent: embed the CMYK colour profile

### 7.3 Pre-flight & Soft-Proof

- [ ] Run **pre-flight check** in your design tool; zero errors before export
- [ ] Soft-proof the file using your printer's ICC profile — verify cream background looks warm, not grey
- [ ] Check that terracotta and sage green remain distinct when viewed in greyscale (for accessibility)

### 7.4 File Delivery

- [ ] File name format: `NeuroVeda_Planner_INTERIOR_B5_CMYK_v{VERSION}.pdf`
- [ ] Cover file (if separate): `NeuroVeda_Planner_COVER_B5_CMYK_v{VERSION}.pdf`
- [ ] Upload to printer portal or share via a secure file-transfer link (not email attachment)
- [ ] Request a **printer's proof** (digital soft proof or physical proof copy) before full print run
- [ ] Approve proof and sign off in writing before authorising the print run

---

## 8. Investor-Safe Disclaimer Template

Use this disclaimer verbatim on **page 6** (copyright/disclaimer page) and in abbreviated form on the **back cover (page 180)**. It is written to satisfy standard wellness-product legal requirements: it positions NeuroVeda as a planning/lifestyle tool and explicitly disavows any medical or clinical claims.

---

### Full Disclaimer (page 6)

> **NeuroVeda — Wellness Planning Tool**
>
> NeuroVeda is a wellness planning tool designed to support mindful self-organisation and daily routine-building inspired by Ayurvedic principles.
>
> **Not medical advice.** The content in this planner does not constitute medical, psychiatric, psychological, or nutritional advice. It is not intended to, and does not, diagnose, treat, cure, mitigate, or prevent any physical or mental health condition, including Attention Deficit Hyperactivity Disorder (ADHD) or any other neurodevelopmental condition.
>
> **Consult a professional.** Always seek the advice of a qualified healthcare professional — including but not limited to a physician, psychiatrist, psychologist, or registered dietitian — before making any change to your health, wellness, medication, or nutrition routine.
>
> **Individual results vary.** Experiences with this planner will differ from person to person. No specific outcome, benefit, or result is guaranteed or implied.
>
> **Ayurvedic information.** References to Ayurvedic doshas (Vata, Pitta, Kapha), herbs, practices, and seasonal rhythms are provided for cultural, educational, and inspirational purposes only. They are not diagnostic tools and do not represent the clinical practice of Ayurvedic medicine.
>
> **Limitation of liability.** To the maximum extent permitted by applicable law, the publisher, author, and any contributors disclaim all liability for any loss, injury, or damage — whether direct, indirect, incidental, or consequential — arising from the use of or reliance upon any information contained in this planner.
>
> *First published {{PUBLICATION_YEAR}}. All rights reserved.*
> *ISBN: {{ISBN_PLACEHOLDER}}*

---

### Short Disclaimer (back cover / marketing materials)

> *NeuroVeda is a wellness planning tool for self-organisation and routine-building. It is not a medical device and does not provide medical advice. Always consult a qualified healthcare professional. Individual results vary.*

---

### Investor Pitch / Marketing Copy Notes

When presenting NeuroVeda to investors, press, or retail buyers, use the following framing:

- **Category:** Wellness stationery / self-help planner
- **Positioning:** "An Ayurveda-inspired, ADHD-aware productivity planner for adults seeking neuro-inclusive daily routines"
- **Claims to AVOID in all marketing:**
  - ❌ "Treats ADHD"
  - ❌ "Clinically proven"
  - ❌ "Cures anxiety / brain fog / burnout"
  - ❌ "Recommended by doctors"
  - ❌ "Balances your doshas" (implies clinical effect)
- **Safe alternatives:**
  - ✅ "Designed with ADHD-friendly principles"
  - ✅ "Inspired by Ayurvedic traditions"
  - ✅ "Created to support self-awareness and gentle routine-building"
  - ✅ "A supportive companion for neurodiverse daily life"
  - ✅ "User-reported improvement in daily organisation" (if backed by survey data)

---

*Document version: 1.0 — NeuroVeda ADHD + Ayurveda Planner Gemini Prompt Template*
*Last updated: {{LAST_UPDATED}}*
