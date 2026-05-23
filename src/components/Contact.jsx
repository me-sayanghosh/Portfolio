import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles, Terminal } from 'lucide-react';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const form = useRef();
  const container = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-contact', {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const serviceId = 'service_ecu5drl';
    const templateId = 'template_nukzx4j';
    const publicKey = 'iUP1HL1z88vmIYp0H';

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setIsSubmitting(false);
          setStatus('success');
          form.current.reset();
          setTimeout(() => setStatus(null), 6000);
        },
        (error) => {
          setIsSubmitting(false);
          setStatus('error');
          console.error('FAILED...', error.text);
        }
      );
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="contact" className={`section-padding ${styles.contactSection}`} ref={container}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={`${styles.pretitle} anim-contact`}>COMMUNICATION PORTAL</span>
          <h2 className={`${styles.heading} anim-contact`}>Get In Touch</h2>
          <p className={`${styles.subheading} anim-contact`}>
            Have a project in mind, a role to fill, or simply want to talk shop? Establish a secure link below.
          </p>
        </div>
        
        <div 
          className={`glassy-item ${styles.formCard} anim-contact`}
          onMouseMove={handleMouseMove}
        >
          {/* Console Header Bar */}
          <div className={styles.consoleHeader}>
            <div className={styles.consoleDots}>
              <span className={`${styles.consoleDot} ${styles.redDot}`} />
              <span className={`${styles.consoleDot} ${styles.yellowDot}`} />
              <span className={`${styles.consoleDot} ${styles.greenDot}`} />
            </div>
            <div className={styles.consoleTitle}>
              <Terminal size={12} style={{ color: '#f15a24' }} />
              <span>SECURE_TRANSMISSION_PROTOCOL.exe</span>
            </div>
            <div className={styles.consoleStatus}>
              <span className={styles.statusBlink} />
              <span>ONLINE</span>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className={styles.formBody}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="user_name">SENDER_NAME</label>
                <div className={styles.inputWrapper}>
                  <input 
                    type="text" 
                    id="user_name"
                    name="user_name" 
                    className={styles.input} 
                    placeholder="e.g. John Doe"
                    required 
                  />
                  <div className={styles.inputBorderGlow} />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="user_email">SENDER_EMAIL</label>
                <div className={styles.inputWrapper}>
                  <input 
                    type="email" 
                    id="user_email"
                    name="user_email" 
                    className={styles.input} 
                    placeholder="e.g. john@example.com"
                    required 
                  />
                  <div className={styles.inputBorderGlow} />
                </div>
              </div>
            </div>
            
            <div className={styles.formGroup} style={{ marginTop: '0.5rem' }}>
              <label className={styles.label} htmlFor="message">TRANSMISSION_BODY</label>
              <div className={styles.inputWrapper}>
                <textarea 
                  id="message"
                  name="message" 
                  className={styles.textarea} 
                  placeholder="Type your message details here..."
                  required 
                />
                <div className={styles.inputBorderGlow} />
              </div>
            </div>
            
            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="anim-spin-slow" />
                  <span>TRANSMITTING_PACKETS...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>SEND TRANSMISSION</span>
                </>
              )}
            </button>
            
            {status === 'success' && (
              <div className={`${styles.statusMessage} ${styles.success}`}>
                <CheckCircle size={18} />
                <span>CONNECTION STABLE: Packet delivered successfully! I will transmit a response shortly.</span>
              </div>
            )}
            
            {status === 'error' && (
              <div className={`${styles.statusMessage} ${styles.error}`}>
                <AlertCircle size={18} />
                <span>CONNECTION TIMEOUT: Delivery failed. Please review your EmailJS configuration.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
