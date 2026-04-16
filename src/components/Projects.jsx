import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';
import PrepDostImg from '../assets/PrepDost.png';
import VerifAiImg from '../assets/VerifAi.png';
import ApnaChatImg from '../assets/ApnaChat.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const container = useRef();

  const projects = [
    {
      title: 'PrepDost',
      description: 'A full-stack platform built with React.js and Node.js for PrepDost, enabling interactive mock interviews, secure authentication, and performance insights to enhance career preparation and boost interview confidence.',
      image: PrepDostImg
    },
    {
      title: 'VerifAi',
      description: 'A beautiful and accurate weather application providing real-time forecasts, radar maps, and severe weather alerts.',
      image: VerifAiImg
    },
    {
      title: 'ApnaChat',
      description: 'Event landing page for an astronomy festival with ticket booking and schedule features.',
      image: ApnaChatImg
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-project-header', {
        y: 30,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.fromTo('.anim-project-item', {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
      
      gsap.fromTo('.anim-project-preview', {
        scale: 0.95,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        },
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding" ref={container}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <h2 className={`${styles.heading} anim-project-header`}>Projects I've Created</h2>
          
          <div className={styles.accordion}>
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`${styles.item} anim-project-item ${activeProject === index ? styles.active : ''}`}
                onClick={() => setActiveProject(index)}
              >
                <h3 className={styles.itemTitle}>{project.title}</h3>
                {activeProject === index && (
                  <div className={styles.itemBody}>
                    <p>{project.description}</p>
                    <a href="#" className={styles.learnMore}>Learn more &rarr;</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className={`${styles.preview} anim-project-preview`}>
          <div className={styles.imageWrapper}>
            <img 
              src={projects[activeProject].image} 
              alt={projects[activeProject].title} 
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
