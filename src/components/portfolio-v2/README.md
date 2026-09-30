# Portfolio 2026 v2

- Route: `/private/portfolio-2026-v2/`
- The drawer toolbar is a single compact row: AARRR label and stage navigation on the left, quiet
  link-copy/close controls on the right. Narrow screens use labeled icon-only controls and retain
  44px touch targets. Left/Right arrows switch stages only inside an open AARRR dialog; text
  editing, modified shortcuts, handled events and repeated keydown events are excluded. Shortcut
  hints use button titles and `aria-keyshortcuts`; end stages do not wrap. Escape still closes the
  drawer. Actual keyboard/visual browser testing remains pending.
- Content source: Obsidian `01 제출/2026-09 포트폴리오 (당근) — 대표 사례 중심 초안.md`, reviewed
  2026-09-14.
- `index.tsx`: edited presentation of the source; private review notes and source links are
  excluded.
- `detail-diagrams.tsx` / `detail-diagrams.module.css`: gene details show the two execution paths
  using a shared redirect rule, a unit-test/MSW verification comparison and the wrap-up document
  roles. Diagrams live in the featured cases, not the shortened AARRR summaries. The former generic
  insurance-observation diagram was removed; actual HappyTalk constraint/incident diagrams remain.
  Labels are accessible HTML and connectors are decorative. Narrow layouts adapt via container
  queries; print keeps each figure together. Browser discovery returned no available browser, so
  visual verification remains outstanding.
- `code-evidence.tsx`: short, labeled code evidence in the three featured technical cases. Gene
  query merging is an actual excerpt from `get-server-side-props.webview.ts`; its server fallback,
  resolver and test file were also read. The pre-review force-all/AGENTS.md branch is an actual
  router excerpt; the router smoke suite was rerun and passed 21 checks. Gene tests were inspected,
  not executed in this revision. HappyTalk is explicitly sanitized pseudocode describing the
  historical supplier response, not a verbatim excerpt or authored supplier implementation. No
  account identifiers, credentials, internal URLs or private imports are published. Source files
  remain unchanged. No latency, conversion, defect-reduction or AI-accuracy result is inferred.
- `happy-talk-diagrams.tsx`: the insurance project drawer now foregrounds the actual integration
  lesson and incident policy. Evidence is the author's supplied Markdown exports, read in full:
  “해피톡 레슨런 기록” and “상담과정 이슈 발생시 Guide Line” (updated 2024-01-04, author identified
  as Kim Nayoung). The recorded external response HTML branches on Kakao Open Builder's automatic
  utterance event: URL navigation with bot/event ignores supplied parameters; the other branch
  submits the form by POST with parameters. This is historical integration analysis, not code the
  author implemented at the supplier, a current vendor specification or a claim of fixing the
  supplier. The records also note a 20-character custom-field limit and delimiter-related loss. The
  guide defines web/vendor/spec diagnosis, direct web fixes versus supplier communication through
  the contracted partner, and manual matching of application/chat records when their counts differ.
  No implemented validator, disabled chatbot setting, automated recovery or measured
  incident/revenue improvement is inferred. Only sanitized summaries are rendered: no copied HTML,
  screenshots, customer names, account/channel IDs, tokens, internal URLs or detailed data exports.
  Amplitude monitoring and later handoff remain sourced from the author's separate clarifications,
  not these two documents.
- `case-drawer.tsx`: main cases keep concise summaries and open detailed material in a native modal
  dialog, styled as a right-hand drawer on desktop and full-screen on mobile. Escape and backdrop
  dismissal, background scroll locking, focus return, history navigation and shareable `?detail=`
  URLs are supported. Print styles expose all details inline. URL parsing/serialization has a
  standalone nine-test suite
  (`node --experimental-strip-types --test src/components/portfolio-v2/case-drawer-state.test.mjs`).
  Browser interaction still needs a visual check; only type checks, helper tests and rendered HTML
  checks were available for this revision.
- AARRR drawers have sticky Previous/Next controls in acquisition → activation → retention →
  referral → revenue order, with current position and disabled end controls. Stage switches replace
  the current detail entry instead of adding history entries; closing/Back returns to the original
  background. Direct detail links do not gain a history-back marker. The old dialog releases its
  scroll lock and focus before the new one captures them; new stages start at the top. Non-AARRR
  project drawers do not show these controls. Stage order, boundaries and history-state handling are
  covered by the expanded helper tests.
