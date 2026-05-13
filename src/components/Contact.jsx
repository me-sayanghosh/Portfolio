import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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
        duration: 0.8,
        stagger: 0.2,
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
          // Hide success message after 5 seconds
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          setIsSubmitting(false);
          setStatus('error');
          console.error('FAILED...', error.text);
        }
      );
  };

  return (
    <section id="contact" className={`section-padding ${styles.contactSection}`} ref={container}>
      <div className={styles.container}>
        <h2 className={`${styles.heading} anim-contact`}>Get In Touch</h2>
        <p className={`${styles.subheading} anim-contact`}>Have a question or want to work together? Drop me a message!</p>
        
        <div className={`glassy-item ${styles.formCard} anim-contact`}>
          <form ref={form} onSubmit={sendEmail}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="user_name">Name</label>
              <input 
                type="text" 
                id="user_name"
                name="user_name" 
                className={styles.input} 
                placeholder="John Doe"
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="user_email">Email</label>
              <input 
                type="email" 
                id="user_email"
                name="user_email" 
                className={styles.input} 
                placeholder="john@example.com"
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message" 
                className={styles.textarea} 
                placeholder="Hi there! I'd like to talk about..."
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="anim-spin-slow" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
            
            {status === 'success' && (
              <div className={`${styles.statusMessage} ${styles.success}`}>
                <CheckCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {status === 'error' && (
              <div className={`${styles.statusMessage} ${styles.error}`}>
                <AlertCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                Oops! Something went wrong. Please check your EmailJS configuration.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
