export const caseIds = [
  'gene',
  'insurance',
  'family-history',
  'review',
  'team',
  'acquisition',
  'activation',
  'retention',
  'referral',
  'revenue',
] as const;
export type CaseId = (typeof caseIds)[number];

export const journeyStages = [
  { id: 'acquisition', label: 'Acquisition' },
  { id: 'activation', label: 'Activation' },
  { id: 'retention', label: 'Retention' },
  { id: 'referral', label: 'Referral' },
  { id: 'revenue', label: 'Revenue' },
] as const;

export function journeyNavigation(id: CaseId) {
  const index = journeyStages.findIndex(stage => stage.id === id);
  if (index < 0) return null;
  return {
    current: journeyStages[index],
    position: index + 1,
    total: journeyStages.length,
    previous: journeyStages[index - 1] ?? null,
    next: journeyStages[index + 1] ?? null,
  };
}

// Keep the original drawer history entry: Back closes the entire stage sequence.
// A directly loaded detail URL has no entry owned by this component.
export function switchedDrawerState(
  state: Record<string, unknown> | null,
  current: CaseId,
  target: CaseId
) {
  return state?.portfolioCaseDrawer === current ? { ...state, portfolioCaseDrawer: target } : state;
}

export function activeCase(href: string): CaseId | null {
  const value = new URL(href).searchParams.get('detail');
  return caseIds.find(id => id === value) ?? null;
}

export function caseUrl(href: string, id: CaseId | null, share = false): string {
  const url = new URL(href);
  if (id) url.searchParams.set('detail', id);
  else url.searchParams.delete('detail');
  if (share && id) url.hash = id;
  return `${url.pathname}${url.search}${url.hash}`;
}
