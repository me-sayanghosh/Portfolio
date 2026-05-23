import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Trophy, MessageSquare } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'achievements', 'contact'];
    
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 60;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial active section check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sleek top header containing only the logo for high-end minimalism */}
      <header className={styles.topHeader}>
        <div className={styles.logo}>Sayan</div>
      </header>

      {/* Floating fixed bottom capsule navbar */}
      <nav className={styles.bottomNavContainer}>
        <div className={styles.capsuleNav}>
          <a 
            href="#home" 
            className={`${styles.navLink} ${activeSection === 'home' ? styles.navLinkActive : ''}`}
            data-tooltip="Home"
          >
            <Home size={18} className={activeSection === 'home' ? 'anim-bounce' : ''} />
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#about" 
            className={`${styles.navLink} ${activeSection === 'about' ? styles.navLinkActive : ''}`}
            data-tooltip="About"
          >
            <User size={18} className={activeSection === 'about' ? 'anim-pulse' : ''} />
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#projects" 
            className={`${styles.navLink} ${activeSection === 'projects' ? styles.navLinkActive : ''}`}
            data-tooltip="Projects"
          >
            <Briefcase size={18} className={activeSection === 'projects' ? 'anim-float' : ''} />
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#achievements" 
            className={`${styles.navLink} ${activeSection === 'achievements' ? styles.navLinkActive : ''}`}
            data-tooltip="Achievements"
          >
            <Trophy size={18} className={activeSection === 'achievements' ? 'anim-wiggle' : ''} />
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#contact" 
            className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}
            data-tooltip="Contact"
          >
            <MessageSquare size={18} className={activeSection === 'contact' ? 'anim-sway' : ''} />
            <span className={styles.activeDot} />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