- Wrap-up copy follows the supplied `three-doc-system.md` guide (2026-04-26, draft): tech-spec
  preserves decisions/plans, README explains the code to people, and AGENTS.md holds AI-relevant
  constraints/rules. `WrapUpDocumentMap` visualizes this classification, not a completed migration
  checklist. No team-wide adoption, recurring refresh process, measured AI coverage or completed
  three-document split for every gene file is claimed. The source guide and company repository are
  read-only; its business-rule example values, internal links and planned adoption tasks are not
  copied into the public portfolio.
- `insurance-details.tsx`: insurance is a separate featured collection of work from 2023–2026, not a
  single continuous project. It connects product value, consultation integration, scope and policy
  decisions, Amplitude/Sentry monitoring, and firsthand insurance-claim feedback. Content follows
  the author's project clarifications; no conversion lift, unsupported architecture or ownership of
  another person's policy decision/server fix is implied.
- The featured product cases use distinct lenses: gene renewal covers agreement, reuse and
  regression testing to preserve existing behavior; insurance covers external consultation
  integration, funnel/error monitoring and documented incident response. Menu labels, overview,
  headings and the insurance diagram follow this distinction. Policy/scope decisions remain
  supporting detail below monitoring. The undocumented custom-parameter limitation comes from the
  author's work summary and subsequently supplied lesson/incident-guide exports; no specific fix or
  measured reliability/revenue improvement is inferred.
- Mentoring headings use local, unmodified official favicons at 20px: Programmers for Devcourse and
  Sparta for Hanghae Plus. Sources and download date are in `public/images/portfolio/README.md`.
  Both use the career-logo alignment so wrapped text remains vertically centered with the icon.
- AARRR rows each link to independent stage-specific details: acquisition (SEO/sitemap/IndexNow),
  activation (application flow and state-based landing), retention (message-entry pages and webview
  routing), referral (health-preview screens and sharing), revenue (consultation and monitoring).
  Five supporting drawers live in `journey-details.tsx`, with 2–3 confirmed work bullets each.
  Repeated context/contribution paragraphs and duplicate diagrams are removed. Activation/revenue
  offer optional drill-down links to the featured gene/insurance cases. Previous/Next and keyboard
  navigation remain. Sharing stays limited to confirmed scope; the snapshot idea is not presented as
  shipped work. AARRR is an experience map, not five equally deep standalone case studies.
- Section subtitles use the same local Banksalad PNG as career headings, at 18px with empty alt
  text. The adjacent visible company name supplies the label. A flex row centers the logo against
  the full text block when the subtitle wraps, while keeping the text left-aligned.
- The author confirmed the Banksalad start date as 2021-03-29. Month-level career entries use
  `2021.03`; a resume showing `2021.04` needs correction. The Obsidian resume could not be updated
  because filesystem access was denied.
- Editorial revision: the resume should summarize role, contribution and delivered work in 2–3
  bullets per project, while the portfolio explains constraints, choices and verification. Gene
  content now foregrounds existing-user continuity, flow-first scope agreement, shared redirect
  rules and layered testing. The application draft-save scope exclusion comes from the author's
  direct clarification, not an inferred code decision. No alternative evaluation, failure story,
  performance metric or SSR outcome is invented. AI and operating-framework status is consolidated
  at the top of each case; redundant disclaimers and duplicate contribution caveats are removed. The
  insurance-claim example retains the author's reporting role and credits the actual decision and
  implementation owners in its outcome. Resume/doc replacement copy was prepared separately because
  access to the vault remains denied; the source resume has not been edited or fully audited.
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
- `review-flow.tsx` / `review-flow.module.css`: the author's supplied pre-review diagram is adapted
  as responsive HTML nodes and decorative SVG connectors, not embedded as an image. It shows diff,
  script routing, parallel individual/bundled reviews, skipped layers, evidence validation and the
  report. Skipped layers do not join validation; discarded findings branch away from accepted
  output. Security is included alongside correctness/blocker to match the current skill. "No LLM
  call" describes script routing and skipped reviews, not total execution cost. The compact pipeline
  stays horizontal at all widths; a focusable, labeled scroll region contains overflow on narrow
  screens. Container queries show the scroll hint, and print removes the minimum width. Existing
  whole-section reveal and reduced-motion behavior apply.
