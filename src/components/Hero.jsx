import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MapPin } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  const container = useRef();
  
  const technologies = [
    'JavaScript', 'ReactJs', 'Node', 'Express', 'NextJs', 
    'Python', 'Flask', 'MySQL', 'MongoDB', 'Git', 'GitHub', 'Figma', 'WordPress'
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-hero', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.1
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const handleNameMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <section id="home" className={styles.hero} ref={container}>
      <div className={`${styles.location} anim-hero`}>
        <MapPin size={16} className="anim-bounce" /> India
      </div>
      <h1 className={`${styles.title} anim-hero`}>
        I'm <span className={styles.nameHighlight} data-tooltip="hire me.. plzz!!" onMouseMove={handleNameMouseMove}>Sayan Ghosh</span><br/>Full-Stack Dev<span className={styles.cursorBlink}></span>
      </h1>
      <p className={`${styles.subtitle} anim-hero`}>
        I specialize in researching and analyzing your brand and provide you a beautiful and effective website for making a digital standing among your competitors
      </p>
      
      <div className={`${styles.actions} anim-hero`}>
        <a 
          href="#contact" 
          className="btn-primary glassy-item"
          style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
        >
          Get yours now
        </a>
        <a 
          href="#projects" 
          className="btn-secondary glassy-item"
          style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
        >
          See my works
        </a>
      </div>

      <div className={`${styles.techSection} anim-hero`}>
        <p className={styles.techTitle}>Technologies I use</p>
        <div className={styles.techScrollContainer}>
          <div className={styles.techScrollTrack}>
            {[...technologies, ...technologies].map((tech, index) => (
              <span key={`${tech}-${index}`} className={`${styles.techBadge} glassy-item`}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
