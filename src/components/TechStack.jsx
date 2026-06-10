import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Laptop, Database, Cloud } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiWordpress,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiPython,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiPostman,
  SiLinux,
  SiFigma
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import styles from './TechStack.module.css';

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const container = useRef(null);

  const stack = [
    {
      category: 'Frontend Development',
      icon: <Laptop size={18} />,
      items: [
        {
          name: 'React.js',
          color: '#61DAFB',
          glow: 'rgba(97, 218, 251, 0.15)',
          IconComponent: SiReact
        },
        {
          name: 'Next.js',
          color: '#ffffff',
          glow: 'rgba(255, 255, 255, 0.15)',
          IconComponent: SiNextdotjs
        },
        {
          name: 'TypeScript',
          color: '#3178C6',
          glow: 'rgba(49, 120, 198, 0.15)',
          IconComponent: SiTypescript
        },
        {
          name: 'JavaScript',
          color: '#F7DF1E',
          glow: 'rgba(247, 223, 30, 0.15)',
          IconComponent: SiJavascript
        },
        {
          name: 'Tailwind CSS',
          color: '#06B6D4',
          glow: 'rgba(6, 182, 212, 0.15)',
          IconComponent: SiTailwindcss
        },
        {
          name: 'WordPress',
          color: '#21759b',
          glow: 'rgba(33, 117, 155, 0.15)',
          IconComponent: SiWordpress
        }
      ]
    },
    {
      category: 'Backend Architecture',
      icon: <Terminal size={18} />,
      items: [
        {
          name: 'Node.js',
          color: '#339933',
          glow: 'rgba(51, 153, 51, 0.15)',
          IconComponent: SiNodedotjs
        },
        {
          name: 'Express',
          color: 'var(--text-primary)',
          glow: 'var(--text-primary-glow)',
          IconComponent: SiExpress
        },
        {
          name: 'FastAPI',
          color: '#059669',
          glow: 'rgba(5, 150, 105, 0.15)',
          IconComponent: SiFastapi
        },
        {
          name: 'Python',
          color: '#3776AB',
          glow: 'rgba(55, 118, 171, 0.15)',
          IconComponent: SiPython
        }
      ]
    },
    {
      category: 'Databases & Storage',
      icon: <Database size={18} />,
      items: [
        {
          name: 'MongoDB',
          color: '#47A248',
          glow: 'rgba(71, 162, 72, 0.15)',
          IconComponent: SiMongodb
        },
        {
          name: 'PostgreSQL',
          color: '#4169E1',
          glow: 'rgba(65, 105, 225, 0.15)',
          IconComponent: SiPostgresql
        },
        {
          name: 'MySQL',
          color: '#4479A1',
          glow: 'rgba(68, 121, 161, 0.15)',
          IconComponent: SiMysql
        },
        {
          name: 'Redis',
          color: '#DC382D',
          glow: 'rgba(220, 56, 45, 0.15)',
          IconComponent: SiRedis
        },
        {
          name: 'Firebase',
          color: '#FFCA28',
          glow: 'rgba(255, 202, 40, 0.15)',
          IconComponent: SiFirebase
        }
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: <Cloud size={18} />,
      items: [
        {
          name: 'AWS',
          color: '#FF9900',
          glow: 'rgba(255, 153, 0, 0.15)',
          IconComponent: FaAws
        },
        {
          name: 'Docker',
          color: '#2496ED',
          glow: 'rgba(36, 150, 237, 0.15)',
          IconComponent: SiDocker
        },
        {
          name: 'Git',
          color: '#F05032',
          glow: 'rgba(240, 80, 50, 0.15)',
          IconComponent: SiGit
        },
        {
          name: 'GitHub',
          color: '#ffffff',
          glow: 'rgba(255, 255, 255, 0.12)',
          IconComponent: SiGithub
        },
        {
          name: 'Vercel',
          color: '#ffffff',
          glow: 'rgba(255, 255, 255, 0.12)',
          IconComponent: SiVercel
        },
        {
          name: 'Linux',
          color: '#FCC624',
          glow: 'rgba(252, 198, 36, 0.15)',
          IconComponent: SiLinux
        },
        {
          name: 'Postman',
          color: '#FF6C37',
          glow: 'rgba(255, 108, 55, 0.15)',
          IconComponent: SiPostman
        },
        {
          name: 'Figma',
          color: '#F24E1E',
          glow: 'rgba(242, 78, 30, 0.15)',
          IconComponent: SiFigma
        }
      ]
    }
  ];

  // Entry GSAP ScrollTrigger animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-stack-header', {
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
        ease: 'power4.out',
        stagger: 0.1
      });

      gsap.fromTo('.anim-stack-card', {
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
        stagger: 0.12
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="techstack" className="section-padding" ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-stack-header`}>ENGINE ROOM</span>
        <h2 className={`${styles.heading} anim-stack-header`}>My Technical Stack</h2>
      </div>

      <div className={styles.stackGrid}>
        {stack.map((cat) => (
          <div key={cat.category} className={`${styles.categoryCard} anim-stack-card`}>
            <div className={styles.cardHeader}>
              <span className={styles.headerIcon}>{cat.icon}</span>
              <h3 className={styles.categoryTitle}>{cat.category}</h3>
            </div>

            <div className={styles.itemsGrid}>
              {cat.items.map((item) => (
                <div 
                  key={item.name} 
                  className={styles.stackItem}
                  style={{ '--brand-color': item.color, '--brand-glow': item.glow }}
                >
                  <div className={styles.logoContainer}>
                    <item.IconComponent size={24} />
                  </div>
                  <span className={styles.itemName}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
