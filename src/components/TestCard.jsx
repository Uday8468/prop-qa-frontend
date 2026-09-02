import { useState, useRef } from 'react';

const STATUS_LABEL = { pass: 'Pass', fail: 'Fail', pend: 'Pending', skip: 'N/A' };

function Html({ html, as: Tag = 'span' }) {
  return <Tag dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function TestCard({ test, entry, onMark, onNoteChange }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(entry?.notes || '');
  const noteInitFromEntry = useRef(entry?.notes || '');
  const inputRef = useRef(null);

  if ((entry?.notes || '') !== noteInitFromEntry.current && document.activeElement !== inputRef.current) {
    noteInitFromEntry.current = entry?.notes || '';
    if (note !== noteInitFromEntry.current) setNote(noteInitFromEntry.current);
  }

  const status = entry?.status || null;
  const cardClass = `card s-${status || 'pending'}${open ? ' open' : ''}`;
  const qClass = v => `qbtn${status === v ? ` a-${v}` : ''}`;
  const rClass = v => `rbtn${status === v ? ` a-${v}` : ''}`;

  const handleNote = e => {
    setNote(e.target.value);
    onNoteChange(test.id, e.target.value);
  };

  return (
    <div className={cardClass} id={`card-${test.id}`}>
      <div className="card-hd" onClick={() => setOpen(o => !o)}>
        <span className="tid">{test.tid}</span>
        <div className="card-meta">
          <div className="card-name">{test.name}</div>
          <div className="card-sub">{test.sub}</div>
        </div>
        <div className="qmark" onClick={e => e.stopPropagation()}>
          <button className={qClass('pass')} onClick={() => onMark(test.id, 'pass')}>Pass</button>
          <button className={qClass('fail')} onClick={() => onMark(test.id, 'fail')}>Fail</button>
          <button className={qClass('pend')} onClick={() => onMark(test.id, 'pend')}>Pend</button>
          <button className={qClass('skip')} onClick={() => onMark(test.id, 'skip')}>N/A</button>
        </div>
        <span className="sstatus">{STATUS_LABEL[status] || 'Pending'}</span>
        <svg className="chev" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
      <div className="card-body">
        {test.preconditions?.length > 0 && (
          <div className="bs">
            <div className="bs-lbl">Preconditions</div>
            <div className="pre-list">
              {test.preconditions.map((p, i) => <Html key={i} as="div" html={p} />)}
            </div>
          </div>
        )}
        {test.steps?.length > 0 && (
          <div className="bs">
            <div className="bs-lbl">Steps</div>
            <div className="steps">
              {test.steps.map((s, i) => (
                <div key={i} className="step">
                  <div className="sn">{i + 1}</div>
                  <Html as="div" html={s} />
                </div>
              ))}
            </div>
          </div>
        )}
        {test.passCriteria?.length > 0 && (
          <div className="bs">
            <div className="bs-lbl">Pass Criteria — ALL must be true</div>
            <div className="expected">
              <ul>{test.passCriteria.map((c, i) => <Html key={i} as="li" html={c} />)}</ul>
            </div>
          </div>
        )}
        {test.failCriteria?.length > 0 && (
          <div className="bs">
            <div className="bs-lbl">Fail Criteria — ANY means Fail</div>
            <div className="fail-crit">
              <ul>{test.failCriteria.map((c, i) => <Html key={i} as="li" html={c} />)}</ul>
            </div>
          </div>
        )}
        {test.edges?.length > 0 && (
          <div className="bs">
            <div className="bs-lbl">Edge Cases</div>
            <div className="edges">
              {test.edges.map((e, i) => <Html key={i} as="div" html={e} />)}
            </div>
          </div>
        )}
        <div className="result-row">
          <span className="rl">Result</span>
          <button className={rClass('pass')} onClick={() => onMark(test.id, 'pass')}>Pass</button>
          <button className={rClass('fail')} onClick={() => onMark(test.id, 'fail')}>Fail</button>
          <button className={rClass('pend')} onClick={() => onMark(test.id, 'pend')}>Pending</button>
          <button className={rClass('skip')} onClick={() => onMark(test.id, 'skip')}>N/A</button>
          <input
            ref={inputRef}
            className="rnotes"
            value={note}
            onChange={handleNote}
            placeholder="Notes / bug description…"
          />
        </div>
      </div>
    </div>
  );
}
