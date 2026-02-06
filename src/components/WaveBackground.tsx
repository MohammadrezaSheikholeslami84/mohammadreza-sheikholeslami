import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
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

    const drawOrb = (x: number, y: number, radius: number, color: string) => {
      if (!ctx) return;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep gradient background with more richness
      const gradient = ctx.createLinearGradient(0, 0, canvas.width * 0.3, canvas.height);
      gradient.addColorStop(0, '#060d1f');
      gradient.addColorStop(0.3, '#0a1628');
      gradient.addColorStop(0.6, '#0d1b35');
      gradient.addColorStop(1, '#070e20');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating orbs for depth
      const orbTime = time * 0.3;
      drawOrb(
        canvas.width * 0.15 + Math.sin(orbTime * 0.7) * 80,
        canvas.height * 0.25 + Math.cos(orbTime * 0.5) * 60,
        200,
        'rgba(56, 120, 223, 0.03)'
      );
      drawOrb(
        canvas.width * 0.8 + Math.sin(orbTime * 0.4) * 100,
        canvas.height * 0.15 + Math.cos(orbTime * 0.6) * 70,
        250,
        'rgba(100, 150, 255, 0.025)'
      );
      drawOrb(
        canvas.width * 0.5 + Math.cos(orbTime * 0.3) * 120,
        canvas.height * 0.6 + Math.sin(orbTime * 0.5) * 80,
        300,
        'rgba(56, 120, 223, 0.02)'
      );

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction - subtle repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.3;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulsing opacity
        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulsePhase) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 180, 255, ${alpha})`;
        ctx.fill();
      });

      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 160, 255, ${(1 - dist / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const h = canvas.height;

      // Wave layers with more variety
      drawWave(h * 0.50, 30, 0.002, 0.3, 'rgba(12, 35, 60, 0.5)', 0);
      drawWave(h * 0.55, 25, 0.003, 0.4, 'rgba(16, 42, 67, 0.45)', 1);
      drawWave(h * 0.60, 22, 0.004, 0.5, 'rgba(16, 42, 67, 0.4)', 2);
      drawWave(h * 0.65, 18, 0.005, 0.6, 'rgba(20, 50, 80, 0.35)', 3);
      drawWave(h * 0.70, 15, 0.006, 0.7, 'rgba(25, 60, 95, 0.3)', 4);
      drawWave(h * 0.75, 12, 0.007, 0.8, 'rgba(30, 70, 110, 0.25)', 5);
      drawWave(h * 0.80, 10, 0.008, 0.9, 'rgba(35, 80, 125, 0.2)', 6);
      drawWave(h * 0.85, 8, 0.009, 1.0, 'rgba(40, 90, 140, 0.15)', 7);

      time += 0.015;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
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
