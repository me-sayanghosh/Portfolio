import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';
import PrepDostImg from '../assets/PrepDost.png';
import VerifAiImg from '../assets/VerifAi.png';
import CodeReviewer from '../assets/CodeReviewer.png';
import HoopItImg from '../assets/HoopIt.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ featured }) => {
  const container = useRef(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('sayan_portfolio_projects');
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (err) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('sayan_portfolio_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const defaultProjects = [
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
      accent: '#00f2fe',
      glow: 'rgba(0, 242, 254, 0.22)',
      liveLink: 'https://veritas-ai-tau.vercel.app/',
      gitLink: 'https://github.com/me-sayanghosh/veritas-ai'
    }
  ];

  const displayProjects = featured ? projects.slice(0, 2) : projects;

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
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding" ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-project-header`}>CREATIVE PORTFOLIO</span>
        <h2 className={`${styles.heading} anim-project-header`}>
          {featured ? 'Featured Projects' : "Projects I've Created"}
        </h2>
      </div>

      <div className={styles.featuredGrid}>
        {displayProjects.map((project) => (
          <div 
            key={project.title} 
            className={`${styles.featuredCard} anim-project-layout`}
            style={{ '--project-accent': project.accent, '--project-glow': project.glow }}
          >
            <div className={styles.featuredImageWrapper}>
              <img src={project.image} alt={project.title} className={styles.featuredImage} />
              <span className={styles.featuredBadge} style={{ color: project.accent }}>{project.category}</span>
            </div>
            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>{project.title}</h3>
              <p className={styles.featuredTagline} style={{ color: project.accent }}>{project.tagline}</p>
              <p className={styles.featuredDesc}>{project.description}</p>
              
              <div className={styles.featuredTechList}>
                {Object.values(project.tech).flat().slice(0, 3).map(t => (
                  <span key={t} className={styles.miniBadge}>{t}</span>
                ))}
              </div>

              <div className={styles.featuredCTAs}>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.btnPrimaryMini}>
                  <span>Live Preview</span>
                </a>
                <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className={styles.btnSecondaryMini}>
                  <span>Source</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {featured && (
        <div className={styles.ctaFooter}>
          <a href="/projects" className={styles.btnSecondary}>
            <span>See More Projects</span>
          </a>
        </div>
      )}
    </section>
  );
};

export default Projects;
