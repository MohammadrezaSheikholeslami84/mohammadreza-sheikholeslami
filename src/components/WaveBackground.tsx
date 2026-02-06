import { useEffect, useRef } from 'react';

const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWave = (
      yBase: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      phase: number
    ) => {
      if (!ctx || !canvas) return;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 2) {
        const y =
          yBase +
          Math.sin(x * frequency + time * speed + phase) * amplitude +
          Math.sin(x * frequency * 0.5 + time * speed * 0.7 + phase * 1.3) * amplitude * 0.5 +
          Math.cos(x * frequency * 0.3 + time * speed * 0.4) * amplitude * 0.3;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark navy gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(0.5, '#0f1d32');
      gradient.addColorStop(1, '#0a1628');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const h = canvas.height;

      // Multiple wave layers with different depths
      drawWave(h * 0.55, 25, 0.003, 0.4, 'rgba(16, 42, 67, 0.6)', 0);
      drawWave(h * 0.6, 20, 0.004, 0.5, 'rgba(16, 42, 67, 0.5)', 1);
      drawWave(h * 0.65, 18, 0.005, 0.6, 'rgba(20, 50, 80, 0.4)', 2);
      drawWave(h * 0.7, 15, 0.006, 0.7, 'rgba(25, 60, 95, 0.35)', 3);
      drawWave(h * 0.75, 12, 0.007, 0.8, 'rgba(30, 70, 110, 0.3)', 4);
      drawWave(h * 0.8, 10, 0.008, 0.9, 'rgba(35, 80, 125, 0.25)', 5);

      time += 0.015;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
};

export default WaveBackground;
