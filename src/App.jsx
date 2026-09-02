import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PARTS } from './data/tests.js';
import { getResults, updateResult, resetResults } from './api/client.js';
import TopBar from './components/TopBar.jsx';
import TOC from './components/TOC.jsx';
import PartPanel from './components/PartPanel.jsx';

const POLL_MS = 2000;
const BOARD_ID = new URLSearchParams(location.search).get('board') || 'default';

const ALL_IDS_BY_PART = PARTS.reduce((acc, p) => {
  acc[p.id] = p.sections.flatMap(s => s.tests.map(t => t.id));
  return acc;
}, {});

const ALL_IDS = Object.values(ALL_IDS_BY_PART).flat();

export default function App() {
  const [results, setResults] = useState({});
  const noteTimers = useRef({});

  const refresh = useCallback(async () => {
    try {
      const data = await getResults(BOARD_ID);
      setResults(data.results || {});
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  const handleMark = useCallback(async (testId, status) => {
    const current = results[testId]?.status || null;
    const next = current === status ? null : status;
    setResults(prev => ({ ...prev, [testId]: { ...(prev[testId] || {}), status: next } }));
    try {
      await updateResult(BOARD_ID, testId, { status: next });
    } catch (e) {
      console.error(e);
      await refresh();
      alert('Could not save the result. Please try again.');
    }
  }, [results, refresh]);

  const handleNoteChange = useCallback((testId, value) => {
    setResults(prev => ({ ...prev, [testId]: { ...(prev[testId] || {}), notes: value } }));
    clearTimeout(noteTimers.current[testId]);
    noteTimers.current[testId] = setTimeout(async () => {
      try {
        await updateResult(BOARD_ID, testId, { notes: value });
      } catch (e) {
        console.error(e);
        alert('Could not save the note.');
      }
    }, 400);
  }, []);

  const handleResetPart = useCallback(async partId => {
    if (!confirm('Reset all results for this part?')) return;
    try {
      await resetResults(BOARD_ID, ALL_IDS_BY_PART[partId]);
      await refresh();
    } catch (e) {
      alert('Could not reset this part.');
    }
  }, [refresh]);

  const handleResetAll = useCallback(async () => {
    if (!confirm('Reset ALL results across every part? This cannot be undone.')) return;
    try {
      await resetResults(BOARD_ID);
      await refresh();
    } catch (e) {
      alert('Could not reset the suite.');
    }
  }, [refresh]);

  const handleToggleTheme = useCallback(() => {
    const r = document.documentElement;
    r.setAttribute('data-theme', r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }, []);

  const totals = useMemo(() => {
    let pass = 0, fail = 0, marked = 0;
    const perPart = {};
    for (const part of PARTS) {
      let p = 0, f = 0;
      const ids = ALL_IDS_BY_PART[part.id];
      for (const id of ids) {
        const s = results[id]?.status;
        if (s === 'pass') { p++; pass++; marked++; }
        else if (s === 'fail') { f++; fail++; marked++; }
        else if (s === 'pend' || s === 'skip') marked++;
      }
      perPart[part.id] = `${p} pass · ${f} fail · ${ids.length - p - f} open`;
    }
    const total = ALL_IDS.length;
    return { pass, fail, total, open: total - marked, perPart };
  }, [results]);

  return (
    <>
      <TopBar
        pass={totals.pass}
        fail={totals.fail}
        open={totals.open}
        total={totals.total}
        onResetAll={handleResetAll}
        onToggleTheme={handleToggleTheme}
      />
      <TOC parts={PARTS} />
      <main className="main">
        {PARTS.map((part, i) => (
          <PartPanel
            key={part.id}
            part={part}
            index={i}
            results={results}
            tally={totals.perPart[part.id]}
            onMark={handleMark}
            onNoteChange={handleNoteChange}
            onReset={handleResetPart}
          />
        ))}
      </main>
    </>
  );
}
