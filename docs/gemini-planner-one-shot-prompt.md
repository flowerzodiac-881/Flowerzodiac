# NeuroVeda Planner — Gemini One-Shot Prompt Template

> **Version:** 1.1.0  
> **Last updated:** 2026-03-19  
> **Purpose:** Single-pass prompt sent to Gemini to generate the complete NeuroVeda ADHD + Ayurveda hybrid planner manuscript ready for layout/print.

---

## How to Use This Template

1. Copy the content inside the `--- BEGIN PROMPT ---` / `--- END PROMPT ---` fence verbatim into your Gemini session (Gemini 1.5 Pro or later recommended).
2. Do **not** split the prompt across multiple turns; the entire document should be delivered in one shot.
3. If the model truncates output mid-way, see the **Truncation Fallback** instruction embedded in the prompt.

---

## Section Blueprint (Canonical Page Count)

> **Covers are NOT counted in the 204-page interior.** The two cover pages (front + back) are handled separately by the print vendor and are not part of this manuscript.

| # | Section | Calculation | Pages |
|---|---------|-------------|-------|
| 1 | Front Matter | Fixed | 8 |
| 2 | Monthly System | 12 months × 3 pages | 36 |
| 3 | Weekly System | 52 weeks × 2 pages | 104 |
| 4 | Brain Dump Inserts | 13 inserts × 2 pages | 26 |
| 5 | Ayurveda + Science Reference | Fixed | 8 |
| 6 | Gamification & Habit Streaks | Fixed | 4 |
| 7 | Emergency Toolkit | Fixed | 4 |
| 8 | Quarterly Reviews | 4 quarters × 1 page | 4 |
| 9 | End Matter | Fixed | 10 |
| | **TOTAL INTERIOR PAGES** | | **204** |

---

## Changelog of Fixes (v1.0 → v1.1.0)

| # | Issue Found in v1.0 | Fix Applied in v1.1.0 |
|---|---------------------|-----------------------|
| 1 | Page total was ambiguous; covers were inconsistently counted | Covers explicitly excluded; interior total locked at 204 |
| 2 | Weekly section listed 52 weeks × 2 = 100 pages (arithmetic error) | Corrected to 52 × 2 = 104 pages |
| 3 | Brain Dump inserts listed as 12 inserts (one per month) | Corrected to 13 inserts (12 monthly + 1 bonus reset insert) |
| 4 | Quarterly reviews page count was 4 × 2 = 8 in old draft | Corrected to 4 × 1 = 4 pages per spec |
| 5 | End matter lacked a specific page count | Locked at 10 pages |
| 6 | ADHD constraints were described in narrative prose, easy to miss | Extracted into explicit constraint list with enforcement language |
| 7 | Ayurveda content had implied health claims | Added mandatory disclaimer block and "wellness framing only" rule |
| 8 | QR code list had inconsistent formatting and 11–16 codes depending on reading | Normalised to exactly 14 QR codes in a numbered, consistent format |
| 9 | Print specs were absent from the prompt | Added full print/export specification block (B5, CMYK, 300 dpi, bleed, margins) |
| 10 | No guidance if model truncates output | Added embedded truncation-fallback instruction |
| 11 | Prompt did not reference the companion free app | Added brief app integration note to maintain product alignment |

---

## --- BEGIN PROMPT ---

