# Portfolio 2026 v2

- Route: `/private/portfolio-2026-v2/`
- Retention scope refinement (2026-10-02): removed survey/satisfaction/reconsultation from the
  overview, copy and diagrams at the author's request. Retention now leads with actual-medical
  return journeys, followed by encoding fixes and link-operations analysis. Insurance project and
  Revenue consultation-integration content are unchanged.
- Retention follow-up (2026-10-02): author confirmed ownership of survey and actual-medical screen
  development. Details now lead with post-consultation feedback/reconsultation and
  insurance-state-dependent return journeys, with separate encoding fixes and link-operations
  analysis. Current code verifies satisfaction-specific copy and insurance connection/ownership
  branches. The newer `alimtalkSendToken` propagation commit is by another contributor and is not
  attributed to the author. No retention uplift, campaign ownership or message-volume metrics are
  claimed. Resume links use the exact Rallit resume URL supplied by the author, not the old profile.
- Insurance conversion map (2026-10-02): replaces the project-scope list with three parallel product
  cards converging on application → external chat. Monitoring sits separately below the user flow:
  Sentry error alerts and daily Amplitude funnel checks. This summarizes separate projects toward a
  shared product goal, not a shared-module architecture or measured conversion lift. Mobile stacks
  the product group above the conversion path, without horizontal scrolling.
- Overall review follow-up (2026-10-01): gene renewal now explains preservation of the original
  screens, isolated `.exp` changes with shared packages, temporary duplication/verification cost,
  and completed post-release cleanup. This is the implemented transition approach, not a claim of
  independently inventing it, measured regression reduction, or an undocumented alternatives review.
  Insurance work is mapped to MVP (2023), premium-saving module (2026), family-history (2026), and
  cross-product operations. Activation consistently distinguishes reused/changed screens from new
  bridge/landing development. Its test diagram and Revenue's repeated implementation flows are
  condensed; project drawers retain technical detail. Intro lists start year and current team scope;
  the previously supplied Rallit profile is linked without publishing an inferred email address.
- AARRR purpose audit (2026-10-01): each purpose now has a separate figure rather than a lane inside
  one uniform flow. Acquisition separates SSG delivery, indexing checks and the two submission
  triggers for IndexNow. Activation uses a state-to-destination mapping separate from verification
  coverage. Referral separates sender data conversion from recipient entry. Revenue separates
  pre-release assertions, error alerts and daily funnel checks. Retention keeps its
  implementation/analysis separation. Arrows denote actual sequence or routing; checks are
  unconnected comparison cards. A mistaken expansion of this audit to other project diagrams was
  reverted; previously requested Three-doc system and cache sequences remain. Checked all five AARRR
  drawers in headless Chromium at 1280px and 390px, including dark-mode screenshots: no drawer-level
  horizontal overflow or page errors. ArrowRight navigation from Activation to Retention and the
  existing nine drawer-state tests pass.
- The former AI-review section now covers context, repeatable procedures and review checks. Its
  visible titles/navigation change, but `#review` and `?detail=review` remain compatible. Three-doc
  system is shown here rather than in the gene wrap-up. The source is a draft guide, not evidence of
  complete migration, automated synchronization or ongoing document refresh.
- `tradeoff-proposal-map.tsx` summarizes the health web team's shared judgment criteria and proposal
  → team review → PM decision → recording workflow. The debt rubric's six dimensions,
  approximate/time-boxed assessment and revision based on repayment experience come from
  `tech-debt-criteria.md`; convention-based options come from `current-pattern.md` and
  `make-tradeoff-proposal/SKILL.md`. The PM agreement's original Google Doc was not inspected; only
  the skill's embedded fallback summary is represented. No internal links, detailed scoring,
  invented estimates, measured savings or organization-wide adoption are published. This is a
  health-team collaboration practice, distinct from chapter-wide DRI operations.
- Each AARRR detail opens with a brief frontend perspective, then the separately labeled actual
  contributions. These describe the author's lens on discoverability, first value, return paths,
  sharing and revenue-path reliability, not additional delivered features or measured funnel gains.
- Acquisition domain correction: the author identifies the Naver non-indexing investigation/fix and
  IndexNow integration as content-web work, not health-web work. Following the fix, full-content
  resubmission was needed; CI-level automation was the author's motivation. Inspected implementation
  and API README at `apps/banksaladv2/pages/api/` show CMS-webhook single submissions and an
  explicit bulk submission endpoint. The CI workflow injects configuration but no IndexNow
  submission step was found. Copy distinguishes that intent from implemented webhook/bulk paths and
  makes no claim that all submitted URLs were indexed. Health-web sitemap work remains a separate
  contribution.
