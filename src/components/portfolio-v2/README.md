# Portfolio 2026 v2

- Route: `/private/portfolio-2026-v2/`
- Content source: Obsidian `01 제출/2026-09 포트폴리오 (당근) — 대표 사례 중심 초안.md`, reviewed
  2026-09-14.
- `index.tsx`: edited presentation of the source; private review notes and source links are
  excluded.
- Career company headings use local, unmodified PNG logos at 20px. Sources:
  [Banksalad official favicon](https://cdn.banksalad.com/app/meta/introduce-a/favicon.png) and
  [Goodoc app icon, published by Goodoc Co.,Ltd on the App Store](https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e9/cb/a3/e9cba3bd-85e5-7dff-4168-649554fded80/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/100x100bb.png).
  Files: `public/images/portfolio/{banksalad,goodoc}.png`. Decorative empty alt text avoids
  repeating the adjacent company name. Logos identify employers, not endorsement.
- `scroll-effects.tsx`: whole-section reveals (not separate heading/body animations), selective
  underline draws, and sequential diagram steps. Motion begins at 70% of viewport height (30% above
  the bottom). Pixel root margins and zero threshold handle mobile and very tall sections. Scrolling
  back up resets elements only as they leave below the full viewport, so they replay on re-entry
  without flickering at the central trigger. Focused content is revealed for keyboard navigation.
  Already-read content above stays visible. Text remains available without JS; reduced-motion and
  printing reveal everything immediately.
- `pointer-glow.tsx` / `pointer-glow.module.css`: a subtle blue-violet radial light follows a fine
  pointer via one animation-frame update, with no React renders per move or continuous loop. Fixed
  viewport positioning keeps it aligned during scrolling. The decorative overlay cannot intercept
  clicks; touch, reduced-motion, forced-colors and print hide it. Listeners and pending frames are
  cleaned up when disabled or unmounted. Visual reference: https://brittanychiang.com/.
- `portfolio.module.css`: isolated surface-based layout with light/dark palettes, responsive
  navigation, visible hover/focus states and print styles. Sections are grouped by background and
  spacing rather than repeated divider lines. Neutral slate surfaces use the four colors sampled
  from the official favicon: blue #0098FF, cyan #00CDCD, green #00CD80, pink #F582C6. Text tones are
  adapted for light/dark contrast; the pointer light blends blue/cyan. This is logo-derived styling,
  not a claim to reproduce the company's official design system. A later visual preference broadens
  a softer lime accent (#B0E892 in dark mode; #397028 for readable light-mode text) across the hero,
  active navigation, badges and controls. Neutral surfaces and the secondary cyan/pink section
  accents remain; lime is an adaptation, not a logo color.
- `journey.tsx` / `journey.module.css`: a compact AARRR experience map, connecting each stage to
  implemented web work rather than explaining the framework. Source: full career original, R09
  (search), B02/R05 (application), B07 (push/Alimtalk entry), B03 (health preview sharing), B06
  (consultation). These are development contributions, not claims of owning growth strategy or
  improving stage metrics. B03 sharing is distinct from the unimplemented snapshot-sharing idea. The
  experience section precedes team operations in both content and navigation; it also links the
  author's independently operated blog's AARRR and UX categories (both verified HTTP 200).
- `work-accordion.tsx`: supplementary projects ordered by start year, newest first (no invented
  month ordering within 2026). Native details with reversible height animation, reduced-motion
  support, and keyboard interaction; content remains usable without JavaScript.
- AARRR uses a grouped stagger reveal, 90ms between rows; all five reset below the viewport. It
  shares the 70%-height trigger and reduced-motion/print fallbacks with other scroll effects.
  Revenue also includes the author's confirmed follow-up: Amplitude funnel checks and anomalous
  metric alerts, Sentry alerts, and monitoring added across layers. No specific layer architecture,
  alert thresholds, revenue lift or detection improvement metrics are inferred.
- `operations-map.tsx` / `operations-map.module.css`: as-is/to-be view of concentrated requests
  versus responsibility boundaries, execution and decision paths. To-be is explicitly in adoption,
  not a measured or completed bottleneck reduction. The diagram summarizes the operating framework.
- The gene release-date/PR-count box is omitted; tests, MSW and wrap-up remain. The print action is
  a muted, transparent icon/text button with hover/focus feedback and a 44px touch target.
- `navigation.tsx`: contextual section titles, a mobile left-drawer menu using a modal dialog,
  current-section indication and printing. The drawer supports Escape, backdrop and link dismissal;
  closing restores focus and scrolling. Closed supplementary projects expand for printing and
  restore afterward. On mobile, a safe-area-aware bottom-right return-to-top control appears after
  the intro leaves the viewport. It is hidden at the top, on desktop and in print. It respects
  reduced motion and restores keyboard focus to the intro heading. Desktop retains the footer link.
- `../site-frame.tsx`: bypasses the Nextra blog shell only for this exact route. Other pages retain
  their existing shell.

This is a separate version, not the output of the existing `portfolio:sync` command. That command
continues to target v1. Future content edits should be checked against the Obsidian source; nothing
writes back to the vault automatically.

The author's follow-up clarification limits Goodoc Talk and the procedure encyclopedia to short
development-history entries: detailed implementation decisions are not confidently recalled. Their
original records remain in the full career source (G04/G05), but they are not featured technical or
outcome case studies. The AARRR acquisition example now uses only the health-web SEO work (R09).
This clarification is also reflected in the Obsidian portfolio draft and Rallit draft; older
archived versions and the v1 sync source are not changed.

The perspective section includes insurance-claim first-customer QA (May–June 2026), sourced from the
author's supplied Slack-summary screenshot (full career source R10). Nighttime-message feedback led
to a PM-decided sending restriction and deployment; a reported message-entry error was corrected by
the server owner. The author owns firsthand observation and reporting, not those policy decisions or
fixes. Original Slack threads were not independently rechecked. Status-update notifications remain a
prioritization proposal, and competitor benchmarking remains design input; neither is presented as a
shipped outcome. No personal/family details or internal links are exposed.

The gene flow summarizes working steps, not an actual screen or an independently claimed
architecture. The author's 2026-09-14 follow-up clarifications add flow-first communication, tests
before changes to preserved behavior, extensive state-based MSW scenarios, and post-release wrap-up.
Sentry experiment-tag monitoring describes the author's experiment deployment practice, not an A/B
outcome of the gene renewal. QA counts and the redundant result block are omitted. Mentoring entries
come from the full career source; the Devcourse end date remains unconfirmed. AI routing is
explicitly in design, and the SEO/community perspective remains an unvalidated proposal. Do not
promote either into completed outcomes without new evidence.

The route uses `noindex, nofollow` and `data-pagefind-ignore`; existing robots rules exclude
`/private/`. This is unlisted content, **not access control**. Do not add internal URLs, credentials
or confidential screenshots.

Local preview: `pnpm dev --port 3100`, then open the route. Type check:
`pnpm exec tsc --noEmit --incremental false`. Static export: `pnpm exec next build`.