```
You are a professional planner designer and manuscript writer.
Your task: produce the COMPLETE text manuscript for the NeuroVeda planner —
an ADHD-friendly, Ayurveda-inspired hybrid planner — in a single response.

════════════════════════════════════════════
PRODUCT OVERVIEW
════════════════════════════════════════════
Product name : NeuroVeda
Subtitle     : Your ADHD-Friendly Ayurveda Planner
Format       : Undated annual planner (use blank "Month ___" and "Week ___" labels)
Companion    : Free NeuroVeda mobile app (iOS/Android) — reference QR codes where noted
Audience     : Adults with ADHD or executive-function challenges who are curious about
               Ayurvedic wellness practices

════════════════════════════════════════════
ADHD-FRIENDLY DESIGN CONSTRAINTS
(these are NON-NEGOTIABLE — enforce them throughout every page of the manuscript)
════════════════════════════════════════════
1. Maximum 3 priority tasks per day — never offer space for more.
2. The planner is UNDATED — use "Month ___", "Week ___", "Day ___" placeholders.
3. All language must be guilt-free, compassionate, and non-shaming.
   Banned words/phrases: "failed", "missed", "behind", "should have", "didn't do".
4. Every Monthly and Weekly spread includes a "Fresh Start / Reset" micro-section
   (2–3 lines of prompts inviting the reader to start over without guilt).
5. Time-blindness supports must appear on every weekly spread:
   - Duration estimates in parentheses next to every task-line prompt,
     e.g. "Top task today (≈ 15 min): ___________"
   - An optional "Time anchor" field: "I will start at ___ (time)".
6. No dense blocks of text — use white space, bullet points, short prompts only.
7. Every instruction to the reader must be ≤ 12 words.

════════════════════════════════════════════
AYURVEDA INTEGRATION — WELLNESS FRAMING RULES
════════════════════════════════════════════
• Ayurveda content is for WELLNESS and SELF-AWARENESS only.
• You MUST include the following disclaimer verbatim on page 3 (Disclaimer page)
  and again at the start of the Ayurveda + Science Reference section:

  ───────────────────────────────────────────
  DISCLAIMER: The Ayurvedic practices and dosha-based suggestions in this planner
  are for general wellness and self-exploration only. They are NOT a substitute for
  medical advice, diagnosis, or treatment. Always consult a qualified healthcare
  professional before making changes to your health routine.
  ───────────────────────────────────────────

• Do NOT make any claims that Ayurveda treats, cures, or manages ADHD.
• Dosha references (Vata, Pitta, Kapha) may be used only as self-reflection lenses,
  e.g. "Notice if you feel Vata-scattered today — ground with a 2-minute breath pause."
• Permitted wellness tie-ins: daily routines (dinacharya), seasonal rhythms (ritucharya),
  grounding practices, breath awareness, and food/mood journaling prompts.

════════════════════════════════════════════
SECTION BLUEPRINT — PRODUCE ALL 9 SECTIONS IN ORDER
(204 interior pages total; covers are handled separately by the print vendor)
════════════════════════════════════════════

SECTION 1 — FRONT MATTER (8 pages)
  p.1  Half-title page: "NeuroVeda" (title only, no other text)
  p.2  Full title page: title, subtitle, edition note "Undated — start any time"
  p.3  Disclaimer page (include the full disclaimer text above)
  p.4  How This Planner Works (≤ 200 words, bullet points, ADHD-friendly)
  p.5  Meet Your Doshas — 1-paragraph overview of Vata / Pitta / Kapha (wellness framing)
  p.6  Quick Dosha Sketch (3-question self-reflection quiz — wellness only, not diagnostic)
  p.7  Setting Your Neuro-Intention (1-page journaling prompt to set a compassionate goal)
  p.8  QR Code Hub (list all 14 QR codes — see QR CODE LIST below)

SECTION 2 — MONTHLY SYSTEM (12 months × 3 pages = 36 pages)
  For each of the 12 months, produce exactly 3 pages:
  Page A — Monthly Overview
    • Header: "Month ___ | Dosha Focus: ___________"
    • Mini calendar grid (5 rows × 7 columns, blank)
    • 3 fields: "This month's one intention", "One thing to let go of", "Fresh Start note"
    • Habit tracker strip (5 habits × 4 weeks = 20 boxes)
  Page B — Monthly Brain Download
    • Sections: Mind Dump (8 lines), Projects (4 lines), Waiting-For (4 lines),
      Someday/Maybe (4 lines), Dosha Wellness Note (2 lines)
  Page C — Monthly Reflection
    • Prompts (each ≤ 12 words): What energised me? / What drained me? /
      What do I want to carry forward? / Fresh Start declaration (fill-in sentence)
    • Mood/energy bar chart (rate 1–5, 4 categories)

SECTION 3 — WEEKLY SYSTEM (52 weeks × 2 pages = 104 pages)
  For each of the 52 weeks, produce exactly 2 pages:
  Page A — Weekly Spread (left page)
    • Header: "Week ___ | Theme: ___________"
    • 7 day columns, each containing:
      - "Top task today (≈ ___ min): ___________"  [max 1 task shown here]
      - "Time anchor: I will start at ___"
      - 2 blank lines for notes
    • Weekly intention (1 line)
    • Fresh Start / Reset box: 2–3 compassionate prompts
  Page B — Weekly Brain Dump (right page)
    • Free-write area (16 lines)
    • "Did 3 things" celebration box (3 tick boxes — guilt-free win tracker)
    • Dosha check-in: "How is your nervous system today? ___________"
    • App QR shortcut (QR #2 — Weekly Check-In)

SECTION 4 — BRAIN DUMP INSERTS (13 inserts × 2 pages = 26 pages)
  • 12 monthly bonus brain dumps (one after each monthly section) + 1 open reset insert
  • Each insert = 2 pages of free-write lines (18 lines per page) with a header:
    "Brain Dump — clear it all out 🧠" and a footer:
    "You are not behind. You are exactly where you need to be."
  • The 13th insert is titled "Full Reset — Start Fresh Here" with additional prompts:
    "What am I letting go of?", "What am I choosing now?", "My next small step is:"

SECTION 5 — AYURVEDA + SCIENCE REFERENCE (8 pages)
  p.1  Repeat disclaimer (verbatim, see above) + Section intro (≤ 100 words)
  p.2  Vata at a Glance — qualities, tendencies, grounding practices (wellness framing)
  p.3  Pitta at a Glance — qualities, tendencies, cooling practices (wellness framing)
  p.4  Kapha at a Glance — qualities, tendencies, activating practices (wellness framing)
  p.5  ADHD + Ayurveda: What the Research Suggests (cite published wellness research only;
       do NOT claim causation or treatment; use hedged language: "some studies suggest…")
  p.6  Dinacharya (Daily Routine) Template — morning / midday / evening
  p.7  Seasonal Rhythm Wheel (Ritucharya) — 4-season visual + short text
  p.8  Dosha Food & Mood Journal starter prompts (6 prompts, wellness framing)

SECTION 6 — GAMIFICATION & HABIT STREAKS (4 pages)
  p.1  How NeuroVeda Streaks Work — dopamine-friendly explanation (≤ 150 words)
  p.2  Annual Habit Streak Grid (365 boxes — one per day — fill in the dot)
  p.3  Achievement Sticker Planner (12 milestone badges described in text; art added in layout)
  p.4  "Neuro-Level Up" tracker — 5 levels with unlock criteria based on consistency,
       NOT on perfect completion (guilt-free design)

SECTION 7 — EMERGENCY TOOLKIT (4 pages)
  p.1  When Everything Feels Too Much — 5-step grounding protocol (ADHD crisis support;
       wellness framing; include "speak to a professional if needed" note)
  p.2  Sensory Reset Menu — list of 12 sensory regulation ideas (sight, sound, touch, taste,
       smell, movement) — sourced from occupational therapy best practices
  p.3  "3 Things Right Now" Protocol — ultra-minimal task recovery sheet
  p.4  Quick QR Access to App Emergency Mode (QR #8) + crisis helpline text
       (include: "If you are in crisis, please contact a mental health professional
       or your local emergency services.")

SECTION 8 — QUARTERLY REVIEWS (4 quarters × 1 page = 4 pages)
  Each page contains:
  • Header: "Quarter ___ Review"
  • 4 reflection prompts (each ≤ 12 words)
  • Energy/mood summary bar (rate 1–5 across 4 dimensions)
  • "Next quarter's one focus: ___________"
  • Fresh Start declaration (1 line, fill-in)

SECTION 9 — END MATTER (10 pages)
  p.1    Acknowledgements (≤ 150 words, warm and inclusive tone)
  p.2    About NeuroVeda (brand story, ≤ 200 words; no medical claims)
  p.3    Free App Guide — full feature list of companion app + 3 screenshots described
  p.4–5  Blank Notes pages (2 pages of ruled lines)
  p.6–7  Blank Dot-Grid pages (2 pages)
  p.8    Full QR Code Directory (all 14 QR codes reprinted for reference — see list below)
  p.9    Index / Quick Reference (key prompts and page numbers)
  p.10   Back matter colophon: print specs, edition info, copyright notice

════════════════════════════════════════════
QR CODE LIST — EXACTLY 14 CODES
(format each consistently in the manuscript as shown below)
════════════════════════════════════════════

Use this exact format for every QR code reference in the manuscript:
  QR [##] — [Name] — [One-line description of what the link opens]

The 14 QR codes are:

  QR 01 — Welcome Video          — 2-minute orientation to NeuroVeda app and planner
  QR 02 — Weekly Check-In        — Open the in-app weekly reflection form
  QR 03 — Dosha Quiz             — Full interactive dosha self-assessment (wellness only)
  QR 04 — Morning Routine Audio  — Guided 5-minute Ayurvedic morning wake-up audio
  QR 05 — Focus Timer            — ADHD-friendly Pomodoro timer with dosha theme
  QR 06 — Brain Dump Audio       — Narrated brain-dump clearing exercise (10 min)
  QR 07 — Habit Streak Sync      — Sync planner habit tracker with the app
  QR 08 — Emergency Mode         — App calm-down protocol and grounding exercises
  QR 09 — Monthly Reset Audio    — Guided end-of-month reset meditation (wellness)
  QR 10 — Seasonal Guide         — Ritucharya seasonal wellness tips (current season)
  QR 11 — Community Forum        — NeuroVeda peer support community (moderated)
  QR 12 — Tutorial Videos        — How-to video series for planner features
  QR 13 — Feedback Form          — Submit planner feedback to the NeuroVeda team
  QR 14 — Full Disclaimer & FAQ  — Expanded wellness disclaimers and common questions

════════════════════════════════════════════
PRINT / EXPORT SPECIFICATIONS
(incorporate these details into the colophon on End Matter p.10)
════════════════════════════════════════════
• Trim size      : B5 (176 mm × 250 mm)
• Colour mode    : CMYK (no RGB or Pantone unless specified by print vendor)
• Resolution     : 300 dpi minimum for all raster elements
• Bleed          : 3 mm on all four sides
• Safe margins   : 10 mm minimum inner (spine/gutter) and outer; 12 mm top and bottom
• Binding gutter : Add an additional 5 mm to the inner margin for spiral-bound edition
                   (total inner safe zone = 15 mm for spiral edition)
• File format    : Export as print-ready PDF/X-1a or PDF/X-4
• Page count     : 204 interior pages + separate cover files (covers NOT included in this count)

════════════════════════════════════════════
OUTPUT FORMAT INSTRUCTIONS
════════════════════════════════════════════
• Output all 9 sections sequentially, clearly labelled with section headers.
• For each section, output every page with a clear page label, e.g.:
    ── PAGE 1 ── HALF-TITLE ──
• Do not skip any page. Do not summarise any page as "repeat pattern for remaining pages."
  Produce the full text for every single page.
• Use plain text with Markdown-style formatting (##, -, |) where helpful for layout intent.
• Keep all reader-facing text at or below a Flesch-Kincaid grade level of 8.
• Total output must cover all 204 interior pages.

════════════════════════════════════════════
IF MODEL TRUNCATES (FALLBACK INSTRUCTION)
════════════════════════════════════════════
If your response is approaching the output limit before all sections are complete,
do NOT summarise or skip pages. Instead, end your current response at a clean
section or page boundary and output this exact line:

  ⚡ TRUNCATED — Resume from: [SECTION X, PAGE Y] ⚡

The user will then paste this prompt again with the instruction:
  "Continue the manuscript from [SECTION X, PAGE Y]."
You must then resume seamlessly from that exact point with no repeated content.
This preserves the one-shot intent across two turns only if necessary.

════════════════════════════════════════════
BEGIN MANUSCRIPT NOW
Start with Section 1, Page 1 (Half-Title page). Do not add any preamble.
════════════════════════════════════════════
```

## --- END PROMPT ---

---

## Page-Count Verification

```
Section 1  Front Matter             =  8
Section 2  Monthly System  12×3     = 36
Section 3  Weekly System   52×2     = 104
Section 4  Brain Dump Inserts 13×2  = 26
Section 5  Ayurveda+Science ref     =  8
Section 6  Gamification             =  4
Section 7  Emergency Toolkit        =  4
Section 8  Quarterly Reviews  4×1   =  4
Section 9  End Matter               = 10
                                    ----
           TOTAL INTERIOR           = 204 ✓
```

> Covers (front + back) are produced separately by the print vendor and are **not** included in the 204-page count.