- AARRR uses a grouped stagger reveal, 90ms between rows; all five reset below the viewport. It
  shares the 70%-height trigger and reduced-motion/print fallbacks with other scroll effects.
  Revenue also includes the author's confirmed follow-up: Amplitude funnel checks and anomalous
  metric alerts, Sentry alerts, and monitoring added across layers. No specific layer architecture,
  alert thresholds, revenue lift or detection improvement metrics are inferred.
- `operations-map.tsx` / `operations-map.module.css`: as-is/to-be view of concentrated requests
  versus responsibility boundaries, execution and decision paths. To-be is explicitly in adoption,
  not a measured or completed bottleneck reduction. The diagram summarizes the operating framework.
  The 2026-09-30 content revision names DRI/Jira boards, ticket-to-epic automation, CODEOWNERS and
  ADRs. Evidence: the July 12 operating retrospective (completed epic mapping), September execution
  guide (board/filter definitions), actual CODEOWNERS entries, and accepted ADR 01 (service-count
  allocation with existing-context priority and workload-imbalance tradeoff). Adoption and capacity
  remain open; no measured efficiency gain or sole authorship of every configuration is claimed.
  CODEOWNERS identifies review responsibility, not a verified mandatory approval gate. Public copy
  omits internal URLs, ticket IDs, group-specific paths and personal names. A follow-up revision
  uses the author's September 29 DRI operating presentation (30 HTML slides and speaker notes). The
  diagram contrasts single-person concentration with parallel domain-based handling: people with
  relevant code and operational context evaluate alternatives, while decision records remain shared.
  The A/B/C lanes illustrate distribution, not actual group names or a mandatory role sequence.
  Cross-domain decisions still require consultation. The text covers written decisions,
  independently mergeable work, handoffs, known-issue records and AI-assisted workflow steps. The
  operating DRI retains responsibility for the overall task. Slides 25–28 document a simulation with
  real tickets, document edits and a draft execution PR; later steps assume ADR approval/merge and
  do not establish actual approval, merge or completion. Those source sessions and PRs were not
  independently rechecked. The TL decision notification is explicitly still in preparation (slide
  24). Presentation sharing and workflow exercises are distinguished from sustained adoption or
  measured bottleneck reduction. No internal slide links, session identifiers or ticket numbers are
  published. This follow-up could not be written back to Obsidian because access to the source
  document was denied; the vault copy needs reconciliation. At the author's request, the
  presentation/simulation subsection and presentation-sharing credit are omitted from the visible
  portfolio. The evidence and its limits above remain for reference; the visible copy still marks
  adoption and measured effects as unconfirmed.
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

The insurance detail includes insurance-claim first-customer QA (May–June 2026), sourced from the
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
come from the full career source; the Devcourse end date remains unconfirmed.

AI status was corrected after inspecting the actual pre-review skill, route script, both profiles,
layer-format guide, rule-background notes and report-format reference on 2026-09-30. The August 31
commit by the author labels the layered structure a prototype; routing exists and the route smoke
suite passes all 21 checks. This supports "routing prototype implemented", not merely "in design".
The visible case now covers risk-based routing, execution placement/cost, evidence verification and
reader-oriented reporting. The latter practices are documented in the skill and its feedback notes;
original PR feedback and full AI runs were not independently replayed. The smoke tests validate the
router's contract, not AI review accuracy. Do not infer organization-wide adoption, measured defect
reduction, automated proof of review execution or a deployed CI review service. The supplied Claude
artifact could not be accessed and was not used as evidence. The SEO/community proposal remains
distinct from implemented search work.

The route uses `noindex, nofollow` and `data-pagefind-ignore`; existing robots rules exclude
`/private/`. This is unlisted content, **not access control**. Do not add internal URLs, credentials
or confidential screenshots.

Local preview: `pnpm dev --port 3100`, then open the route. Type check:
`pnpm exec tsc --noEmit --incremental false`. Static export: `pnpm exec next build`.
