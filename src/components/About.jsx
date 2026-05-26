import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Code, MapPin, Briefcase, FileText, ArrowRight } from 'lucide-react';
import styles from './About.module.css';
import SayanImg from '../pictures/Sayan.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef();
  const cardRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Content slide in staggered
      gsap.fromTo('.anim-about-in', {
        y: 35,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  // 3D Portrait Cursor-Tracking Transform Handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    const rotateX = -dy * 10;
    const rotateY = dx * 10;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);

    card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--glare-x', '50%');
    card.style.setProperty('--glare-y', '50%');
  };

  const handleTooltipMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  const specs = [
    { icon: <Briefcase size={14} />, label: 'Role', value: 'Full-Stack Dev', animationClass: 'anim-float' },
    { icon: <Code size={14} />, label: 'Projects', value: '15+ Completed', animationClass: 'anim-pulse' },
    { icon: <MapPin size={14} />, label: 'Location', value: 'Kalyani, India', animationClass: 'anim-bounce' }
  ];

  return (
    <section id="about" className={`section-padding ${styles.aboutSection}`} ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-about-in`}>BIOGRAPHY</span>
        <h2 className={`${styles.heading} anim-about-in`}>About Me</h2>
      </div>

      <div className={styles.grid}>
        {/* Asymmetric Left column: 3D Portrait & Stats Grid */}
        <div className={`${styles.imageCol} anim-about-in`}>
          <div className={styles.tiltWrapper}>
            <div 
              className={styles.portraitCard3d}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.imageOverlayContainer}>
                <img 
                  src={SayanImg} 
                  alt="Sayan Ghosh" 
                  className={styles.image}
                />
                <div className={styles.cardGlare} />
                <div className={styles.portraitBanner}>
                  <Sparkles size={14} className="anim-pulse" style={{ color: '#f15a24' }} />
                  <span>Full-Stack Web Programmer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specs Grid right below portrait */}
          <div className={styles.specsGrid}>
            {specs.map((spec) => (
              <div key={spec.label} className={styles.specCard}>
                <div className={styles.specHeader}>
                  <span className={`${styles.specIcon} ${spec.animationClass}`}>{spec.icon}</span>
                  <span className={styles.specLabel}>{spec.label}</span>
                </div>
                <span className={styles.specVal}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column: Description, dynamic content blocks, actions */}
        <div className={styles.contentCol}>
          <h3 className={`${styles.aboutHeader} anim-about-in`}>
            Crafting scalable, premium digital systems that blend visual artistry with backend engineering.
          </h3>
          
          <div className={`${styles.paragraphs} anim-about-in`}>
            <p>
              I am Sayan, a dedicated full-stack web developer and programmer working remotely from my workspace in Kalyani, India. As a passionate fresher and self-taught software engineer, I have spent countless hours mastering the modern web ecosystem: engineering high-performance interfaces, developing secure API gateways, and structuring clean database schemas.
            </p>
            <p>
              Currently, I design and manage web systems for the **Monipur School and College Science Club** as a Web Developer, ensuring modern UI delivery and robust application performance. Most of my daily routines revolve around researching performance bottlenecks, structuring reusable components, and playing with modern animations.
            </p>
            <p>
              My core mission is to help growing enterprises establish a majestic digital presence. By prioritizing accessibility, clean architectures, and custom glassmorphism styles, I build web ecosystems that captivate and convert.
            </p>
          </div>
          
          <div className={`${styles.actions} anim-about-in`}>
            <div 
              className={styles.tooltipWrapper} 
              data-tooltip="View Drive Document"
              onMouseMove={handleTooltipMouseMove}
            >
              <a 
                href="https://drive.google.com/file/d/1EkjbHJDA0z8kC-Ui1KGVEJw_bvqZm3oo/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <span>Download Resume</span>
                <FileText size={16} />
              </a>
            </div>
            
            <a href="#contact" className={styles.btnSecondary}>
              <span>Hire me</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
