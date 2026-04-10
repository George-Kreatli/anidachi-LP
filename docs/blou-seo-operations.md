# Blou SEO Operations Runbook

This runbook defines the weekly and monthly optimization loop for organic traffic -> app downloads.

## Baseline Before Rollout

Capture baseline values in `docs/blou-seo-baseline.csv` for:

- Google Search Console: impressions, clicks, CTR, average position
- GA4: sessions for `/quit-smoking/*`, `/quit-smoking-calculator/*`, `/tools/*`
- GA4 events: `blou_app_store_click`, `blou_calculator_engagement`
- App Store Connect: web referral installs (or equivalent campaign-level installs)

Use a 28-day baseline window to reduce weekday volatility.

## Weekly Cadence (Execution)

1. Check new URLs indexed in Search Console.
2. Review top 20 pages by impressions and CTR.
3. Review tool engagement and App Store click rate by landing page.
4. Log changes and experiments in `docs/blou-seo-experiments.md`.

## Monthly Cadence (Strategy)

1. Compare current month vs baseline and previous month.
2. Apply decision rules:
   - High impressions + low CTR -> improve title/meta and FAQ snippet clarity.
   - High tool usage + low app click-through -> update CTA copy/placement.
   - Low rankings + low impressions -> improve internal linking and depth.
3. Select top 5 pages for refresh and republish.
4. When you materially change a page, bump its `updatedAt` in `lib/blou-seo-data.ts` (and `medicalReview.lastReviewed` in `lib/blou-seo-trust.ts` when editorial/medical review runs). Set `NEXT_PUBLIC_MEDICAL_REVIEWER_*` in production when a named reviewer is available.

## KPI Targets (6 Months)

- 100+ indexed pages
- 50,000+ monthly impressions
- 2,000+ monthly clicks
- 5-10% App Store CTA CTR on tool pages
- 20+ referring domains to tool URLs

## Event Definitions

- `blou_app_store_click`: fired when CTA link to App Store is clicked.
  - Params: `placement`, `destination`
- `blou_calculator_engagement`: fired when user saves calculator/timeline results.
  - Params vary by tool (`tool`, `cigarettes_per_day`, `pack_price`, `currency`, `days_smoke_free`)
