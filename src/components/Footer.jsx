import React, { useState } from 'react';
import { FaFacebook as Facebook, FaTwitter as Twitter, FaLinkedin as Linkedin, FaGithub as Github, FaRegCopy, FaCheck } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <footer className={styles.footer}>
      <div className={`app-container ${styles.grid}`}>
        <div className={styles.colInfo}>
          <h3 className={styles.colTitle}>Sayan Ghosh</h3>
          <p className={styles.colDesc}>
            Full-Stack Software Engineer & Creative UI Programmer. Developing high-performance, beautiful digital systems.
          </p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/sayan.ghosh.210964" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} anim-sway`}><Facebook size={16} /></a>
            <a href="https://github.com/me-sayanghosh" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} anim-sway`}><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/sayan-ghosh-b7aaa5293/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} anim-sway`}><Linkedin size={16} /></a>
            <a href="https://x.com/SayanDev01" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} anim-sway`}><Twitter size={16} /></a>
          </div>
        </div>
        
        <div className={styles.contactDetails}>
          <div className={styles.infoBlock}>
            <strong>Email</strong>
            <div className={styles.contactWrapper}>
              <p className={styles.contactText}>sayanghosh1887@gmail.com</p>
              <button 
                onClick={() => handleCopy('sayanghosh1887@gmail.com', 'email')} 
                className={styles.copyBtn} 
                data-tooltip={copiedField === 'email' ? "Copied!" : "Copy Email"}
                aria-label="Copy Email Address"
              >
                {copiedField === 'email' ? (
                  <FaCheck className={styles.copiedIcon} size={11} />
                ) : (
                  <FaRegCopy className={styles.copyIcon} size={11} />
                )}
              </button>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <strong>Phone</strong>
            <div className={styles.contactWrapper}>
              <p className={styles.contactText}>+91 9339740537</p>
              <button 
                onClick={() => handleCopy('+91 9339740537', 'phone')} 
                className={styles.copyBtn} 
                data-tooltip={copiedField === 'phone' ? "Copied!" : "Copy Phone"}
                aria-label="Copy Phone Number"
              >
                {copiedField === 'phone' ? (
                  <FaCheck className={styles.copiedIcon} size={11} />
                ) : (
                  <FaRegCopy className={styles.copyIcon} size={11} />
                )}
              </button>
            </div>
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
