export default function TOC({ parts }) {
  const totalTests = parts.reduce((sum, p) => sum + p.count, 0);
  return (
    <div className="toc">
      <div className="toc-hd">PropPlus QA Test Suite</div>
      <div className="toc-sub">{totalTests} tests · {parts.length} parts · mobile app, backend API, web admin</div>
      <div className="toc-creds">
        OTP <code>000000</code> for all accounts &nbsp;·&nbsp;
        Super Admin <code>+919000000009</code> &nbsp;·&nbsp;
        Property Admin <code>+919000000001</code> &nbsp;·&nbsp;
        Tenant <code>+919000000002</code> (Ravi Kumar) &nbsp;·&nbsp;
        Guard <code>+919000000007</code>
      </div>
      <div className="toc-grid">
        {parts.map((p, i) => (
          <a key={p.id} className="toc-item" href={`#sep-${p.id}`}>
            <div className="toc-num">{i + 1}</div>
            <span className="toc-label">{p.title}</span>
            <span className="toc-count">{p.count} tests</span>
          </a>
        ))}
      </div>
    </div>
  );
}