- AI review details no longer have a standalone router-test section listing exit codes and output
  contracts. A single sentence in the routing explanation notes script checks for review selection
  and invalid input. Existing source/test evidence remains here; removing the disclaimer does not
  imply measured AI accuracy. Evidence-checking improvements remain part of the review workflow.
- Spec-out copy follows the author's clarification that scope decisions involved PM communication.
  The supplied `make-tradeoff-proposal` skill informed the framing: engineering presents cost/risk
  and options; product-value decisions belong to PM. Historical examples remain limited to gene
  draft saving/restoration and insurance MVP result recalculation. No retrospective estimates,
  documented option matrix, actual use of this skill on those projects or sole decision authority is
  claimed. This edit is portfolio copy, not a new spec-out proposal or an external message.
- `gene-transition-map.tsx` replaces repeated verification/release prose with a horizontal
  lifecycle: tests before refactoring → FF selection between existing/new screens → 2.0 default and
  cleanup. MSW and Sentry appear as separate verification/observation tools. This is a workflow
  concept, not a claim about actual rollout percentages, rollback execution or zero regressions. It
  uses semantic HTML, decorative connectors and a keyboard-scrollable narrow-screen region. Colored
  edge highlights are intentionally avoided.
- Gene 2.0 is presented project-first: renewal of application/progress/results, then the author's
  scaffolding, bridge and state-based landing work. `gene-project-map.tsx` maps experience stages to
  reuse, changes and delegated report implementation based on the author's scope clarifications. It
  is a conceptual scope map, not an exact screen/route sequence or a claim of sole delivery. The
  drawer now follows scope agreement → reuse/new implementation → regression verification → FF
  release control → cleanup/wrap-up. Redirect implementation is a short scope bullet, not the
  featured technical challenge; the large routing diagram, query-merge code excerpt and routing
  verification table are no longer rendered. The narrative emphasizes actual decisions, the
  draft-save scope tradeoff and tests/MSW without invented complexity or savings metrics.
- Feature Flag evidence: before cleanup commit `fd288f717f`, web/webview bridge entry components
  select original versus `.exp` screens through Amplitude experiment hooks. Author-owned cleanup
  commits `fd288f717f` and `785d6c0e0d` remove entries/old screens and experiment keys. This
  supports release branching and post-release cleanup, not a particular rollout percentage, an
  exercised rollback or proven conversion lift. State-based 2.0 landing remains distinct from FF
  routing.
- `funnel-history-details.tsx` adds a distinct useFunnel/history case within the insurance drawer,
  with a compact before/after stack diagram. Verified against author-owned merged PR #14525
  (2026-07-28), commit `75081734f87ac5c64565e84416e2ce6cbfd32645`, the input funnel hook and page.
  `@use-funnel/next` manages input/conditional connection steps; rewinding the nested connection
  flow before replacing with the result removes the leftover input entry. A transition loader avoids
  remounting the input view and duplicate exposure events during navigation. This is a merged
  implementation/PR account, not device verification rerun here or a measured activation gain. Copy
  omits the AI-assistance badge at the author's request, does not claim original
  library/architecture design, and keeps history cleanup separate from the later cache race and from
  gene 2.0.
- DRI details now define the role as retaining domain context and making decisions/reviewing, not
  personally executing every task. `operations-domains.tsx` groups the ten domains from
  `docs/10-dri/foundation.md` into three plain-language categories; scopes summarize group guides.
  The foundation's stale frontmatter says nine, but its body and domain table list ten. This is a
  responsibility map, not a claim that every owner has been assigned or all processes established.
  `operations-branches.tsx` adapts the author's DRI presentation: written ADR discussion, escalation
  only for unresolved questions, recorded deferral, and distributed implementation/verification.
  Branches represent workflow, not literal Git branches. No names, internal links or staffing
  budgets are published. The overview shows three representative domains; the drawer shows all ten.
- Activation copy emphasizes implementing the first-use flow through application, consent and result
  viewing, not generic in-app navigation or measured activation improvement. The overview covers
  genetic-testing launch/operation experience; the detail distinguishes 2.0 state-based landing
  work, which also serves in-progress and returning users. Family-history re-entry/cache correctness
  remains a separate technical case, not an activation outcome.
