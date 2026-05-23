import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'projects', 'achievements', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
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
            href="#about" 
            className={`${styles.navLink} ${activeSection === 'about' ? styles.navLinkActive : ''}`}
          >
            <span>About</span>
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#projects" 
            className={`${styles.navLink} ${activeSection === 'projects' ? styles.navLinkActive : ''}`}
          >
            <span>Projects</span>
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#achievements" 
            className={`${styles.navLink} ${activeSection === 'achievements' ? styles.navLinkActive : ''}`}
          >
            <span>Achievements</span>
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#contact" 
            className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}
          >
            <span>Contact</span>
            <span className={styles.activeDot} />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
