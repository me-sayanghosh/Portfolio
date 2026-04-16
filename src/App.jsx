import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Designs from './components/Designs';
import About from './components/About';
import Achievements from './components/Achievements';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
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
      <Navbar />
      <main className="app-container">
        <Hero />
        <Projects />
        <Services />
      
        <About />
        <Achievements />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
