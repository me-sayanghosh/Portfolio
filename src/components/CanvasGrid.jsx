import React, { useEffect, useRef, useState } from 'react';

const CanvasGrid = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isActive: false });
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Detect theme dynamically by checking classes on documentElement
  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      setTheme(isLight ? 'light' : 'dark');
    };

    checkTheme();

    // Set up a MutationObserver to watch class changes on documentElement
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Handle window resizing and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // If mobile, draw a single beautiful static grid frame and skip active drawing
      if (mobile) {
        drawStaticGrid();
      }
    };

    const drawStaticGrid = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light-theme');
      
      // Warm copper settings for light theme, standard stardust settings for dark theme
      const baseLineColor = isLight ? 'rgba(241, 90, 36, 0.055)' : 'rgba(255, 255, 255, 0.015)';
      const dotColor = isLight ? 'rgba(241, 90, 36, 0.10)' : 'rgba(255, 255, 255, 0.05)';
      const gridSize = 80; // Larger grid size on mobile = cleaner, less busy visual weight

      // Draw static grid lines
      ctx.strokeStyle = baseLineColor;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw static dots
      ctx.fillStyle = dotColor;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  // Main interactive logic for desktop ONLY (width > 768px)
  // This bypasses requestAnimationFrame completely on mobile to preserve 100% scrolling fluidity.
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const gridSize = 60;
    const pullRadius = 260; // Influence zone of mouse gravity
    const maxPull = 7; // Max displacement in pixels

    // Initialize mouse at center of viewport initially
    const initMousePos = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      mouseRef.current.x = width / 2;
      mouseRef.current.y = height / 2;
      mouseRef.current.targetX = width / 2;
      mouseRef.current.targetY = height / 2;
    };
    initMousePos();

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.isActive = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);

    // Dynamic color tokens based on active theme
    const getColors = () => {
      const isLight = theme === 'light';
      return {
        isLight,
        baseLineColor: isLight ? 'rgba(241, 90, 36, 0.065)' : 'rgba(255, 255, 255, 0.015)',
        glowColor: isLight ? 'rgba(241, 90, 36, 0.22)' : 'rgba(241, 90, 36, 0.12)',
        glowBorderColor: isLight ? 'rgba(241, 90, 36, 0.1)' : 'rgba(241, 90, 36, 0.04)',
        dotBaseColor: isLight ? 'rgba(241, 90, 36, 0.12)' : 'rgba(255, 255, 255, 0.06)',
        dotGlowColor: 'rgba(241, 90, 36, 0.75)',
      };
    };

    // Render loop
    const render = (timestamp) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const colors = getColors();
      const mouse = mouseRef.current;
      
      if (!mouse.isActive) {
        // Ambient organic drift when mouse is off-screen or inactive
        const time = timestamp * 0.0008;
        mouse.targetX = width / 2 + Math.cos(time * 0.6) * (width * 0.25);
        mouse.targetY = height / 2 + Math.sin(time * 0.4) * (height * 0.2);
      }

      // Smooth lag interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Draw Spotlight Glowing Background Radial Gradient
      const spotGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
      spotGlow.addColorStop(0, colors.isLight ? 'rgba(241, 90, 36, 0.03)' : 'rgba(241, 90, 36, 0.04)');
      spotGlow.addColorStop(1, 'rgba(241, 90, 36, 0)');
      ctx.fillStyle = spotGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Grid Lines
      const lineGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, pullRadius);
      lineGradient.addColorStop(0, colors.glowColor);
      lineGradient.addColorStop(0.5, colors.glowBorderColor);
      lineGradient.addColorStop(1, colors.baseLineColor);

      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 1;

      ctx.beginPath();
      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Draw Dots with Magnetic Pull Warp
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = x;
          let drawY = y;
          let dotSize = 1;
          let fillStyle = colors.dotBaseColor;

          if (dist < pullRadius) {
            const influence = (1 - dist / pullRadius) ** 1.8;
            
            // Pull dots slightly towards the cursor
            const displacement = maxPull * influence;
            const angle = Math.atan2(dy, dx);
            drawX += Math.cos(angle) * displacement;
            drawY += Math.sin(angle) * displacement;

            dotSize = 1 + 1.2 * influence;
            
            const alpha = colors.isLight ? (0.12 + 0.48 * influence) : (0.06 + 0.54 * influence);
            fillStyle = `rgba(241, 90, 36, ${alpha})`;
          }

          ctx.fillStyle = fillStyle;
          ctx.beginPath();
          ctx.arc(drawX, drawY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile, theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.85,
      }}
    />
  );
};

export default CanvasGrid;
