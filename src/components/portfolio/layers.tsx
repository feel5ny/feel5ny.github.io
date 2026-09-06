'use client';

// 층(제품·유저·팀) 다이어그램과 노드 패널. 사례 데이터는 cases.ts, 노드 정의는 이 파일이 가진다.

import * as React from 'react';
import { motion } from 'motion/react';
import {
  IconArrowRight,
  IconChevronDown,
  IconLink,
  IconCheck,
  IconUserCheck,
  IconGitBranch,
  IconRocket,
  IconShieldCheck,
  IconChartDots,
  IconBellRinging,
  IconServer,
  IconDeviceMobile,
  IconDatabase,
  IconBrush,
  IconSearch,
  IconQrcode,
  IconSend,
  IconBook2,
  IconListCheck,
  IconLock,
  IconSchool,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { CASES, type Kind, type Layer, type PfCaseData } from './cases';

/* ------------------------------------ 층 정의 ------------------------------------ */

type Node = { id: string; label: string; desc: string; icon: React.ComponentType<{ size?: number; className?: string }> };
type Group = { id: string; title: string; caption?: string; shape: 'steps' | 'stack' | 'channels' | 'grid'; nodes: Node[] };
type LayerDef = { layer: Layer; label: string; title: string; lede: string[]; groups: Group[] };

const LAYERS: LayerDef[] = [
  {
    layer: 'product',
    label: '제품',
    title: '완성도 있게 만들고, 매출 구간은 깨지지 않게 지킨다',
    lede: [
      '비개발자 눈에 보이지 않는 개발 관점의 구멍과 엣지케이스를 잡고 가는 것이 개발자의 역할이라고 봅니다.',
      '제품이 완성도 있게 나가는 것을 원하고, 그것을 잘합니다.',
      '매출이 발생하는 구간을 지키는 것은 회사의 목표와 브랜드를 지키는 것이므로, 그 구간의 가드는 2중 3중으로 두고 모니터링합니다.',
    ],
    groups: [
      {
        id: 'quality',
        title: '완성도: 개발 관점에서만 보이는 것을 개발 전에 결정으로 닫는다',
        caption: '재진입·상태 조합·실패·경계값·기존 코드의 정책은 기획서에 빠지기 쉽다. 무엇을 물을지 정하고 PM이 결정할 것을 골라 개발 전에 닫는다',
        shape: 'steps',
        nodes: [
          { id: 'user-first', label: '유저로서 먼저', desc: '정식 리서치 전에 끝까지 써 본다', icon: IconUserCheck },
          { id: 'code-to-plan', label: '코드를 기획으로', desc: '코드가 더 아는 정책을 PM에게', icon: IconGitBranch },
          { id: 'rollout', label: '배포하면서 잡는다', desc: '1% → 100%, 실험군 태그', icon: IconRocket },
        ],
      },
      {
        id: 'stability',
        title: '안정성: 매출에 닿는 흐름을 지킨다',
        caption: '누가 지키는지를 먼저 정하고, 측정 자체를 감시하고, 온콜에서 이상 징후를 먼저 본다',
        shape: 'grid',
        nodes: [
          { id: 'revenue-path', label: '매출 여정', desc: '상담 연동·신규 제품·런칭', icon: IconShieldCheck },
          { id: 'measure', label: '측정', desc: '실험 배정·이벤트 자체를 감시', icon: IconChartDots },
          { id: 'oncall', label: '온콜', desc: '2주 로테이션, 사람 기억에 의존하지 않게', icon: IconBellRinging },
        ],
      },
    ],
  },
  {
    layer: 'user',
    label: '유저',
    title: '앱 안팎에서 거쳐 오는 경로를 안다',
    lede: [
      '유저가 앱에서 화면에 닿기까지의 과정을 알아야 디버깅이 되고, UX를 개선할 때 어디를 어떻게 조사할지 알 수 있습니다.',
      '앱 밖에서는 검색으로 들어오는 탐색 유저가 있습니다. 목적이 분명한 유저라 앱 전환으로 이어지고, 이 풀은 트렌드를 읽는 창이기도 합니다.',
      '굿닥에서 대표가 SEO 강의까지 지원하며 강조한 것을 지금 회사에서는 혼자서라도 모니터링하고 PM에게 전파했습니다.',
    ],
    groups: [
      {
        id: 'in-app',
        title: '앱 안: 유저가 화면에 닿기까지의 레이어',
        caption: '인프라를 직접 관리하지는 않지만 어느 층에서 문제가 나는지 알아야 원인까지 내려가고, 에러를 서버·인프라·SDK 중 어디로 보낼지 정할 수 있다',
        shape: 'stack',
        nodes: [
          { id: 'infra', label: '인프라·서버', desc: 'proto 계약, k8s SSR 서버, IDL 타입', icon: IconServer },
          { id: 'native', label: '네이티브 라우팅', desc: '앱이 웹뷰를 열고 닫는 경계', icon: IconDeviceMobile },
          { id: 'data', label: '클라이언트 데이터', desc: '캐시, race, 서버 상태', icon: IconDatabase },
          { id: 'render', label: '렌더링', desc: 'React children, CSS line box', icon: IconBrush },
        ],
      },
      {
        id: 'out-app',
        title: '앱 밖: 오가닉·오프라인·CRM 채널에서 오는 유저를 데려온다',
        caption: '일상의 검색이 유입 풀이 된다는 것을 아는 개발자는 생각보다 적다. CRM 채널은 진입 페이지가 플랫폼마다 생겨 지켜야 할 구간이 된다',
        shape: 'channels',
        nodes: [
          { id: 'organic', label: '오가닉', desc: '검색으로 오는 탐색 유저', icon: IconSearch },
          { id: 'offline', label: '오프라인', desc: '검사 키트 QR', icon: IconQrcode },
          { id: 'crm', label: 'CRM', desc: '앱 푸시·알림톡', icon: IconSend },
        ],
      },
    ],
  },
  {
    layer: 'team',
    label: '팀',
    title: '개인이 떠안던 비용·실수·결정을 팀의 절차로 옮긴다',
    lede: [
      '사람은 성향이 다르고, 그것을 한 방향으로 움직이게 하는 것은 결국 시스템입니다. 잦은 실수는 시스템이 막게 하고 사람은 그 위에서 더 성숙한 구간으로 올라가게 합니다.',
      '가장 좋은 결정은 그 맥락을 가장 잘 아는 사람에게서 나오는데, 많은 조직이 그런 사람을 한 명만 만들어 병목이자 단일장애점으로 만듭니다.',
      '맥락을 쌓는 비용과 기록하는 비용을 LLM이 낮춰 주는 지금이 그 체계를 만들 때라고 보고, 아래 장치들을 그 방향으로 만들었습니다.',
    ],
    groups: [
      {
        id: 'system',
        title: '맥락 · 절차 · 게이트 · 역량',
        caption: '규칙과 결정은 LLM이 읽는 자리에(맥락), 사람마다 달랐던 기준은 합의된 규칙으로(절차), 실수는 코드가 막게(게이트), 판단할 수 있는 사람을 늘린다(역량)',
        shape: 'grid',
        nodes: [
          { id: 'context', label: '맥락', desc: 'SoT는 한 곳에, LLM이 닿는 자리에', icon: IconBook2 },
          { id: 'procedure', label: '절차', desc: '개인의 의지를 조직 절차로', icon: IconListCheck },
          { id: 'gate', label: '게이트', desc: '인지하지 못해도 코드가 막게', icon: IconLock },
          { id: 'capability', label: '역량', desc: '판단할 수 있는 사람을 늘리기', icon: IconSchool },
        ],
      },
    ],
  },
];

const LAYER_STYLE: Record<Layer, { text: string; soft: string; border: string; dot: string; node: string; nodeOn: string }> = {
  product: { text: 'text-emerald-700 dark:text-emerald-300', soft: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-400/70', dot: 'bg-emerald-500', node: 'border-emerald-200/70 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/30', nodeOn: 'border-emerald-500 bg-emerald-100/80 dark:border-emerald-400 dark:bg-emerald-900/50' },
  user: { text: 'text-sky-700 dark:text-sky-300', soft: 'bg-sky-50 dark:bg-sky-950/40', border: 'border-sky-400/70', dot: 'bg-sky-500', node: 'border-sky-200/70 bg-sky-50/60 dark:border-sky-900/60 dark:bg-sky-950/30', nodeOn: 'border-sky-500 bg-sky-100/80 dark:border-sky-400 dark:bg-sky-900/50' },
  team: { text: 'text-violet-700 dark:text-violet-300', soft: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-400/70', dot: 'bg-violet-500', node: 'border-violet-200/70 bg-violet-50/60 dark:border-violet-900/60 dark:bg-violet-950/30', nodeOn: 'border-violet-500 bg-violet-100/80 dark:border-violet-400 dark:bg-violet-900/50' },
  misc: { text: 'text-stone-600 dark:text-stone-300', soft: 'bg-stone-50 dark:bg-stone-900/40', border: 'border-stone-300/70 dark:border-stone-600/70', dot: 'bg-stone-400', node: 'border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-900/40', nodeOn: 'border-stone-700 bg-stone-100 dark:border-stone-300 dark:bg-stone-800' },
};

const CARD = 'rounded-xl border bg-white/70 dark:bg-white/[0.04] shadow-sm border-stone-200/80 dark:border-stone-700/60';

const SLOT_STYLE = {
  problem: { label: '문제', cls: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
  cause: { label: '원인', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  solution: { label: '해결', cls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' },
  decision: { label: '판단', cls: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' },
  result: { label: '결과', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
} as const;
type SlotKey = keyof typeof SLOT_STYLE;
const SLOT_ORDER: SlotKey[] = ['problem', 'cause', 'solution', 'decision', 'result'];

const Lab = ({ k }: { k: SlotKey }) => (
  <span className={cn('inline-block rounded-md px-1.5 py-0.5 text-[11px] font-semibold leading-none', SLOT_STYLE[k].cls)}>
    {SLOT_STYLE[k].label}
  </span>
);

// 목록 항목의 [text](url) 링크만 렌더링한다
const renderInline = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <React.Fragment key={i}>{p}</React.Fragment>;
    return (
      <a key={i} href={m[2]} target="_blank" rel="noreferrer" className="underline decoration-stone-400 underline-offset-2">
        {m[1]}
      </a>
    );
  });
};

const EXPAND_EVENT = 'pf-expand-all';
const useExpandAll = (set: (v: boolean) => void) => {
  React.useEffect(() => {
    const on = (e: Event) => set(Boolean((e as CustomEvent).detail));
    window.addEventListener(EXPAND_EVENT, on);
    return () => window.removeEventListener(EXPAND_EVENT, on);
  }, [set]);
};

/* ------------------------------------ 대표 카드 (A 컨셉) ------------------------------------ */

const CopyLink = ({ id }: { id: string }) => {
  const [done, setDone] = React.useState(false);
  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const url = `${location.origin}${location.pathname}#case-${id}`;
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={copy}
      title="이 사례 링크 복사"
      className="rounded-md p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
    >
      {done ? <IconCheck size={14} /> : <IconLink size={14} />}
    </button>
  );
};

export const PfFeaturedCard = ({ c, layer, forceOpen }: { c: PfCaseData; layer: Layer; forceOpen?: boolean }) => {
  const s = LAYER_STYLE[layer];
  const [open, setOpen] = React.useState(false);
  useExpandAll(setOpen);
  React.useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);
  const flow: { k: SlotKey; text: string }[] = [];
  if (c.problem) flow.push({ k: 'problem', text: c.problem });
  if (c.decision) flow.push({ k: 'decision', text: c.decision });
  else if (c.solution) flow.push({ k: 'solution', text: c.solution });
  if (c.result) flow.push({ k: 'result', text: c.result });
  else if (c.solution && !flow.some(f => f.k === 'solution')) flow.push({ k: 'solution', text: c.solution });
  const slots = SLOT_ORDER.filter(k => c[k]);
  return (
    <div id={`case-${c.id}`} className={cn(CARD, 'pf-featured scroll-mt-20 border-l-4 transition', s.border, open && 'shadow-md')}>
      <div className="px-4 pt-3">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-[15px] font-semibold">{c.title}</span>
              {c.when && <span className="text-xs tabular-nums text-stone-500 dark:text-stone-400">{c.when}</span>}
              {c.note && (
                <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600 dark:bg-stone-800 dark:text-stone-300">{c.note}</span>
              )}
            </div>
            {c.summary && <div className="mt-0.5 text-[13.5px] leading-relaxed text-stone-600 dark:text-stone-300">{c.summary}</div>}
            {c.contribution && (
              <div className="mt-1 text-[12px] text-stone-500 dark:text-stone-400">
                <span className="mr-1 rounded-md bg-stone-100 px-1.5 py-0.5 text-[10.5px] font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300">기여</span>
                {c.contribution}
              </div>
            )}
          </div>
          <CopyLink id={c.id} />
        </div>
        {c.metric && (
          <div className="mt-2 text-[22px] font-black leading-none tracking-tight tabular-nums">
            {c.metric}
            {c.metricLabel && <span className="ml-1.5 text-xs font-medium text-stone-500 dark:text-stone-400">{c.metricLabel}</span>}
          </div>
        )}
        {flow.length > 0 && (
          <div
            className="mt-3 grid gap-2 text-[12.5px] leading-relaxed"
            style={{ gridTemplateColumns: `repeat(${flow.length}, minmax(0, 1fr))` }}
          >
            {flow.map((f, i) => (
              <div key={f.k} className="relative">
                <Lab k={f.k} />
                <p className="mt-1 text-stone-700 dark:text-stone-200">{f.text}</p>
                {i < flow.length - 1 && (
                  <IconArrowRight size={14} className="absolute -right-2.5 top-0.5 hidden text-stone-400 sm:block" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="mt-2 flex w-full items-center justify-center gap-1 border-t border-stone-200/70 py-1.5 text-[12px] text-stone-500 transition hover:text-stone-800 dark:border-stone-700/60 dark:text-stone-400 dark:hover:text-stone-100"
      >
        {open ? '접기' : '상세 보기'}
        <IconChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="pf-case-body overflow-hidden"
        aria-hidden={!open}
      >
        <div className="px-4 pb-3 pt-1 text-[13.5px] leading-relaxed text-stone-700 dark:text-stone-200">
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
            {slots.map(k => (
              <React.Fragment key={k}>
                <dt className="pt-0.5"><Lab k={k} /></dt>
                <dd className="m-0">{c[k]}</dd>
              </React.Fragment>
            ))}
          </dl>
          {c.lesson && (
            <blockquote className={cn('mt-3 border-l-2 pl-3 text-[13.5px] italic text-stone-600 dark:text-stone-300', s.border)}>
              <span className={cn('mr-1.5 not-italic text-[11px] font-semibold', s.text)}>레슨런</span>
              {c.lesson}
            </blockquote>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------ 한 줄 사례 ------------------------------------ */

const BriefRow = ({ c }: { c: PfCaseData }) => (
  <li id={`case-${c.id}`} className="scroll-mt-20 flex flex-wrap items-baseline gap-x-2 py-1 text-[13px]">
    <span className="font-semibold">{c.title}</span>
    {c.when && <span className="text-[11px] tabular-nums text-stone-500 dark:text-stone-400">{c.when}</span>}
    {c.summary && <span className="text-stone-600 dark:text-stone-300">{c.summary}</span>}
  </li>
);

/* ------------------------------------ 노드 다이어그램 ------------------------------------ */

const NodeButton = ({ node, layer, active, count, onClick, offset }: { node: Node; layer: Layer; active: boolean; count: number; onClick: () => void; offset?: number }) => {
  const s = LAYER_STYLE[layer];
  const Icon = node.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={offset ? { marginLeft: offset } : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition',
        active ? cn(s.nodeOn, 'shadow-sm') : cn(s.node, 'hover:shadow-sm')
      )}
    >
      <Icon size={18} className={cn('shrink-0', s.text)} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2 text-[13px] font-semibold">
          {node.label}
          <span className={cn('text-[11px] font-bold tabular-nums', s.text)}>{count}</span>
        </span>
        <span className="block text-[11.5px] text-stone-500 dark:text-stone-400">{node.desc}</span>
      </span>
    </button>
  );
};

const Diagram = ({ group, layer, active, counts, onSelect }: { group: Group; layer: Layer; active: string; counts: Record<string, number>; onSelect: (id: string) => void }) => {
  const nodes = group.nodes;
  if (group.shape === 'stack') {
    return (
      <div className="flex flex-col gap-1.5">
        {nodes.map((n, i) => (
          <NodeButton key={n.id} node={n} layer={layer} active={active === n.id} count={counts[n.id] ?? 0} onClick={() => onSelect(n.id)} offset={i * 12} />
        ))}
      </div>
    );
  }
  if (group.shape === 'channels') {
    return (
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
        <div className="flex flex-col gap-1.5">
          {nodes.map(n => (
            <NodeButton key={n.id} node={n} layer={layer} active={active === n.id} count={counts[n.id] ?? 0} onClick={() => onSelect(n.id)} />
          ))}
        </div>
        <IconArrowRight size={20} className="text-stone-400" />
        <div className="flex h-20 w-16 flex-col items-center justify-center rounded-2xl border-2 border-stone-800 bg-white text-center dark:border-stone-200 dark:bg-stone-900">
          <IconDeviceMobile size={20} />
          <div className="mt-1 text-[11px] font-semibold">앱 전환</div>
        </div>
      </div>
    );
  }
  if (group.shape === 'steps') {
    return (
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-stretch">
        {nodes.map((n, i) => (
          <React.Fragment key={n.id}>
            <div className="flex-1">
              <NodeButton node={n} layer={layer} active={active === n.id} count={counts[n.id] ?? 0} onClick={() => onSelect(n.id)} />
            </div>
            {i < nodes.length - 1 && (
              <div className="hidden items-center text-stone-400 sm:flex"><IconArrowRight size={16} /></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-1.5 sm:grid-cols-2">
      {nodes.map(n => (
        <NodeButton key={n.id} node={n} layer={layer} active={active === n.id} count={counts[n.id] ?? 0} onClick={() => onSelect(n.id)} />
      ))}
    </div>
  );
};

/* ------------------------------------ 층 블록 ------------------------------------ */

const casesOf = (nodeId: string) => CASES.filter(c => c.node === nodeId && c.tier !== 'drop');

const GroupBlock = ({ group, layer, target }: { group: Group; layer: Layer; target: string | null }) => {
  const s = LAYER_STYLE[layer];
  const firstWithCases = group.nodes.find(n => casesOf(n.id).length > 0)?.id ?? group.nodes[0].id;
  const [active, setActive] = React.useState(firstWithCases);
  const counts = Object.fromEntries(group.nodes.map(n => [n.id, casesOf(n.id).length]));
  // 딥링크로 들어온 사례가 이 그룹에 있으면 그 노드를 연다
  React.useEffect(() => {
    if (!target) return;
    const hit = group.nodes.find(n => casesOf(n.id).some(c => c.id === target));
    if (hit) setActive(hit.id);
  }, [target, group.nodes]);
  return (
    <div className="not-prose mt-8">
      <h3 className="m-0 text-[15px] font-bold">{group.title}</h3>
      {group.caption && <p className="mt-1 text-[13px] leading-relaxed text-stone-600 dark:text-stone-300">{group.caption}</p>}
      <div className="mt-3">
        <Diagram group={group} layer={layer} active={active} counts={counts} onSelect={setActive} />
      </div>
      {group.nodes.map(n => {
        const list = casesOf(n.id);
        if (list.length === 0) return null;
        const featured = list.filter(c => c.tier === 'featured');
        const brief = list.filter(c => c.tier === 'brief');
        return (
          <div key={n.id} hidden={active !== n.id} className="pf-node-panel mt-3" data-node={n.label}>
            <div className={cn('mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider', s.text)}>
              <span className={cn('h-2 w-2 rounded-full', s.dot)} />
              {n.label}
              <span className="font-normal normal-case tracking-normal text-stone-500 dark:text-stone-400">· {n.desc}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {featured.map(c => (
                <PfFeaturedCard key={c.id} c={c} layer={layer} forceOpen={target === c.id} />
              ))}
            </div>
            {brief.length > 0 && (
              <ul className="m-0 mt-2 list-none divide-y divide-stone-200/70 border-t border-stone-200/70 p-0 dark:divide-stone-700/60 dark:border-stone-700/60">
                {brief.map(c => (
                  <BriefRow key={c.id} c={c} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

const useHashTarget = () => {
  const [target, setTarget] = React.useState<string | null>(null);
  React.useEffect(() => {
    const read = () => {
      const m = location.hash.match(/^#case-(.+)$/);
      setTarget(m ? m[1] : null);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);
  React.useEffect(() => {
    if (!target) return;
    const t = setTimeout(() => document.getElementById(`case-${target}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 120);
    return () => clearTimeout(t);
  }, [target]);
  return target;
};

export const PfLayerBlock = ({ layer }: { layer: Layer }) => {
  const def = LAYERS.find(l => l.layer === layer);
  const target = useHashTarget();
  if (!def) return null;
  const s = LAYER_STYLE[layer];
  return (
    <section id={`layer-${layer}`} className="scroll-mt-16">
      <div className={cn('not-prose mt-12 rounded-2xl border p-5', s.border, s.soft)}>
        <div className={cn('text-xs font-semibold uppercase tracking-wider', s.text)}>{def.label}</div>
        <h2 className="mt-1 text-xl font-bold leading-snug">{def.title}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-stone-600 dark:text-stone-300">
          {def.lede.map(l => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      {def.groups.map(g => (
        <GroupBlock key={g.id} group={g} layer={layer} target={target} />
      ))}
    </section>
  );
};

/* ------------------------------------ 기타 사례 묶음 (육아휴직·굿닥·기록) ------------------------------------ */

export const PfCaseGroup = ({ node }: { node: string }) => {
  const target = useHashTarget();
  const list = casesOf(node);
  const featured = list.filter(c => c.tier === 'featured');
  const brief = list.filter(c => c.tier === 'brief');
  const lists = list.filter(c => c.tier === 'list');
  return (
    <div className="not-prose mt-3 flex flex-col gap-2.5">
      {featured.map(c => (
        <PfFeaturedCard key={c.id} c={c} layer="misc" forceOpen={target === c.id} />
      ))}
      {brief.length > 0 && (
        <ul className="m-0 list-none divide-y divide-stone-200/70 border-t border-stone-200/70 p-0 dark:divide-stone-700/60 dark:border-stone-700/60">
          {brief.map(c => (
            <BriefRow key={c.id} c={c} />
          ))}
        </ul>
      )}
      {lists.map(c => (
        <div key={c.id} id={`case-${c.id}`} className={cn(CARD, 'scroll-mt-20 px-4 py-3')}>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-semibold">{c.title}</span>
            {c.summary && <span className="text-[13px] text-stone-500 dark:text-stone-400">{c.summary}</span>}
          </div>
          <ul className="m-0 mt-1.5 list-disc space-y-1 pl-5 text-[13.5px] leading-relaxed text-stone-700 dark:text-stone-200">
            {c.items?.map(it => (
              <li key={it}>{renderInline(it)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const PfCaseIndex = () => {
  // 이력서 딥링크용 목록. 대표 사례만 id와 함께 보여 준다
  const featured = CASES.filter(c => c.tier === 'featured');
  return (
    <ul className="not-prose m-0 list-none columns-1 p-0 text-[12.5px] sm:columns-2">
      {featured.map(c => (
        <li key={c.id} className="py-0.5">
          <a href={`#case-${c.id}`} className="text-stone-600 no-underline hover:underline dark:text-stone-300">{c.title}</a>
          {c.when && <span className="ml-1 text-[11px] tabular-nums text-stone-400">{c.when}</span>}
        </li>
      ))}
    </ul>
  );
};

/* ------------------------------------ JD 세 갈래 바로가기 ------------------------------------ */

const KIND_DEF: { kind: Kind; title: string; desc: string }[] = [
  { kind: 'user-problem', title: '사용자 문제를 판단하고 개선한 경험', desc: '유저로서 써 보고, 원인까지 내려가고, 결과를 숫자로' },
  { kind: 'team-efficiency', title: '팀의 비효율을 판단하고 개선한 경험', desc: '개인이 떠안던 비용을 절차와 도구로' },
  { kind: 'tech-review', title: '기술·아키텍처를 비판적으로 검토한 뒤 도입한 사례', desc: '기본값을 그대로 쓰지 않고 데이터 성격과 제약에서 고른 것' },
];

export const PfJdIndex = () => (
  <div className="not-prose my-8 grid gap-3 sm:grid-cols-3">
    {KIND_DEF.map(k => {
      const list = CASES.filter(c => c.kinds?.includes(k.kind) && c.tier !== 'drop');
      return (
        <div key={k.kind} className={cn(CARD, 'p-4')}>
          <div className="text-[13px] font-semibold leading-snug">{k.title}</div>
          <div className="mt-0.5 text-[11.5px] text-stone-500 dark:text-stone-400">{k.desc}</div>
          <ul className="m-0 mt-2 list-none p-0 text-[12.5px]">
            {list.map(c => (
              <li key={c.id} className="py-0.5">
                <a href={`#case-${c.id}`} className="text-stone-700 no-underline hover:underline dark:text-stone-200">
                  {c.title}
                </a>
                {c.tier === 'brief' && <span className="ml-1 text-[10.5px] text-stone-400">한 줄</span>}
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
);
