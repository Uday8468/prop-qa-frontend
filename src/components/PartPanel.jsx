import TestCard from './TestCard.jsx';

export default function PartPanel({ part, index, results, tally, onMark, onNoteChange, onReset }) {
  return (
    <div className="part-panel" id={part.id}>
      <div className="part-sep" id={`sep-${part.id}`}>
        <div className="sep-inner">
          <div className="sep-left">
            <div className="sep-eyebrow">{part.eyebrow || `Part ${index + 1} of 8`}</div>
            <h2 className="sep-title">{part.title}</h2>
            <p className="sep-desc">{part.description}</p>
          </div>
          <div className="sep-right">
            <div className="sep-count">{part.count}</div>
            <div className="sep-count-l">tests</div>
            <div className="sep-tally">{tally}</div>
            <button className="sep-reset" onClick={() => onReset(part.id)}>Reset</button>
          </div>
        </div>
      </div>
      {part.sections.map((section, si) => (
        <div className="sec" key={si}>
          <div className="sec-hd">{section.header}</div>
          {section.tests.map(test => (
            <TestCard
              key={test.id}
              test={test}
              entry={results[test.id]}
              onMark={onMark}
              onNoteChange={onNoteChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