- Amplitude monitoring clarification (2026-09-30): the author supplied an Agent-configuration
  screenshot and confirmed dashboard integration with received alerts. Insurance and AARRR revenue
  copy now describe daily funnel/entry-path checks, prompt-defined comparison/exclusion rules and
  reports for human on-call diagnosis. The screenshot shows configuration, not measured detection
  accuracy; no custom anomaly algorithm, root-cause automation, delivery channel, time saved or
  incident reduction is claimed. Do not embed the internal screenshot or publish exact thresholds.
- `family-history-details.tsx` / `.module.css`: a separate technical drawer
  (`?detail=family-history`) linked from insurance; the career-entry shortcut was removed on
  request. Sources checked directly: merged PR #14555 (2026-07-28), follow-up #14567 (2026-07-29),
  its diff and both hooks at commit `17653ed7c42b`. `cache-race-sequence.tsx` compares the remaining
  race after the first fix with the follow-up, using screen/query hook, local cache and server
  lifelines. Direct writes were insufficient: an earlier background refetch resolved later and
  overwrote the viewed flag. The follow-up applies Infinity stale time only to that write-once flag
  and waits for cancellation before writing the cache. This is not a server transaction or a promise
  of persistence after failed writes. Server-side view-history writes are omitted from the
  conceptual sequence; query cancellation prevents stale cache application, not necessarily physical
  termination of server processing. Narrow diagrams scroll horizontally with keyboard focus; large
  drawers show the comparison side by side. PR-recorded manual flow verification and static checks
  are labeled as historical evidence, not tests rerun here. No new performance metrics or controlled
  slow-network tests are claimed. Commits credit Claude; the visible assistance badge is omitted at
  the author's request. This does not establish independent discovery of every cause; retain the
  attribution in source notes. The form-value/history issue is intentionally not merged into this
  case.
- HappyTalk reverse-analysis content is now three compact bullets: response branch, parameter
  constraints and lesson learned. The large branch diagram and duplicate pseudocode have been
  removed at the author's request; the separate incident-response map remains.
- Author clarification: the 2.0 redirect landing routes users arriving from banners and other
  domains to the appropriate page for their genetic-testing state. It is not an old-version user
  migration or continuity mechanism. Overview, detail copy, diagram and AARRR activation copy follow
  this distinction. Reusing existing functionality and protecting it with regression tests is a
  separate renewal concern, not the reason for the redirect page.
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
- `detail-diagrams.tsx` / `detail-diagrams.module.css`: gene details show the wrap-up document
  roles; the former routing and verification diagrams are no longer rendered. The former generic
  insurance-observation diagram was removed; the HappyTalk incident-response diagram remains. Labels
  are accessible HTML and connectors are decorative. Narrow layouts adapt via container queries;
  print keeps each figure together. Browser discovery returned no available browser, so visual
  verification remains outstanding.
- `code-evidence.tsx`: short, labeled code evidence in the AI review case. The former gene query
  excerpt is removed to keep the emphasis on renewal decisions. The server fallback, resolver and
  test file were read as evidence. The pre-review force-all/AGENTS.md branch is an actual router
  excerpt; the router smoke suite was rerun and passed 21 checks. Gene tests were inspected, not
  executed in this revision. HappyTalk now uses compact reverse-analysis notes without code. No
  account identifiers, credentials, internal URLs or private imports are published. Source files
  remain unchanged. No latency, conversion, defect-reduction or AI-accuracy result is inferred.
- `happy-talk-diagrams.tsx`: visualizes the incident policy; the integration lesson is summarized in
  `insurance-details.tsx`. Evidence is the author's supplied Markdown exports, read in full: “해피톡
  레슨런 기록” and “상담과정 이슈 발생시 Guide Line” (updated 2024-01-04, author identified as Kim
  Nayoung). The recorded external response HTML branches on Kakao Open Builder's automatic utterance
  event: URL navigation with bot/event ignores supplied parameters; the other branch submits the
  form by POST with parameters. This is historical integration analysis, not code the author
  implemented at the supplier, a current vendor specification or a claim of fixing the supplier. The
  records also note a 20-character custom-field limit and delimiter-related loss. The guide defines
  web/vendor/spec diagnosis, direct web fixes versus supplier communication through the contracted
  partner, and manual matching of application/chat records when their counts differ. No implemented
  validator, disabled chatbot setting, automated recovery or measured incident/revenue improvement
  is inferred. Only sanitized summaries are rendered: no copied HTML, screenshots, customer names,
  account/channel IDs, tokens, internal URLs or detailed data exports. Amplitude monitoring and
  later handoff remain sourced from the author's separate clarifications, not these two documents.
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
- AI-context copy follows the supplied `three-doc-system.md` guide (2026-04-26, draft): tech-spec
  preserves decisions/plans, README explains the code to people, and AGENTS.md holds AI-relevant
  constraints/rules. `ThreeDocSystemMap` visualizes this classification, not a completed migration
  checklist. No team-wide adoption, recurring refresh process, measured AI coverage or completed
  three-document split for every gene file is claimed. The source guide and company repository are
  read-only; its business-rule example values, internal links and planned adoption tasks are not
  copied into the public portfolio.
