import React from 'react';
import { FaFacebook as Facebook, FaTwitter as Twitter, FaLinkedin as Linkedin, FaGithub as Github } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`app-container ${styles.grid}`}>
        <div className={styles.formCol}>
          <h2 className={styles.heading}>Get in touch</h2>
          <form className={styles.form}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Full name" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Email address" className={styles.input} />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <input type="tel" placeholder="Phone Number" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Subject" className={styles.input} />
              </div>
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <textarea placeholder="Write your message here" className={styles.input} rows="4"></textarea>
            </div>
            <button className="btn-primary glassy-item" style={{marginTop: '1.5rem', width: 'fit-content'}}>Send Message</button>
          </form>
        </div>
        
        <div className={styles.colInfo}>
          <h3 className={styles.colTitle}>Contact me</h3>
          <div className={styles.infoBlock}>
            <strong>Email:</strong>
            <p>sayanghosh1887@gmail.com</p>
          </div>
          <div className={styles.infoBlock}>
            <strong>Phone:</strong>
            <p>+91 9339740537</p>
          </div>
          <div className={styles.infoBlock}>
            <strong>Address:</strong>
            <p>Kalyani, Nadia<br/>West Bengal, India</p>
          </div>
          
          <div className={styles.socials}>
            <a href="https://www.facebook.com/sayan.ghosh.210964" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Facebook size={16} className="anim-pulse" /></a>
            <a href="https://github.com/me-sayanghosh" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Github size={16} className="anim-wiggle" /></a>
            <a href="https://www.linkedin.com/in/sayan-ghosh-b7aaa5293/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Linkedin size={16} className="anim-bounce" /></a>
            <a href="https://x.com/SayanDev01" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Twitter size={16} className="anim-float" /></a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className="app-container">
          <p>Copyright &copy; 2025 Sayan Ghosh - All rights reserved || Designed By: Sayan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
