import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Sun, Moon, BookOpen, MessageSquare, Mail } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    // Check if we are on a dedicated subpage
    if (location.pathname === '/projects') {
      setActiveSection('projects');
      return;
    }
    if (location.pathname === '/blogs') {
      setActiveSection('blogs');
      return;
    }
    if (location.pathname === '/guestbook') {
      setActiveSection('guestbook');
      return;
    }
    if (location.pathname === '/achievements') {
      setActiveSection('achievements');
      return;
    }

    const sections = ['home', 'about', 'projects', 'blogs', 'guestbook', 'contact'];
    
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
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
  }, [location.pathname]);

  const handleNavClick = (e, targetPath, hash) => {
    // If we are already on the target path (e.g. '/') and click a hash link, scroll smoothly
    if (location.pathname === targetPath && hash) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Sleek top header containing logo and premium theme toggle button */}
      <header className={styles.topHeader}>
        <Link to="/" className={styles.logo} style={{ textDecoration: 'none' }}>Sayan</Link>
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
          <Link 
            to="/" 
            onClick={(e) => handleNavClick(e, '/', 'home')}
            className={`${styles.navLink} ${activeSection === 'home' ? styles.navLinkActive : ''}`}
            data-tooltip="Home"
          >
            <Home size={18} className={activeSection === 'home' ? 'anim-bounce' : ''} />
            <span className={styles.activeDot} />
          </Link>
          <Link 
            to="/#about" 
            onClick={(e) => handleNavClick(e, '/', 'about')}
            className={`${styles.navLink} ${activeSection === 'about' ? styles.navLinkActive : ''}`}
            data-tooltip="About"
          >
            <User size={18} className={activeSection === 'about' ? 'anim-pulse' : ''} />
            <span className={styles.activeDot} />
          </Link>
          <Link 
            to="/projects" 
            className={`${styles.navLink} ${activeSection === 'projects' ? styles.navLinkActive : ''}`}
            data-tooltip="Projects"
          >
            <Briefcase size={18} className={activeSection === 'projects' ? 'anim-float' : ''} />
            <span className={styles.activeDot} />
          </Link>
          <Link 
            to="/blogs" 
            className={`${styles.navLink} ${activeSection === 'blogs' ? styles.navLinkActive : ''}`}
            data-tooltip="Blogs"
          >
            <BookOpen size={18} className={activeSection === 'blogs' ? 'anim-pulse' : ''} />
            <span className={styles.activeDot} />
          </Link>
          <Link 
            to="/guestbook" 
            className={`${styles.navLink} ${activeSection === 'guestbook' ? styles.navLinkActive : ''}`}
            data-tooltip="Guestbook"
          >
            <MessageSquare size={18} className={activeSection === 'guestbook' ? 'anim-sway' : ''} />
            <span className={styles.activeDot} />
          </Link>
          <Link 
            to="/#contact" 
            onClick={(e) => handleNavClick(e, '/', 'contact')}
            className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}
            data-tooltip="Contact"
          >
            <Mail size={18} className={activeSection === 'contact' ? 'anim-bounce' : ''} />
            <span className={styles.activeDot} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