- `insurance-details.tsx`: insurance is a separate featured collection of work from 2023–2026, not a
  single continuous project. It connects MVP/new webview construction, useFunnel/history and cache
  correctness, external routing/consultation integration, Amplitude/Sentry monitoring, and firsthand
  insurance-claim feedback. The policy-confirmation paragraph was removed from the featured case; no
  claim of code-level policy architecture is made. Content follows the author's project
  clarifications; no conversion lift, unsupported architecture or ownership of another person's
  policy decision/server fix is implied.
- The featured product cases use distinct lenses: gene renewal protects an already-operating product
  through scope agreement, reuse, regression tests/MSW, FF release control and cleanup. Insurance
  covers new product construction, input/result flows, external integration and ongoing monitoring
  of revenue-related conversion paths. Navigation, overview, headings and the insurance diagram use
  this distinction. MVP scope adjustment stays with the construction stage; no regression-free
  launch, conversion lift or revenue improvement is claimed. The undocumented custom-parameter
  limitation comes from the author's work summary and subsequently supplied lesson/incident-guide
  exports; no specific fix or measured reliability/revenue improvement is inferred.
- Mentoring headings use local, unmodified official favicons at 20px: Programmers for Devcourse and
  Sparta for Hanghae Plus. Sources and download date are in `public/images/portfolio/README.md`.
  Both use the career-logo alignment so wrapped text remains vertically centered with the icon.
- Acquisition now includes Goodoc's 2020 procedure encyclopedia as Gatsby static generation (SSG),
  based on career-original G04 and the post-return inventory. PWA/offline/installability is not
  established by those records. This is a short implementation-history item, not a reconstructed
  architecture success story; old indexing/conversion figures remain excluded pending validation.
- AARRR rows each link to independent stage-specific details: acquisition (Gatsby
  SSG/sitemap/IndexNow), activation (application flow and state-based landing), retention
  (message-entry pages and webview routing), referral (health-preview screens and sharing), revenue
  (consultation and monitoring). Five supporting drawers live in `journey-details.tsx`, with 2–3
  confirmed work bullets each. Repeated context/contribution paragraphs and duplicate diagrams are
  removed. Activation/revenue offer optional drill-down links to the featured gene/insurance cases.
  Previous/Next and keyboard navigation remain. Sharing stays limited to confirmed scope; the
  snapshot idea is not presented as shipped work. AARRR is an experience map, not five equally deep
  standalone case studies.
- Section subtitles use the same local Banksalad PNG as career headings, at 18px with empty alt
  text. The adjacent visible company name supplies the label. A flex row centers the logo against
  the full text block when the subtitle wraps, while keeping the text left-aligned.
- On 2026-10-05, the author requested `2021.04` for the Banksalad start month displayed in the
  portfolio, superseding the earlier `2021.03` display instruction. This change is portfolio-only;
  the author handles Rallit separately.
- Editorial revision: the resume should summarize role, contribution and delivered work in 2–3
  bullets per project, while the portfolio explains constraints, choices and verification. Gene
  content foregrounds state-based entry into 2.0, flow-first scope agreement, shared redirect rules
  and separately scoped regression testing. The application draft-save scope exclusion comes from
  the author's direct clarification, not an inferred code decision. No alternative evaluation,
  failure story, performance metric or SSR outcome is invented. AI and operating-framework status is
  consolidated at the top of each case; redundant disclaimers and duplicate contribution caveats are
  removed. The insurance-claim example retains the author's reporting role and credits the actual
  decision and implementation owners in its outcome. Resume/doc replacement copy was prepared
  separately because access to the vault remains denied; the source resume has not been edited or
  fully audited.
