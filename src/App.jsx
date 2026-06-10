import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CanvasGrid from './components/CanvasGrid';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import BlogsPage from './pages/BlogsPage';
import GuestbookPage from './pages/GuestbookPage';
import AchievementsPage from './pages/AchievementsPage';
import AdminPage from './pages/AdminPage';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Premium GSAP + Lenis Smooth Inertial Scroll Integration
  useEffect(() => {
    // Only smooth scroll on desktop viewport widths to keep mobile performance native & lag-free
    if (window.innerWidth <= 768) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious inertial ease curve
      smoothWheel: true,
      syncTouch: false, // Use native touch gestures on mobile/tablet to avoid scroll jank
    });

    lenisRef.current = lenis;

    // Synchronize ScrollTrigger with Lenis scroll cycles
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP's ticker with Lenis frame updates
    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Dynamic buttery-smooth anchor links interceptor (local hashes)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -20, // Visual offset buffer
            duration: 1.5,
          });
        }
      }
    };
    window.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(updateRaf);
      window.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Handle scrolling to hash sections across page routing transitions
  useEffect(() => {
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        const timeoutId = setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetElement, {
              offset: -20,
              duration: 1.5,
            });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [location]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const handleMouseMove = (e) => {
      const items = document.querySelectorAll('.glassy-item');
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <CanvasGrid />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
