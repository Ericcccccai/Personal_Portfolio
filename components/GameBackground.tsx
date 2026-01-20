import React, { useEffect, useRef } from 'react';
import { ALL_GAME_TITLES } from '../constants';

interface Particle {
  x: number;
  y: number;
  text: string;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  isHighlighted: boolean;
  pulseSpeed: number;
  pulseOffset: number;
}

const GameBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  
  // Configuration
  const PARTICLE_COUNT = 40; 
  const MOUSE_RADIUS = 250;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const createParticle = (): Particle => {
      const text = ALL_GAME_TITLES[Math.floor(Math.random() * ALL_GAME_TITLES.length)];
      const isHighlighted = Math.random() > 0.85; // 15% highlighted
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        text,
        vx: (Math.random() - 0.5) * 0.4, // Random X velocity
        vy: (Math.random() - 0.5) * 0.4, // Random Y velocity
        size: Math.random() * 12 + 14, // 14-26px
        baseOpacity: Math.random() * 0.2 + 0.15, // 0.15 - 0.35 base opacity (more visible)
        isHighlighted,
        pulseSpeed: Math.random() * 2 + 1,
        pulseOffset: Math.random() * Math.PI * 2
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() / 1000;

      // Fetch color every frame to support dynamic theme switching
      const primaryColorVar = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
      let r = 13, g = 148, b = 136; // default fallback
      if (primaryColorVar) {
          const parts = primaryColorVar.includes(' ') ? primaryColorVar.split(' ') : primaryColorVar.split(',');
          if (parts.length >= 3) {
              r = parseInt(parts[0]);
              g = parseInt(parts[1]);
              b = parseInt(parts[2]);
          }
      }

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < -150) p.x = width + 150;
        if (p.x > width + 150) p.x = -150;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Calculate interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let alpha = p.baseOpacity;
        let isHovered = false;

        if (dist < MOUSE_RADIUS) {
            const hoverFactor = Math.pow(1 - dist / MOUSE_RADIUS, 1.5); // easing
            alpha = Math.min(1, p.baseOpacity + hoverFactor * 0.85);
            isHovered = true;
        } else if (p.isHighlighted) {
            // Pulse highlighted items when not hovered
            const pulse = (Math.sin(time * p.pulseSpeed + p.pulseOffset) + 1) / 2;
            alpha = p.baseOpacity + (pulse * 0.3);
        }

        // Draw
        ctx.font = `${(p.isHighlighted || isHovered) ? '700' : '400'} ${p.size}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        if (p.isHighlighted || isHovered) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            if (isHovered) {
                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
                ctx.shadowBlur = 12;
            } else {
                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
                ctx.shadowBlur = 6;
            }
        } else {
            ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.shadowBlur = 0;
        }
        
        ctx.fillText(p.text, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    initParticles();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default GameBackground;