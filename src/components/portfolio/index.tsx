'use client';

// 비공개 포트폴리오 페이지(content/private/portfolio-2026.mdx) 전용 컴포넌트 모음.
// 본문 폭이 700px로 고정된 블로그 레이아웃 안에서 한 열 카드형으로 구성한다.

import * as React from 'react';
import { motion, useInView, useScroll } from 'motion/react';
import {
  IconArrowRight,
  IconChevronDown,
  IconDeviceMobile,
  IconLayersIntersect,
  IconMap2,
  IconSearch,
  IconSend,
  IconUserCheck,
  IconGitBranch,
  IconTools,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

/* ---------------------------------- 층(레이어) 색 ---------------------------------- */

type Layer = 'product' | 'user' | 'team' | 'neutral';

const LAYER_STYLE: Record<
  Layer,
  { label: string; dot: string; border: string; soft: string; text: string; ring: string }
> = {
  product: {
    label: '제품',
    dot: 'bg-emerald-500',
    border: 'border-emerald-400/70',
    soft: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    ring: 'ring-emerald-400',
  },
  user: {
    label: '유저',
    dot: 'bg-sky-500',
    border: 'border-sky-400/70',
    soft: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
    ring: 'ring-sky-400',
  },
  team: {
    label: '팀',
    dot: 'bg-violet-500',
    border: 'border-violet-400/70',
    soft: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-700 dark:text-violet-300',
    ring: 'ring-violet-400',
  },
  neutral: {
    label: '',
    dot: 'bg-stone-400',
    border: 'border-stone-300/70 dark:border-stone-600/70',
    soft: 'bg-stone-50 dark:bg-stone-900/40',
    text: 'text-stone-600 dark:text-stone-300',
    ring: 'ring-stone-400',
  },
};

const LayerContext = React.createContext<Layer>('neutral');

const CARD =
  'rounded-xl border bg-white/70 dark:bg-white/[0.04] shadow-sm backdrop-blur-[2px] border-stone-200/80 dark:border-stone-700/60';

const Reveal = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial={{ y: 14 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

/* ------------------------------------ 히어로 ------------------------------------ */

const useCountUp = (target: number, active: boolean, durationMs = 900) => {
  const [value, setValue] = React.useState(target);
  React.useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs]);
  return value;
};

type Stat = { value: number; suffix: string; label: string };

const StatItem = ({ stat, active }: { stat: Stat; active: boolean }) => {
  const n = useCountUp(stat.value, active);
  return (
    <div className="flex flex-col items-start">
      <div className="text-2xl font-bold tabular-nums leading-none">
        {n}
        <span className="ml-0.5 text-base font-semibold text-stone-500 dark:text-stone-400">
          {stat.suffix}
        </span>
      </div>
      <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">{stat.label}</div>
    </div>
  );
};

const PRINCIPLE_ICONS = [IconUserCheck, IconGitBranch, IconTools];

export const PfHero = ({
  name,
  headline,
  principles,
  links,
  stats,
  children,
}: {
  name: string;
  headline: string;
  principles: { title: string; body: string }[];
  links: { label: string; href: string }[];
  stats: Stat[];
  children?: React.ReactNode;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  return (
    <div ref={ref} className="not-prose mb-10">
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm text-stone-500 dark:text-stone-400">{name}</div>
        <h1 className="mt-1 text-2xl font-bold leading-snug tracking-tight sm:text-[1.7rem]">
          {headline}
        </h1>
      </motion.div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {principles.map((p, i) => {
          const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length];
          return (
            <motion.div
              key={p.title}
              className={cn(CARD, 'p-4')}
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Icon size={18} className="text-stone-500 dark:text-stone-400" />
                {p.title}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-stone-600 dark:text-stone-300">
                {p.body}
              </p>
            </motion.div>
          );
        })}
      </div>

      {children && (
        <div className="mt-5 text-[15px] leading-relaxed text-stone-700 dark:text-stone-200">
          {children}
        </div>
      )}

      <div className={cn(CARD, 'mt-5 flex flex-wrap items-end justify-between gap-4 p-4')}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:gap-8">
          {stats.map(s => (
            <StatItem key={s.label} stat={s} active={inView} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-stone-300/80 px-3 py-1 text-xs text-stone-600 no-underline transition hover:bg-stone-100 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------ 타임라인 ------------------------------------ */

export const PfTimeline = ({
  items,
}: {
  items: { period: string; where: string; role: string; projects?: string[]; muted?: boolean }[];
}) => (
  <div className="not-prose relative my-6 ml-2 border-l-2 border-stone-200 pl-6 dark:border-stone-700">
    {items.map((it, i) => (
      <Reveal key={it.period} className="relative pb-7 last:pb-0">
        <span
          className={cn(
            'absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[rgb(250,245,233)] dark:ring-[rgb(21,18,13)]',
            it.muted ? 'bg-stone-300 dark:bg-stone-600' : 'bg-stone-800 dark:bg-stone-200'
          )}
        />
        <div className="text-xs font-medium tabular-nums text-stone-500 dark:text-stone-400">
          {it.period}
        </div>
        <div className="mt-0.5 font-semibold">{it.where}</div>
        <div className="mt-0.5 text-[14px] text-stone-600 dark:text-stone-300">{it.role}</div>
        {it.projects && it.projects.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {it.projects.map(p => (
              <span
                key={p}
                className="rounded-md bg-stone-100 px-2 py-0.5 text-[12px] text-stone-600 dark:bg-stone-800 dark:text-stone-300"
              >
                {p}
              </span>
            ))}
          </div>
        )}
        {i < items.length - 1 && <span className="sr-only">다음</span>}
      </Reveal>
    ))}
  </div>
);

/* ------------------------------------ 일하는 습관 ------------------------------------ */

export type Habit = { step: string; summary: string; tags: string[]; detail?: string };

const HabitStep = ({ habit, index, last }: { habit: Habit; index: number; last: boolean }) => {
  const ref = React.useRef<HTMLLIElement>(null);
  // 화면 세로 중앙 부근을 지나는 단계를 현재 단계로 본다
  const active = useInView(ref, { margin: '-45% 0px -45% 0px' });
  return (
    <li ref={ref} className={cn('relative pl-9', !last && 'pb-6')}>
      <span
        className={cn(
          'absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors duration-300',
          active
            ? 'border-stone-800 bg-stone-800 text-white dark:border-stone-200 dark:bg-stone-200 dark:text-stone-900'
            : 'border-stone-300 bg-[rgb(250,245,233)] text-stone-500 dark:border-stone-600 dark:bg-[rgb(21,18,13)] dark:text-stone-400'
        )}
      >
        {index + 1}
      </span>
      <motion.div
        animate={{ x: active ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className={cn(
          CARD,
          'px-4 py-3 transition-shadow duration-300',
          active ? 'shadow-md' : 'shadow-none'
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {habit.step}
          </span>
          <span className="text-[15px] font-semibold">{habit.summary}</span>
        </div>
        {habit.detail && (
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-stone-600 dark:text-stone-300">
            {habit.detail}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {habit.tags.map(t => (
            <span
              key={t}
              className="rounded-md bg-stone-100 px-2 py-0.5 text-[12px] text-stone-600 dark:bg-stone-800 dark:text-stone-300"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </li>
  );
};

export const PfHabits = ({ items }: { items: Habit[] }) => {
  const ref = React.useRef<HTMLOListElement>(null);
  // 목록이 화면을 지나는 동안 연결선이 위에서 아래로 채워진다
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 55%'] });
  return (
    <ol ref={ref} className="not-prose relative my-6 list-none p-0">
      <span className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-stone-200 dark:bg-stone-700" />
      <motion.span
        style={{ scaleY: scrollYProgress }}
        className="absolute bottom-3 left-[11px] top-3 w-0.5 origin-top bg-stone-800 dark:bg-stone-200"
      />
      {items.map((h, i) => (
        <HabitStep key={h.step} habit={h} index={i} last={i === items.length - 1} />
      ))}
    </ol>
  );
};

/* ------------------------------------ 3층 내비 ------------------------------------ */

const LAYER_IDS: { id: string; layer: Layer; label: string }[] = [
  { id: 'layer-product', layer: 'product', label: '1. 제품' },
  { id: 'layer-user', layer: 'user', label: '2. 유저' },
  { id: 'layer-team', layer: 'team', label: '3. 팀' },
];

export const PfLayerNav = () => {
  const [active, setActive] = React.useState<string>('');
  React.useEffect(() => {
    const sections = LAYER_IDS.map(l => document.getElementById(l.id)).filter(Boolean);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s as Element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="not-prose sticky top-2 z-30 my-6 flex justify-center">
      <div className="flex gap-1 rounded-full border border-stone-200/80 bg-[rgb(250,245,233)]/90 p-1 shadow-sm backdrop-blur dark:border-stone-700 dark:bg-[rgb(21,18,13)]/90">
        {LAYER_IDS.map(l => {
          const s = LAYER_STYLE[l.layer];
          const on = active === l.id;
          return (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] no-underline transition',
                on ? cn(s.soft, s.text, 'font-semibold') : 'text-stone-500 dark:text-stone-400'
              )}
            >
              <span className={cn('h-2 w-2 rounded-full', s.dot)} />
              {l.label}
            </a>
          );
        })}
        <PfExpandAll />
      </div>
    </div>
  );
};

/* ------------------------------------ 층 섹션 ------------------------------------ */

export const PfSection = ({
  layer,
  id,
  title,
  lede,
  children,
}: {
  layer: Layer;
  id?: string;
  title: string;
  lede?: string[];
  children: React.ReactNode;
}) => {
  const s = LAYER_STYLE[layer];
  const sectionId = id ?? `layer-${layer}`;
  return (
    <LayerContext.Provider value={layer}>
      <section id={sectionId} className="scroll-mt-16">
        <Reveal>
          <div className={cn('not-prose mt-12 rounded-2xl border p-5', s.border, s.soft)}>
            <div className={cn('text-xs font-semibold uppercase tracking-wider', s.text)}>
              {s.label}
            </div>
            <h2 className="mt-1 text-xl font-bold leading-snug">{title}</h2>
            {lede && lede.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-stone-600 dark:text-stone-300">
                {lede.map(l => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
        {children}
      </section>
    </LayerContext.Provider>
  );
};

/* ------------------------------------ 사례 카드 ------------------------------------ */

const EXPAND_EVENT = 'pf-expand-all';

export const PfExpandAll = () => {
  const [all, setAll] = React.useState(false);
  const toggle = () => {
    const next = !all;
    setAll(next);
    window.dispatchEvent(new CustomEvent(EXPAND_EVENT, { detail: next }));
  };
  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1 rounded-full px-3 py-1 text-[12px] text-stone-500 transition hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100"
    >
      {all ? '모두 접기' : '모두 펼치기'}
      <IconChevronDown size={14} className={cn('transition-transform', all && 'rotate-180')} />
    </button>
  );
};

const CASE_SLOTS: { key: 'problem' | 'cause' | 'solution' | 'decision' | 'result'; label: string; cls: string }[] = [
  { key: 'problem', label: '문제', cls: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
  { key: 'cause', label: '원인', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  { key: 'solution', label: '해결', cls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' },
  { key: 'decision', label: '판단', cls: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' },
  { key: 'result', label: '결과', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
];

type CaseSlots = Partial<Record<(typeof CASE_SLOTS)[number]['key'], string>>;

export const PfCase = ({
  title,
  when,
  note,
  summary,
  defaultOpen = false,
  children,
  ...slots
}: {
  title: string;
  when?: string;
  note?: string;
  summary?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
} & CaseSlots) => {
  const layer = React.useContext(LayerContext);
  const s = LAYER_STYLE[layer];
  const [open, setOpen] = React.useState(defaultOpen);
  React.useEffect(() => {
    const onAll = (e: Event) => setOpen(Boolean((e as CustomEvent).detail));
    window.addEventListener(EXPAND_EVENT, onAll);
    return () => window.removeEventListener(EXPAND_EVENT, onAll);
  }, []);
  const filled = CASE_SLOTS.filter(slot => slots[slot.key]);
  const hasBody = filled.length > 0 || Boolean(children);
  return (
    <Reveal>
      <div
        className={cn(
          CARD,
          'pf-case my-2.5 border-l-4 transition',
          s.border,
          open ? 'shadow-md' : 'hover:shadow-md'
        )}
      >
        <button
          type="button"
          onClick={() => hasBody && setOpen(o => !o)}
          aria-expanded={open}
          className={cn(
            'flex w-full items-start gap-3 px-4 py-3 text-left',
            hasBody ? 'cursor-pointer' : 'cursor-default'
          )}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-semibold">{title}</span>
              {when && (
                <span className="text-xs tabular-nums text-stone-500 dark:text-stone-400">
                  {when}
                </span>
              )}
              {note && (
                <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                  {note}
                </span>
              )}
            </div>
            {summary && (
              <div className="mt-0.5 text-[13.5px] leading-relaxed text-stone-600 dark:text-stone-300">
                {summary}
              </div>
            )}
          </div>
          {hasBody && (
            <IconChevronDown
              size={16}
              className={cn(
                'mt-1 shrink-0 text-stone-400 transition-transform duration-300',
                open && 'rotate-180'
              )}
            />
          )}
        </button>
        {hasBody && (
          <motion.div
            initial={false}
            animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="pf-case-body overflow-hidden"
            aria-hidden={!open}
          >
            <div className="border-t border-stone-200/70 px-4 pb-3 pt-2.5 text-[14px] leading-relaxed text-stone-700 dark:border-stone-700/60 dark:text-stone-200">
              {filled.length > 0 && (
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
                  {filled.map(slot => (
                    <React.Fragment key={slot.key}>
                      <dt className="pt-0.5">
                        <span
                          className={cn(
                            'inline-block rounded-md px-1.5 py-0.5 text-[11px] font-semibold leading-none',
                            slot.cls
                          )}
                        >
                          {slot.label}
                        </span>
                      </dt>
                      <dd className="m-0">{slots[slot.key]}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              )}
              {children && <div className={cn(filled.length > 0 && 'mt-2')}>{children}</div>}
            </div>
          </motion.div>
        )}
      </div>
    </Reveal>
  );
};

/* ------------------------------------ 앱 안 레이어 다이어그램 ------------------------------------ */

const APP_LAYERS = [
  { id: 'infra-server', icon: IconLayersIntersect, label: '인프라·서버', desc: 'proto 계약, k8s SSR 서버, IDL 타입' },
  { id: 'native-routing', icon: IconDeviceMobile, label: '네이티브 라우팅', desc: '앱이 웹뷰를 열고 닫는 경계' },
  { id: 'data-layer', icon: IconGitBranch, label: '클라이언트 데이터', desc: '캐시, race, 서버 상태' },
  { id: 'render-layer', icon: IconTools, label: '렌더링', desc: 'React children, CSS line box' },
];

export const PfAppLayers = ({ targets }: { targets?: Record<string, string> }) => {
  const [hover, setHover] = React.useState<string | null>(null);
  return (
    <div className="not-prose my-5">
      <div className="flex flex-col gap-1.5">
        {APP_LAYERS.map((l, i) => {
          const Icon = l.icon;
          const href = targets?.[l.id];
          const Comp: any = href ? 'a' : 'div';
          return (
            <motion.div
              key={l.id}
              initial={{ x: -10 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Comp
                href={href}
                onMouseEnter={() => setHover(l.id)}
                onMouseLeave={() => setHover(null)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border px-3 py-2 no-underline transition',
                  'border-sky-200/70 dark:border-sky-900/60',
                  hover === l.id
                    ? 'bg-sky-100/80 dark:bg-sky-900/40'
                    : 'bg-sky-50/60 dark:bg-sky-950/30'
                )}
                style={{ marginLeft: i * 14 }}
              >
                <Icon size={18} className="shrink-0 text-sky-700 dark:text-sky-300" />
                <div className="flex-1">
                  <div className="text-[13px] font-semibold">{l.label}</div>
                  <div className="text-[12px] text-stone-500 dark:text-stone-400">{l.desc}</div>
                </div>
                {href && <IconArrowRight size={14} className="text-stone-400" />}
              </Comp>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-2 text-center text-[12px] text-stone-500 dark:text-stone-400">
        유저가 화면에 닿기까지 지나는 층. 어느 층에서 문제가 나는지 알아야 원인까지 내려간다
      </div>
    </div>
  );
};

/* ------------------------------------ 앱 밖 채널 다이어그램 ------------------------------------ */

const CHANNELS = [
  { id: 'organic', icon: IconSearch, label: '오가닉', desc: '검색으로 오는 탐색 유저' },
  { id: 'offline', icon: IconMap2, label: '오프라인', desc: '검사 키트 QR' },
  { id: 'crm', icon: IconSend, label: 'CRM', desc: '앱 푸시·알림톡' },
];

export const PfChannels = ({ targets }: { targets?: Record<string, string> }) => (
  <div className="not-prose my-5">
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
      <div className="flex flex-col gap-1.5">
        {CHANNELS.map((c, i) => {
          const Icon = c.icon;
          const href = targets?.[c.id];
          const Comp: any = href ? 'a' : 'div';
          return (
            <motion.div
              key={c.id}
              initial={{ x: -10 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Comp
                href={href}
                className="flex items-center gap-3 rounded-lg border border-sky-200/70 bg-sky-50/60 px-3 py-2 no-underline transition hover:bg-sky-100/80 dark:border-sky-900/60 dark:bg-sky-950/30 dark:hover:bg-sky-900/40"
              >
                <Icon size={18} className="shrink-0 text-sky-700 dark:text-sky-300" />
                <div>
                  <div className="text-[13px] font-semibold">{c.label}</div>
                  <div className="text-[12px] text-stone-500 dark:text-stone-400">{c.desc}</div>
                </div>
              </Comp>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ x: -6 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-stone-400"
      >
        <IconArrowRight size={22} />
      </motion.div>
      <motion.div
        initial={{ scale: 0.92 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="flex h-24 w-20 flex-col items-center justify-center rounded-2xl border-2 border-stone-800 bg-white text-center dark:border-stone-200 dark:bg-stone-900"
      >
        <IconDeviceMobile size={22} />
        <div className="mt-1 text-[12px] font-semibold">앱 전환</div>
      </motion.div>
    </div>
  </div>
);

/* ------------------------------------ 기타 ------------------------------------ */

export const PfChips = ({ items }: { items: string[] }) => (
  <div className="not-prose my-3 flex flex-wrap gap-1.5">
    {items.map(t => (
      <span
        key={t}
        className="rounded-md border border-stone-200 bg-white/60 px-2 py-0.5 text-[12px] text-stone-700 dark:border-stone-700 dark:bg-white/[0.04] dark:text-stone-200"
      >
        {t}
      </span>
    ))}
  </div>
);

export const PfDivider = ({ label }: { label?: string }) => (
  <div className="not-prose my-10 flex items-center gap-3 text-xs text-stone-400">
    <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
    {label && <span>{label}</span>}
    <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
  </div>
);

export const PfCompany = ({
  name,
  period,
  role,
  children,
}: {
  name: string;
  period: string;
  role?: string;
  children?: React.ReactNode;
}) => (
  <Reveal>
    <div className="not-prose mt-12 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h1 className="text-2xl font-bold">{name}</h1>
      <span className="text-sm tabular-nums text-stone-500 dark:text-stone-400">{period}</span>
      {role && <span className="text-[14px] text-stone-600 dark:text-stone-300">{role}</span>}
    </div>
    {children && (
      <div className="mt-2 text-[14px] leading-relaxed text-stone-600 dark:text-stone-300">
        {children}
      </div>
    )}
  </Reveal>
);

/* ------------------------------------ 화면 스크린샷 ------------------------------------ */

// 출시되어 누구나 앱에서 볼 수 있는 화면만 넣는다. 어드민·대시보드·미출시 실험 화면은 넣지 않는다.
export const PfShot = ({
  items,
  caption,
}: {
  items: { src: string; alt: string; label?: string }[];
  caption?: string;
}) => (
  <Reveal className="not-prose my-4">
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, minmax(0, 1fr))` }}
    >
      {items.map(it => (
        <figure key={it.src} className="m-0">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm dark:border-stone-700 dark:bg-stone-800">
            <img src={it.src} alt={it.alt} loading="lazy" className="block w-full" />
          </div>
          {it.label && (
            <figcaption className="mt-1 text-center text-[12px] text-stone-500 dark:text-stone-400">
              {it.label}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
    {caption && (
      <div className="mt-2 text-center text-[12px] text-stone-500 dark:text-stone-400">{caption}</div>
    )}
  </Reveal>
);

/* ------------------------------------ 페이지 단위 섹션 ------------------------------------ */

// 문서를 한 화면 단위의 페이지로 나눈다. 스냅은 globals.css의 html:has(.pf-page) 규칙이 담당한다.
export const PfPage = ({
  id,
  no,
  label,
  children,
}: {
  id: string;
  no: string;
  label: string;
  children: React.ReactNode;
}) => (
  <section id={id} data-page-label={label} data-page-no={no} className="pf-page">
    <div className="not-prose mb-4 flex items-baseline justify-between border-b border-dashed border-stone-300/80 pb-2 dark:border-stone-700">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
        {label}
      </span>
      <span className="text-[11px] tabular-nums text-stone-400">{no}</span>
    </div>
    {children}
  </section>
);

export const PfPageNav = () => {
  const [pages, setPages] = React.useState<{ id: string; label: string; no: string }[]>([]);
  const [active, setActive] = React.useState('');
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.pf-page'));
    setPages(els.map(e => ({ id: e.id, label: e.dataset.pageLabel ?? '', no: e.dataset.pageNo ?? '' })));
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    );
    els.forEach(e => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  if (pages.length === 0) return null;
  const idx = Math.max(0, pages.findIndex(p => p.id === active));
  return (
    <div className="not-prose sticky top-2 z-30 my-4 flex justify-center">
      <div className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-stone-200/80 bg-[rgb(250,245,233)]/92 px-1.5 py-1 shadow-sm backdrop-blur dark:border-stone-700 dark:bg-[rgb(21,18,13)]/92">
        {pages.map((p, i) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            title={p.label}
            className={cn(
              'flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[12px] no-underline transition',
              active === p.id
                ? 'bg-stone-800 font-semibold text-white dark:bg-stone-200 dark:text-stone-900'
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100'
            )}
          >
            <span className="tabular-nums opacity-70">{p.no}</span>
            <span className={cn('hidden sm:inline', active !== p.id && 'sr-only md:not-sr-only')}>{p.label}</span>
          </a>
        ))}
        <span className="ml-1 shrink-0 border-l border-stone-300/70 pl-1.5 text-[11px] tabular-nums text-stone-400 dark:border-stone-600">
          {idx + 1}/{pages.length}
        </span>
        <PfExpandAll />
      </div>
    </div>
  );
};
