import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';
import SayanImg from '../pictures/Sayan.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Image slide in from left
      gsap.fromTo('.anim-about-img', {
        x: -50,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });

      // Content slide in staggered
      gsap.fromTo('.anim-about-text', {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <section id="about" className={`section-padding ${styles.aboutSection}`} ref={container}>
      <div className={styles.grid}>
        <div className={`${styles.imageCol} anim-about-img`}>
          <div className={styles.imageWrapper}>
            <img 
              src={SayanImg} 
              alt="Sayan Ghosh" 
              className={styles.image}
            />
            <div className={styles.imageBorder}></div>
          </div>
        </div>
        
        <div className={styles.contentCol}>
          <h2 className={`${styles.heading} anim-about-text`}>
            I am Sayan, a full stack web developer and a programmer working remotely in my home at Kalyani, India
          </h2>
          
          <div className={`${styles.paragraphs} anim-about-text`}>
            <p>
              I've spent the last 3+ years learning and working across different areas of development: front-end development, back-end development, UI/UX design and currently working for Monipur School and College Science Club as a Web developer
            </p>
            <p>
              These days my time is spent researching, designing, building websites, and coding. I also love to learn and experiment with new things.
            </p>
            <p>
              My mission is to help small and medium-sized businesses grow their audience and brand recognition by providing them a stylish and modern-looking, fully functional website
            </p>
          </div>
          
          <div className={`${styles.actions} anim-about-text`}>
            <div 
              className={styles.tooltipWrapper} 
              data-tooltip="click me"
              onMouseMove={handleMouseMove}
            >
              <a 
                href="https://drive.google.com/file/d/1am1Ok8fvAH38THMaMFb5WNs51s1PaC8-/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary glassy-item"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                My Resume
              </a>
            </div>
            <button className="btn-secondary glassy-item">Hire me</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
