export default function TopBar({ pass, fail, open, total, onResetAll, onToggleTheme }) {
  const marked = total - open;
  const bp = total ? (pass / total) * 100 : 0;
  const bf = total ? (fail / total) * 100 : 0;
  return (
    <div className="topbar">
      <div className="tb-brand">PropPlus QA</div>
      <div className="tb-divider" />
      <div className="tb-stats">
        <div className="tbstat"><span className="tbstat-n p">{pass}</span><span className="tbstat-l">&nbsp;Pass</span></div>
        <div className="tbstat"><span className="tbstat-n f">{fail}</span><span className="tbstat-l">&nbsp;Fail</span></div>
        <div className="tbstat"><span className="tbstat-n k">{open}</span><span className="tbstat-l">&nbsp;Open</span></div>
      </div>
      <div className="tb-bar-wrap">
        <div className="tb-bar">
          <div className="tb-bar-p" style={{ width: `${bp}%` }} />
          <div className="tb-bar-f" style={{ width: `${bf}%` }} />
        </div>
        <div className="tb-lbl">{marked} of {total} marked</div>
      </div>
      <div className="tb-btns">
        <button className="tb-btn danger" onClick={onResetAll}>Reset All</button>
        <button className="tb-btn" onClick={onToggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
}
