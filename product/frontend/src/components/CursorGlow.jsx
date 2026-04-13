import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 1. Floating Rings that trail the cursor
    class Floater {
      constructor(radius, color, friction, floatSpeed) {
        this.x = width / 2;
        this.y = height / 2;
        this.radius = radius;
        this.color = color;
        this.friction = friction;
        this.floatSpeed = floatSpeed;
        this.angle = Math.random() * Math.PI * 2;
      }
      
      update(time) {
        // Slight circular levitation
        let floatOffsetY = Math.sin(time * this.floatSpeed + this.angle) * 20;
        let floatOffsetX = Math.cos(time * this.floatSpeed + this.angle) * 20;

        let targetX = mouse.x + floatOffsetX;
        let targetY = mouse.y + floatOffsetY;

        this.x += (targetX - this.x) * this.friction;
        this.y += (targetY - this.y) * this.friction;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    const floaters = [
      new Floater(10, 'rgba(255, 255, 255, 0.8)', 0.15, 0.003),
      new Floater(25, 'rgba(0, 113, 227, 0.5)', 0.08, 0.002),
      new Floater(45, 'rgba(144, 19, 254, 0.3)', 0.04, 0.001),
      new Floater(75, 'rgba(255, 255, 255, 0.1)', 0.02, 0.0005)
    ];

    // 2. Ambient floating background particles
    const particles = [];
    for (let i = 0; i < 70; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 0.5 - 0.2, // Drift upwards organically
            originalVx: (Math.random() - 0.5) * 0.5,
            originalVy: -Math.random() * 0.5 - 0.2,
        });
    }

    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update ambient particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Loop around screen
        if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Repel from cursor
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let distance = Math.hypot(dx, dy);
        let maxDist = 120;
        
        if (distance < maxDist) {
            let force = (maxDist - distance) / maxDist;
            p.vx += (dx / distance) * force * 0.4;
            p.vy += (dy / distance) * force * 0.4;
        }

        // Ease back to organic drifting speed
        p.vx += (p.originalVx - p.vx) * 0.05;
        p.vy += (p.originalVy - p.vy) * 0.05;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      });

      // Draw trailing rings if mouse is active
      if (mouse.x !== -1000) {
          floaters.forEach(f => {
            f.update(time);
            f.draw();
          });
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
