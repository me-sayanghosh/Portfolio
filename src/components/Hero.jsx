import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  const container = useRef();
  
  const technologies = [
    'JavaScript', 'ReactJs', 'Node.js', 'Express', 'Next.js', 
    'Python', 'FastAPI', 'MySQL', 'MongoDB', 'Git', 'GitHub', 'Figma', 'WordPress'
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-hero', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.1
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
    <section id="home" className={styles.hero} ref={container}>
      <div className={`${styles.location} anim-hero`}>
        <div className={styles.locationBadge}>
          <MapPin size={13} className="anim-bounce" />
          <span>Kalyani, India</span>
        </div>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>Available for Remote Work</span>
        </div>
      </div>
      
      <div className={`${styles.brandBadge} anim-hero`}>
        <Sparkles size={12} className="anim-pulse" style={{ color: '#f15a24' }} />
        <span>DESIGNING DIGITAL EXCELLENCE</span>
      </div>
      
      <h1 className={`${styles.title} anim-hero`}>
        I am <span className={styles.nameHighlight} onMouseMove={handleMouseMove} data-tooltip="Available Now">Sayan Ghosh</span>
      </h1>
      
      <h2 className={`${styles.roleTitle} anim-hero`}>
        <span className={styles.gradientTitle}>Full-Stack Engineer</span>
        <span className={styles.cursorBlink}></span>
      </h2>
      
      <p className={`${styles.subtitle} anim-hero`}>
        I specialize in researching and analyzing brand identities to build bespoke, cinematic web platforms that secure a powerful, high-performance digital presence.
      </p>
      
      <div className={`${styles.actions} anim-hero`}>
        <a 
          href="#contact" 
          className={styles.btnPrimary}
        >
          <span>Get in Touch</span>
          <ArrowUpRight size={16} />
        </a>
        <a 
          href="#projects" 
          className={styles.btnSecondary}
        >
          <span>See my works</span>
        </a>
      </div>

      <div className={`${styles.techSection} anim-hero`}>
        <div className={styles.techTitleLine}>
          <Sparkles size={14} className="anim-pulse" style={{ color: '#f15a24' }} />
          <p className={styles.techTitle}>CURATED TECHNICAL BLUEPRINT</p>
        </div>
        <div className={styles.techScrollContainer}>
          <div className={styles.techScrollTrack}>
            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
              <span key={`${tech}-${index}`} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
