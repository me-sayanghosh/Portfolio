import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CanvasGrid from './components/CanvasGrid';
import Blogs from './components/Blogs';
import TechStack from './components/TechStack';
import GitHubOSS from './components/GitHubOSS';
import Guestbook from './components/Guestbook';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

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

    // Synchronize ScrollTrigger with Lenis scroll cycles
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP's ticker with Lenis frame updates
    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Dynamic buttery-smooth anchor links interceptor
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
      gsap.ticker.remove(updateRaf);
      window.removeEventListener('click', handleAnchorClick);
    };
  }, []);

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
      <CanvasGrid />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="app-container">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Services />
        <Achievements />
        <GitHubOSS />
        <Blogs />
        <Guestbook />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
