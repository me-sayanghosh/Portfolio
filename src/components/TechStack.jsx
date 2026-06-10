import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Laptop, Database } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiCssmodules,
  SiWordpress,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiPython,
  SiMongodb,
  SiMysql,
  SiGit,
  SiFigma
} from 'react-icons/si';
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
          name: 'JavaScript',
          color: '#F7DF1E',
          glow: 'rgba(247, 223, 30, 0.15)',
          IconComponent: SiJavascript
        },
        {
          name: 'CSS Modules',
          color: '#264de4',
          glow: 'rgba(38, 77, 228, 0.15)',
          IconComponent: SiCssmodules
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
      category: 'Databases & Tools',
      icon: <Database size={18} />,
      items: [
        {
          name: 'MongoDB',
          color: '#47A248',
          glow: 'rgba(71, 162, 72, 0.15)',
          IconComponent: SiMongodb
        },
        {
          name: 'MySQL',
          color: '#4479A1',
          glow: 'rgba(68, 121, 161, 0.15)',
          IconComponent: SiMysql
        },
        {
          name: 'Git',
          color: '#F05032',
          glow: 'rgba(240, 80, 50, 0.15)',
          IconComponent: SiGit
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
