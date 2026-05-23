import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Server, Paintbrush, Zap, Sparkles } from 'lucide-react';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const container = useRef(null);

  const services = [
    {
      icon: <Monitor size={22} className="anim-pulse" />,
      title: 'Front-End Development',
      tag: 'INTERFACE ARCHITECT',
      description: 'Bringing highly polished static mockups and interactive flows to life. I build fluid, component-driven, responsive UI grids centered around strict performance and visual elegance.',
      accent: '#00f2fe',
      glow: 'rgba(0, 242, 254, 0.15)',
      tech: ['React.js', 'Vite', 'GSAP', 'CSS Modules'],
      metrics: [
        { label: 'Lighthouse Score', value: '98+' },
        { label: 'SEO Rating', value: '100' }
      ]
    },
    {
      icon: <Server size={22} className="anim-float" />,
      title: 'Back-End Integration',
      tag: 'CORE ENGINE DEV',
      description: 'Developing rock-solid server architectures to power high-throughput web clients. Dedicated to clean RESTful APIs, optimized database queries, and secure user session management.',
      accent: '#8a2be2',
      glow: 'rgba(138, 43, 226, 0.15)',
      tech: ['Node.js', 'Express', 'FastAPI', 'MongoDB'],
      metrics: [
        { label: 'API Latency', value: '<80ms' },
        { label: 'Uptime target', value: '99.9%' }
      ]
    },
    {
      icon: <Paintbrush size={22} className="anim-wiggle" />,
      title: 'UI/UX Interactive Design',
      tag: 'EXPERIENCE CRAFTSMAN',
      description: 'Designing accessible, interactive, and visually memorable layouts. Every design choice is driven by user behavioral patterns, layout accessibility standards, and clean grid harmony.',
      accent: '#ec008c',
      glow: 'rgba(236, 0, 140, 0.15)',
      tech: ['Figma Prototyping', 'Design Systems', 'UX Auditing'],
      metrics: [
        { label: 'Accessibility', value: 'WCAG AAA' },
        { label: 'Figma Iterations', value: 'Clean AutoLayout' }
      ]
    },
    {
      icon: <Zap size={22} className="anim-bounce" />,
      title: 'Speed & SEO Tuning',
      tag: 'PERFORMANCE ENGINEER',
      description: 'Optimizing resource delivery and resolving pipeline bottlenecks. I implement strict static optimization, intelligent data caching, and structural schema tagging for higher Google ranking.',
      accent: '#f15a24',
      glow: 'rgba(241, 90, 36, 0.15)',
      tech: ['Webpack/Vite Tuning', 'Static Generation', 'Microdata'],
      metrics: [
        { label: 'FCP Speed', value: '<0.4s' },
        { label: 'Core Web Vitals', value: 'Passed' }
      ]
    }
  ];

  // GSAP scroll trigger for card stagger entries
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-service-header', {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.fromTo('.anim-service-card', {
        y: 50,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" className={`section-padding ${styles.servicesSection}`} ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-service-header`}>SKILLS MATRIX</span>
        <h2 className={`${styles.heading} anim-service-header`}>My Specialized Skills</h2>
        <p className={`${styles.subheading} anim-service-header`}>
          I build high-end components designed to combine mechanical utility with digital elegance.
        </p>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`glassy-item anim-service-card ${styles.serviceCard}`}
            onMouseMove={handleMouseMove}
            style={{ '--service-accent': service.accent, '--service-glow': service.glow }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                {service.icon}
              </div>
              <div className={styles.headerInfo}>
                <span className={styles.cardTag}>{service.tag}</span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>
            </div>

            <p className={styles.cardDesc}>{service.description}</p>

            {/* Sub Tech Badges */}
            <div className={styles.techBlueprint}>
              <h4 className={styles.blueprintTitle}>TECH STACK</h4>
              <div className={styles.badges}>
                {service.tech.map((t) => (
                  <span key={t} className={styles.badge}>{t}</span>
                ))}
              </div>
            </div>

            {/* Performance telemetry stats */}
            <div className={styles.telemetryGrid}>
              {service.metrics.map((m) => (
                <div key={m.label} className={styles.telemetryCard}>
                  <span className={styles.telemetryVal}>{m.value}</span>
                  <span className={styles.telemetryLabel}>{m.label}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.ambientGlow} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
