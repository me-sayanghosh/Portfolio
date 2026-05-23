import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Cpu, Layers, Sparkles, Server } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import styles from './Projects.module.css';
import PrepDostImg from '../assets/PrepDost.png';
import VerifAiImg from '../assets/VerifAi.png';
import CodeReviewer from '../assets/CodeReviewer.png';
import HoopItImg from '../assets/HoopIt.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(0);
  const container = useRef(null);
  const detailsRef = useRef(null);
  const previewRef = useRef(null);
  const cardRef = useRef(null);

  const categories = ['All', 'Full-Stack', 'AI & Automation', 'UI/UX & Creative'];

  const projects = [
    {
      title: 'HoopIt',
      category: 'Full-Stack',
      tagline: 'Link Management & Productivity Dashboard',
      description: 'An all-in-one productivity suite combining a powerful URL shortener, organized link folders, custom tag management, sticky note-taking cards, and analytical visitor geolocation tracking.',
      image: HoopItImg,
      tech: {
        frontend: ['React.js', 'Vite', 'CSS Modules'],
        backend: ['Node.js', 'Express', 'MongoDB'],
        services: ['QR Code API', 'IP Geolocation', 'Redis Cache']
      },
      metrics: [
        { label: 'URLs Shortened', value: '24k+' },
        { label: 'Active Folders', value: '600+' },
        { label: 'Tracking SLA', value: '99.9%' }
      ],
      accent: '#2563eb',
      glow: 'rgba(37, 99, 235, 0.22)',
      liveLink: 'https://hoopit.vercel.app/',
      gitLink: 'https://github.com/me-sayanghosh/Hoopit'
    },
    {
      title: 'PrepDost',
      category: 'Full-Stack',
      tagline: 'Career Prep & AI Mock Interview Platform',
      description: 'A full-stack career platform designed to help students and job seekers build confidence. Featuring live interactive mock interviews, detailed behavioral feedback, and resume parsing powered by AI.',
      image: PrepDostImg,
      tech: {
        frontend: ['React.js', 'GSAP', 'CSS Modules'],
        backend: ['Node.js', 'Express', 'MongoDB'],
        services: ['OpenAI API', 'JWT Auth']
      },
      metrics: [
        { label: 'Mock Interviews', value: '1,200+' },
        { label: 'Success Rate', value: '94%' },
        { label: 'Response Time', value: '<150ms' }
      ],
      accent: '#f15a24',
      glow: 'rgba(241, 90, 36, 0.22)',
      liveLink: 'https://prep-dost.vercel.app/',
      gitLink: 'https://github.com/me-sayanghosh/PrepDost'
    },
    {
      title: 'CodeReviewer',
      category: 'AI & Automation',
      tagline: 'Automated AI Code Review Engine',
      description: 'An automated agent that reviews pull requests and code submissions in real-time. Features automated AST parsing, security vulnerability scans, and structural code refactoring recommendations.',
      image: CodeReviewer,
      tech: {
        frontend: ['React.js', 'Vite'],
        backend: ['FastAPI', 'Python'],
        services: ['OpenAI API', 'WebSockets', 'Docker']
      },
      metrics: [
        { label: 'Review Speed', value: '<2.5s' },
        { label: 'AI Accuracy', value: '98.2%' },
        { label: 'Bugs Spotted', value: '800+' }
      ],
      accent: '#8a2be2',
      glow: 'rgba(138, 43, 226, 0.22)',
      liveLink: 'https://code-reviewer-chi-cyan.vercel.app/',
      gitLink: 'https://github.com/me-sayanghosh/CodeReviewer'
    },
    {
      title: 'Veritas AI',
      category: 'UI/UX & Creative',
      tagline: 'Cinematic Weather Radar & Forecasting',
      description: 'A visually striking weather forecasting engine displaying complex meteorological datasets through interactive graphs, live-rendering particle storms, and geographic radar map feeds.',
      image: VerifAiImg,
      tech: {
        frontend: ['React.js', 'Chart.js'],
        animations: ['Framer Motion', 'Canvas'],
        integration: ['OpenWeather API', 'MapBox']
      },
      metrics: [
        { label: 'Uptime SLA', value: '99.99%' },
        { label: 'Initial Load', value: '0.4s' },
        { label: 'Radar Speed', value: '60 FPS' }
      ],
      accent: '#00f2fe',
      glow: 'rgba(0, 242, 254, 0.22)',
      liveLink: 'https://veritas-ai-tau.vercel.app/',
      gitLink: 'https://github.com/me-sayanghosh/veritas-ai'
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const currentProject = filteredProjects[activeProject] || filteredProjects[0] || projects[0];

  // Mouse 3D tilt tracking handler
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

    // Custom 3D rotate
    const rotateX = -dy * 12;
    const rotateY = dx * 12;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);

    // Dynamic light sheen glare coordinates
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

  // Section intro GSAP animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-project-header', {
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

      gsap.fromTo('.anim-project-layout', {
        y: 50,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power4.out'
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // GSAP state switch transition effect
  useEffect(() => {
    if (!detailsRef.current || !previewRef.current) return;

    const elementsToAnimate = detailsRef.current.querySelectorAll('.gsap-fade-in');
    const previewElements = previewRef.current.querySelectorAll('.gsap-preview-in');

    gsap.killTweensOf([elementsToAnimate, previewElements]);

    // Animate details elements using stagged opacity & position translations
    gsap.fromTo(elementsToAnimate,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
    );

    // Animate preview card with elastic scales
    gsap.fromTo(previewElements,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, [activeProject, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveProject(0);
  };

  return (
    <section id="projects" className="section-padding" ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-project-header`}>CREATIVE PORTFOLIO</span>
        <h2 className={`${styles.heading} anim-project-header`}>Projects I've Created</h2>
        
        {/* Category Pill Filters */}
        <div className={`${styles.filterBar} anim-project-header`}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.dashboardGrid} anim-project-layout`}>
        {/* Left column: Projects selector list */}
        <div className={styles.projectsSidebar}>
          <div className={styles.sidebarList}>
            {filteredProjects.map((project, index) => {
              const isActive = (filteredProjects[activeProject] ? activeProject : 0) === index;
              return (
                <div
                  key={project.title}
                  className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`}
                  onClick={() => setActiveProject(index)}
                  style={{ '--accent-glow': project.glow, '--project-accent': project.accent }}
                >
                  <div className={styles.itemIndicator} />
                  <div className={styles.itemBrief}>
                    <div className={styles.itemHeaderLine}>
                      <h3 className={styles.itemTitle}>{project.title}</h3>
                      <span className={styles.itemCategory}>{project.category}</span>
                    </div>
                    <p className={styles.itemTagline}>{project.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center column: Interactive 3D preview card */}
        <div className={styles.previewCenter} ref={previewRef}>
          <div 
            className={`gsap-preview-in ${styles.tiltWrapper}`}
            style={{ '--theme-accent': currentProject.accent, '--theme-glow': currentProject.glow }}
          >
            <div 
              className={styles.glassCard3d}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.imageOverlayContainer}>
                <img 
                  src={currentProject.image} 
                  alt={currentProject.title} 
                  className={styles.projectImage}
                />
                <div className={styles.cardGlare} />
                <div className={styles.bottomBanner}>
                  <Sparkles size={16} className="anim-pulse" />
                  <span>Cinematic Interactive 3D Canvas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Technical Context detail panel */}
        <div className={styles.detailsPanel} ref={detailsRef}>
          <div className={styles.detailsContent}>
            
            <div className={`${styles.detailsHeader} gsap-fade-in`}>
              <span className={styles.detailsCategory} style={{ color: currentProject.accent }}>
                {currentProject.category}
              </span>
              <h3 className={styles.detailsTitle}>{currentProject.title}</h3>
              <p className={styles.detailsTagline}>{currentProject.tagline}</p>
            </div>

            <p className={`${styles.detailsDesc} gsap-fade-in`}>
              {currentProject.description}
            </p>

            {/* Categorized Tech Stacks */}
            <div className={`${styles.techContainer} gsap-fade-in`}>
              <h4 className={styles.techHeading}>TECHNICAL BLUEPRINT</h4>
              
              <div className={styles.techGroups}>
                {currentProject.tech.frontend && (
                  <div className={styles.techGroup}>
                    <div className={styles.techGroupTitle}>
                      <Layers size={13} style={{ color: currentProject.accent }} />
                      <span>Interface</span>
                    </div>
                    <div className={styles.badges}>
                      {currentProject.tech.frontend.map(t => (
                        <span key={t} className={styles.badge}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {currentProject.tech.backend && (
                  <div className={styles.techGroup}>
                    <div className={styles.techGroupTitle}>
                      <Cpu size={13} style={{ color: currentProject.accent }} />
                      <span>Core Engine</span>
                    </div>
                    <div className={styles.badges}>
                      {currentProject.tech.backend.map(t => (
                        <span key={t} className={styles.badge}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {currentProject.tech.services && (
                  <div className={styles.techGroup}>
                    <div className={styles.techGroupTitle}>
                      <Server size={13} style={{ color: currentProject.accent }} />
                      <span>Integrations</span>
                    </div>
                    <div className={styles.badges}>
                      {currentProject.tech.services.map(t => (
                        <span key={t} className={styles.badge}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical metrics cards */}
            <div className={`${styles.metricsGrid} gsap-fade-in`}>
              {currentProject.metrics.map((metric) => (
                <div key={metric.label} className={styles.metricCard}>
                  <span className={styles.metricVal} style={{ textShadow: `0 0 10px ${currentProject.glow}` }}>
                    {metric.value}
                  </span>
                  <span className={styles.metricLabel}>{metric.label}</span>
                </div>
              ))}
            </div>

            {/* CTA action buttons */}
            <div className={`${styles.buttonGroup} gsap-fade-in`}>
              <a 
                href={currentProject.liveLink} 
                className={styles.btnPrimary}
                style={{ '--btn-accent': currentProject.accent, '--btn-glow': currentProject.glow }}
              >
                <span>Live Preview</span>
                <ExternalLink size={15} />
              </a>
              <a href={currentProject.gitLink} className={styles.btnSecondary}>
                <Github size={15} />
                <span>Source Code</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