- Career company headings use local, unmodified PNG logos at 20px. Sources:
  [Banksalad official favicon](https://cdn.banksalad.com/app/meta/introduce-a/favicon.png) and
  [Goodoc app icon, published by Goodoc Co.,Ltd on the App Store](https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e9/cb/a3/e9cba3bd-85e5-7dff-4168-649554fded80/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/100x100bb.png).
  Files: `public/images/portfolio/{banksalad,goodoc}.png`. Decorative empty alt text avoids
  repeating the adjacent company name. Logos identify employers, not endorsement.
- `scroll-effects.tsx`: whole-section reveals (not separate heading/body animations), selective
  marker-style text highlights, and sequential diagram steps. Highlights use a translucent green
  band behind the glyphs, not a link-like underline, with separate light/dark opacity. Browser
  checks cover reveal/reset, reduced motion and print. Motion begins at 70% of viewport height (30%
  above the bottom). Pixel root margins and zero threshold handle mobile and very tall sections.
  Scrolling back up resets elements only as they leave below the full viewport, so they replay on
  re-entry without flickering at the central trigger. Focused content is revealed for keyboard
  navigation. Already-read content above stays visible. Text remains available without JS;
  reduced-motion and printing reveal everything immediately.
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
come from the full career source. On 2026-09-30 the author recalled Devcourse ending around
mid-2023; the UI preserves that approximation rather than inventing an exact month.

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

Revenue/insurance monitoring copy was checked against `libs/utils/error/src/critical-error.ts` and
the insurance `sentry-insurance-error-handler.ts` implementations. The handler wraps errors in
`CriticalError`, sets `level: 'fatal'` and fingerprints by class/message; it excludes selected
HTTP/network/timeout errors. This is an application-defined class, not a Sentry SDK class. The copy
does not claim authorship of the original shared class, whose creation predates the available
history. Alert use and the complementary daily funnel checks are author-confirmed; live Sentry alert
configuration and measured response-time improvements were not independently verified. The funnel
combines revenue-dashboard events and additional measurement events, with the existing Amplitude
Agent daily check providing a slower, aggregate signal alongside error alerts.

Pre-release test credit is limited to the author's verified test additions in commit `6286d29676`
(2026-07-29): the consultation hook's existing tests were extended to check insurance sync status in
the completion event. The commit includes an AI co-author. Current tests also cover link generation,
fallback/error logging and loading/error behavior, but the portfolio does not attribute the whole
suite to the author. Source and historical diff were inspected; company tests and a historical
pre-release run were not rerun or verified in this portfolio editing session.

The five AARRR drawers include compact, responsive diagrams in `journey-detail-map.tsx`. Acquisition
keeps three products' search work in separate lanes; activation shows state-based destinations, not
a mandatory linear sequence of all states. Retention shows message re-entry; referral separates
sender-side data conversion from the voucher recipient's entry path. Revenue separates pre-release
tests from independent error-alert and daily aggregate-monitoring paths. No conversion rates or
measured improvements are inferred from diagrams.

Referral details are supplemented by the author's supplied `뱅샐-공유하기.pdf`, a seven-page
2022-12-23 tech-talk record. All pages were text-extracted and visually inspected. Pages 3–4
describe domain sharing data converted into platform-specific objects and passed to UI; pages 5–6
show implemented SNS sharing and voucher-link entry with code prefill. Page 7 discusses client-side
long-link tradeoffs under limited server capacity. This is historical evidence, not current SDK
guidance; no numeric link-length limit or measured referral lift is claimed. The source PDF,
screenshots and internal repository links are not published in the portfolio.

Retention was expanded from the author's five supplied dynamic-link pain-point screenshots and
follow-up attribution. The historical analysis covers web URL/deep-link/dynamic-link composition,
nested encoding, per-user and marketing parameter replacement, messaging-channel length constraints,
and OS/channel testing plus PM/marketing/server coordination. Short-link parameter overrides were
identified as a desired replacement capability, not a capability verified here for Airbridge. The
author confirms raising these issues contributed to a subsequent Airbridge transition; credit is
limited to problem analysis, reporting and providing evaluation requirements, not contracting,
migration ownership or measured retention/operational improvement. Historical provider constraints
are not presented as current technical guidance. Screenshots and internal URLs are not published.

Final content alignment (2026-09-30): the intro now foregrounds shared context, reusable tools and
procedures, and reflection rather than naming the review project. AARRR copy is condensed alongside
the diagrams; detailed implementation remains in the linked project drawers. Acquisition credits the
author with guiding the creation of the SEO skill/checklist and sitemap operating guide, not
personally authoring every implementation detail. The author confirmed return from parental leave in
October 2025. Hanghae Plus dates remain from the existing record, not reconfirmed here.

The Obsidian Rallit resume became accessible and was updated in this session. Earlier access-denied
notes above describe previous edits, not current access. The Rallit summary now aligns FF renewal,
family-history query/history fixes, monitoring, review-prototype status, SEO domain boundaries,
shared operating artifacts and historical sharing work. Other resume versions and the Obsidian
portfolio source were not automatically synchronized; no external Rallit profile was edited.
