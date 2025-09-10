"use client";

export default function EarningsChart({ selectedPeriod, data }) {
  const buildSeries = () => {
    if (selectedPeriod === 'today' && data.breakdown) {
      return data.breakdown.map((r) => r.fare);
    }
    if (selectedPeriod === 'week') {
      return [1200, 980, 1430, 1100, 1750, 900, 1290];
    }
    return [7200, 8100, 6900, 9400, 8300, 7600, 8800, 9100, 8500, 9200, 7800, 9600];
  };
  const buildSeries2 = () => {
    if (selectedPeriod === 'today' && data.breakdown) {
      return data.breakdown.map((r) => Math.max(50, Math.round(r.fare * 0.7)));
    }
    if (selectedPeriod === 'week') {
      return [900, 760, 1180, 920, 1400, 780, 1120];
    }
    return [5200, 6400, 6100, 7600, 6900, 6200, 7200, 7500, 7000, 7600, 6900, 8000];
  };

  const buildLabels = () => {
    if (selectedPeriod === 'today' && data.breakdown) {
      return data.breakdown.map((r) => r.time);
    }
    if (selectedPeriod === 'week') {
      return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    }
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  };

  const series = buildSeries();
  const series2 = buildSeries2();
  const labels = buildLabels();
  const maxY = Math.max(1, ...series, ...series2);

  const chartW = 720;
  const chartH = 180;
  const usableH = 160;
  const xStep = series.length > 1 ? chartW / (series.length - 1) : chartW;

  const points = series.map((v, idx) => {
    const x = idx * xStep;
    const h = Math.max(2, (v / maxY) * usableH);
    const y = chartH - h;
    return { x, y, v, label: labels[idx] };
  });
  const points2 = series2.map((v, idx) => {
    const x = idx * xStep;
    const h = Math.max(2, (v / maxY) * usableH);
    const y = chartH - h;
    return { x, y, v, label: labels[idx] };
  });

  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const polyPoints2 = points2.map((p) => `${p.x},${p.y}`).join(' ');
  const totalW = 40 + chartW + 20;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Earnings Trend</h3>
      <div className="rounded-lg border border-gray-200 relative">
        <div id="earnings-tooltip" className="hidden absolute bg-black text-white text-xs px-2 py-1 rounded pointer-events-none" style={{transform: 'translate(-50%, -120%)'}} />
        <svg viewBox={`0 0 ${totalW} 220`} className="w-full h-80">
          <rect x="0" y="0" width={totalW} height="220" fill="#ffffff" />
          <g transform="translate(40,10)">
            {[0,1,2,3,4,5].map((i)=>{
              const y = 180 - i*36;
              return <line key={i} x1={0} y1={y} x2={chartW} y2={y} stroke="#f1f5f9" />
            })}
            <line x1="0" y1="0" x2="0" y2="180" stroke="#e5e7eb" />
            {[0,1,2,3,4,5].map((i)=>{
              const y = 180 - i*36;
              const val = Math.round((maxY/5)*i);
              return <text key={`yl-${i}`} x={-8} y={y+4} textAnchor="end" fontSize="10" fill="#6b7280">₹{val}</text>
            })}
            <polyline points={polyPoints} fill="none" stroke="#22c55e" strokeWidth="2.5" />
            {points.map((p, idx)=> (
              <g key={idx}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  onMouseEnter={(e)=>{
                    const tip = document.getElementById('earnings-tooltip');
                    if (!tip) return;
                    tip.textContent = `₹${p.v} • ${p.label}`;
                    tip.style.left = `${e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left}px`;
                    tip.style.top = `${e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top}px`;
                    tip.classList.remove('hidden');
                  }}
                  onMouseMove={(e)=>{
                    const tip = document.getElementById('earnings-tooltip');
                    if (!tip) return;
                    tip.style.left = `${e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left}px`;
                    tip.style.top = `${e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top}px`;
                  }}
                  onMouseLeave={()=>{
                    const tip = document.getElementById('earnings-tooltip');
                    if (tip) tip.classList.add('hidden');
                  }}
                />
              </g>
            ))}
            <polyline points={polyPoints2} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            {points2.map((p, idx)=> (
              <g key={`w-${idx}`}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  onMouseEnter={(e)=>{
                    const tip = document.getElementById('earnings-tooltip');
                    if (!tip) return;
                    tip.textContent = `Withdrawals ₹${p.v} • ${p.label}`;
                    tip.style.left = `${e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left}px`;
                    tip.style.top = `${e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top}px`;
                    tip.classList.remove('hidden');
                  }}
                  onMouseMove={(e)=>{
                    const tip = document.getElementById('earnings-tooltip');
                    if (!tip) return;
                    tip.style.left = `${e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left}px`;
                    tip.style.top = `${e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top}px`;
                  }}
                  onMouseLeave={()=>{
                    const tip = document.getElementById('earnings-tooltip');
                    if (tip) tip.classList.add('hidden');
                  }}
                />
              </g>
            ))}
            <line x1="0" y1="180" x2={chartW} y2="180" stroke="#e5e7eb" />
            {labels.map((label, idx)=>{
              const x = idx*(chartW/series.length - 1);
              return <text key={idx} x={x} y={195} textAnchor="middle" fontSize="10" fill="#6b7280">{label}</text>
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}


