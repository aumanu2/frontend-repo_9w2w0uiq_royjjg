import React, { useEffect, useRef } from 'react';

// Lightweight canvas line chart to avoid extra deps
export default function Chart({ data = [], height = 280 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
      ctx.stroke();
    }

    if (data.length < 2) return;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const pad = 8;
    const scaleX = (w - pad * 2) / (data.length - 1);
    const scaleY = (h - pad * 2) / (max - min || 1);

    // Line gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(59,130,246,0.4)');
    grad.addColorStop(1, 'rgba(59,130,246,0)');

    // Area fill
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = pad + i * scaleX;
      const y = h - pad - (v - min) * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(w - pad, h - pad);
    ctx.lineTo(pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = pad + i * scaleX;
      const y = h - pad - (v - min) * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [data]);

  return (
    <div className="w-full bg-white border rounded-lg p-3">
      <canvas ref={canvasRef} width={800} height={height} className="w-full h-auto" />
    </div>
  );
}
