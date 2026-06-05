import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Sun, Moon, BookOpen, MessageSquare, Mail } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'blogs', 'guestbook', 'contact'];
    
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
      {/* Sleek top header containing logo and premium theme toggle button */}
      <header className={styles.topHeader}>
        <div className={styles.logo}>Sayan</div>
        <button 
          className={styles.themeToggleBtn}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
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
            href="#blogs" 
            className={`${styles.navLink} ${activeSection === 'blogs' ? styles.navLinkActive : ''}`}
            data-tooltip="Blogs"
          >
            <BookOpen size={18} className={activeSection === 'blogs' ? 'anim-pulse' : ''} />
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#guestbook" 
            className={`${styles.navLink} ${activeSection === 'guestbook' ? styles.navLinkActive : ''}`}
            data-tooltip="Guestbook"
          >
            <MessageSquare size={18} className={activeSection === 'guestbook' ? 'anim-sway' : ''} />
            <span className={styles.activeDot} />
          </a>
          <a 
            href="#contact" 
            className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}
            data-tooltip="Contact"
          >
            <Mail size={18} className={activeSection === 'contact' ? 'anim-bounce' : ''} />
            <span className={styles.activeDot} />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
