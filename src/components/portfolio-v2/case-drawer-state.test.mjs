import assert from 'node:assert/strict';
import test from 'node:test';
import {
  activeCase,
  caseIds,
  caseUrl,
  journeyNavigation,
  journeyStages,
  switchedDrawerState,
} from './case-drawer-state.ts';

const base = 'https://example.com/private/portfolio-2026-v2/?source=resume#perspective';

test('each known case has a reloadable deep link', () => {
  for (const id of caseIds) {
    const path = caseUrl(base, id, true);
    const url = new URL(path, base);
    assert.equal(activeCase(url.href), id);
    assert.equal(url.hash, `#${id}`);
    assert.equal(url.searchParams.get('source'), 'resume');
    assert.equal(url.pathname, '/private/portfolio-2026-v2/');
  }
});

test('opening preserves the underlying page anchor', () => {
  assert.equal(
    caseUrl(base, 'insurance'),
    '/private/portfolio-2026-v2/?source=resume&detail=insurance#perspective'
  );
});

test('closing only removes the detail query', () => {
  assert.equal(
    caseUrl(new URL(caseUrl(base, 'gene'), base).href, null),
    '/private/portfolio-2026-v2/?source=resume#perspective'
  );
});

test('unrecognized or missing detail does not open a drawer', () => {
  assert.equal(activeCase(base), null);
  assert.equal(activeCase(`${base.split('#')[0]}&detail=unknown`), null);
  assert.equal(activeCase(`${base.split('#')[0]}&detail=%3Cscript%3E`), null);
});

test('switching cases replaces rather than appends the selected case', () => {
  const opened = new URL(caseUrl(base, 'gene'), base).href;
  const switched = new URL(caseUrl(opened, 'review'), base);
  assert.deepEqual(switched.searchParams.getAll('detail'), ['review']);
});

test('AARRR navigation follows stage order in both directions and stops at boundaries', () => {
  assert.deepEqual(
    journeyStages.map(stage => stage.id),
    ['acquisition', 'activation', 'retention', 'referral', 'revenue']
  );
  journeyStages.forEach((stage, index) => {
    const navigation = journeyNavigation(stage.id);
    assert.equal(navigation.position, index + 1);
    assert.equal(navigation.total, 5);
    assert.equal(navigation.previous?.id ?? null, journeyStages[index - 1]?.id ?? null);
    assert.equal(navigation.next?.id ?? null, journeyStages[index + 1]?.id ?? null);
  });
});

test('project drawers have no AARRR navigation', () => {
  for (const id of ['gene', 'insurance', 'family-history', 'review', 'team'])
    assert.equal(journeyNavigation(id), null);
});

test('stage switching retains the owned close target and unrelated history data', () => {
  const original = { portfolioCaseDrawer: 'acquisition', nextRouterState: 'preserved' };
  const changed = switchedDrawerState(original, 'acquisition', 'activation');
  assert.deepEqual(changed, { portfolioCaseDrawer: 'activation', nextRouterState: 'preserved' });
  assert.equal(original.portfolioCaseDrawer, 'acquisition');
});

test('direct detail links never acquire a history-back marker when switching stages', () => {
  assert.equal(switchedDrawerState(null, 'acquisition', 'activation'), null);
  const state = { nextRouterState: 'preserved' };
  assert.equal(switchedDrawerState(state, 'revenue', 'referral'), state);
});
