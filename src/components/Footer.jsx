import React from 'react';
import { FaFacebook as Facebook, FaTwitter as Twitter, FaLinkedin as Linkedin, FaGithub as Github } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`app-container ${styles.grid}`}>
        <div className={styles.colInfo}>
          <h3 className={styles.colTitle}>Sayan Ghosh</h3>
          <p className={styles.colDesc}>
            Full-Stack Software Engineer & Creative UI Programmer. Developing high-performance, beautiful digital systems.
          </p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/sayan.ghosh.210964" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Facebook size={16} className="anim-pulse" /></a>
            <a href="https://github.com/me-sayanghosh" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Github size={16} className="anim-wiggle" /></a>
            <a href="https://www.linkedin.com/in/sayan-ghosh-b7aaa5293/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Linkedin size={16} className="anim-bounce" /></a>
            <a href="https://x.com/SayanDev01" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Twitter size={16} className="anim-float" /></a>
          </div>
        </div>
        
        <div className={styles.contactDetails}>
          <div className={styles.infoBlock}>
            <strong>Email</strong>
            <p>sayanghosh1887@gmail.com</p>
          </div>
          <div className={styles.infoBlock}>
            <strong>Phone</strong>
            <p>+91 9339740537</p>
          </div>
          <div className={styles.infoBlock}>
            <strong>Address</strong>
            <p>Kalyani, Nadia, West Bengal, India</p>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className="app-container">
          <p>Copyright &copy; 2026 Sayan Ghosh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
