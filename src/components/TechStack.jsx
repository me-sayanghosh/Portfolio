import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Terminal, Laptop, Database } from 'lucide-react';
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
          svg: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
              <g stroke="currentColor">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
          )
        },
        {
          name: 'Next.js',
          color: '#ffffff',
          glow: 'rgba(255, 255, 255, 0.15)',
          svg: (
            <svg viewBox="0 0 180 180" width="100%" height="100%" fill="none" stroke="currentColor">
              <mask id="next-mask">
                <circle cx="90" cy="90" r="90" fill="white" />
              </mask>
              <circle cx="90" cy="90" r="88" stroke="currentColor" strokeWidth="4" />
              <g mask="url(#next-mask)">
                <path d="M149 155L80.6 67.8H67.8V112.2H76.7V80.3L139.3 160.2C142.7 158.6 146 156.8 149 155Z" fill="currentColor" stroke="none" />
                <path d="M115.2 67.8H124.1V112.2H115.2V67.8Z" fill="currentColor" stroke="none" />
              </g>
            </svg>
          )
        },
        {
          name: 'JavaScript',
          color: '#F7DF1E',
          glow: 'rgba(247, 223, 30, 0.15)',
          svg: (
            <svg viewBox="0 0 630 630" width="100%" height="100%" fill="currentColor">
              <rect width="630" height="630" fill="none"/>
              <path d="m424.4 513.7c11.5 21.8 28.5 38.3 54.4 38.3 24.3 0 40.2-12.1 40.2-28.9 0-20-15.7-27.2-41.7-38.3l-14.5-6.4c-42.6-18.3-71-41.3-71-89.4 0-46.8 35.8-82.6 89.4-82.6 47.7 0 76.2 22.1 94.1 55.3l-45.1 28.9c-10.2-18.7-23.4-26.8-46.8-26.8-20.9 0-32.8 11.1-32.8 25.5 0 17.4 11.5 24.3 35.3 34.5l14.5 6.4c52.4 22.6 78.3 43 78.3 93.2 0 57.5-44.3 88.5-98.7 88.5-59.6 0-97.9-29.8-111-64.7z" stroke="none"/>
              <path d="m202 513.7c11.5 21.8 28.5 38.3 54.4 38.3 24.3 0 40.2-12.1 40.2-28.9 0-20-15.7-27.2-41.7-38.3l-14.5-6.4c-42.6-18.3-71-41.3-71-89.4 0-46.8 35.8-82.6 89.4-82.6 47.7 0 76.2 22.1 94.1 55.3l-45.1 28.9c-10.2-18.7-23.4-26.8-46.8-26.8-20.9 0-32.8 11.1-32.8 25.5 0 17.4 11.5 24.3 35.3 34.5l14.5 6.4c52.4 22.6 78.3 43 78.3 93.2 0 57.5-44.3 88.5-98.7 88.5-59.6 0-97.9-29.8-111-64.7z" transform="translate(-160, -110)" stroke="none"/>
              <rect x="250" y="288" width="50" height="250" stroke="none"/>
            </svg>
          )
        },
        {
          name: 'CSS Modules',
          color: '#264de4',
          glow: 'rgba(38, 77, 228, 0.15)',
          svg: (
            <svg viewBox="0 0 512 512" width="100%" height="100%" fill="currentColor">
              <path d="M105.2 24.9L82.1 487.1 256 535.1l173.9-48 23.1-462.2H105.2zm282.8 126.3H181.7l-4.7 53.4h206.1l-18.8 206.1L256 441.7l-108.3-30.1-6.6-86.7h53.4l3.8 40 51.1 14.1 51.1-14.1 8-100H150.9L139.6 151.2h260.4l-12 126.3z" stroke="none"/>
            </svg>
          )
        },
        {
          name: 'WordPress',
          color: '#21759b',
          glow: 'rgba(33, 117, 155, 0.15)',
          svg: (
            <svg viewBox="0 0 512 512" width="100%" height="100%" fill="currentColor">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-15.1 411.3l-61.9-170.8c22.5-.9 39-.9 39-.9 11.2 0 10.3 15 0 15 0 0-14.1.9-29 .9l58.1 161.2 38-115.3-25.3-68.4c-11.2 0-21.6.9-21.6.9-10.3 0-11.2-15 0-15 0 0 14.1.9 31 .9 11.2 0 21.6-.9 21.6-.9-10.3 0-11.2-15 0-15 0 0 11.2.9 24.4.9 14.1 0 27.2-.9 27.2-.9-10.3 0-11.2 15 0 15 0 0-8.4.9-18.7.9l21.6 59.1 21.6-64.7c-7.5 0-14.1.9-14.1.9-10.3 0-11.2-15 0-15 0 0 11.2.9 25.3.9 11.2 0 21.6-.9 21.6-.9-10.3 0-11.2 15 0 15 0 0-10.3.9-20.6.9L307.3 416l-66.4-192.2-66.4 192.2v-4.7z" stroke="none" />
            </svg>
          )
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
          svg: (
            <svg viewBox="0 0 256 288" width="100%" height="100%" fill="currentColor">
              <path d="M128 0L32 55.4v110.8l96 55.4 96-55.4V55.4L128 0zm79 155.2l-79 45.6-79-45.6V64.6l79-45.6 79 45.6v90.6z" stroke="none"/>
              <path d="M128 36.8L64 73.7v73.7l64 36.8 64-36.8V73.7l-64-36.8z" fill="none" stroke="currentColor" strokeWidth="6"/>
            </svg>
          )
        },
        {
          name: 'Express',
          color: '#ffffff',
          glow: 'rgba(255, 255, 255, 0.15)',
          svg: (
            <svg viewBox="0 0 256 128" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="6">
              <text x="10" y="85" fontSize="72" fontWeight="bold" fill="currentColor" fontFamily="monospace">ex.</text>
            </svg>
          )
        },
        {
          name: 'FastAPI',
          color: '#059669',
          glow: 'rgba(5, 150, 105, 0.15)',
          svg: (
            <svg viewBox="0 0 256 256" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M128 20L40 70v116l88 50 88-50V70L128 20z" strokeWidth="16" />
              <path d="M128 60l-48 78h40v58l48-78h-40V60z" fill="currentColor" stroke="none" />
            </svg>
          )
        },
        {
          name: 'Python',
          color: '#3776AB',
          glow: 'rgba(55, 118, 171, 0.15)',
          svg: (
            <svg viewBox="0 0 110 110" width="100%" height="100%" fill="currentColor">
              <path d="M55.8 0C25 0 26.9 13.3 26.9 13.3l.1 13.7h28.9v4.1H17.2C4.9 31.1 0 39.5 0 54.2c0 14.8 10.9 22.8 22.5 22.8h13.4v-19c0-15.1 12.3-26.9 27.4-26.9h26.4c5.1 0 10.3-4.1 10.3-15V23C100 8.3 86.6 0 55.8 0zm-20.9 8.2c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1z" stroke="none"/>
              <path d="M54.2 110c30.8 0 28.9-13.3 28.9-13.3l-.1-13.7H54.1v-4.1h38.7c12.3 0 17.2-8.4 17.2-23.1 0-14.8-10.9-22.8-22.5-22.8H74.1v19c0 15.1-12.3 26.9-27.4 26.9H20.3c-5.1 0-10.3 4.1-10.3 15v13.1c0 14.7 13.4 23 44.2 23zm20.9-8.2c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1z" stroke="none"/>
            </svg>
          )
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
          svg: (
            <svg viewBox="0 0 128 256" width="100%" height="100%" fill="currentColor">
              <path d="M64 0c0 0-46 54-46 116 0 54 36 94 46 108V0zm0 0c0 0 46 54 46 116 0 54-36 94-46 108V0zm0 226c-1 0-21-4-28-20 6 10 19 22 28 26v-6zm0 0c1 0 21-4 28-20-6 10-19 22-28 26v-6z" stroke="none" />
            </svg>
          )
        },
        {
          name: 'MySQL',
          color: '#4479A1',
          glow: 'rgba(68, 121, 161, 0.15)',
          svg: (
            <svg viewBox="0 0 256 256" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="4">
              <circle cx="128" cy="128" r="90" strokeWidth="12" />
              <text x="75" y="155" fontSize="90" fontWeight="bold" fill="currentColor" fontFamily="serif">DB</text>
            </svg>
          )
        },
        {
          name: 'Git',
          color: '#F05032',
          glow: 'rgba(240, 80, 50, 0.15)',
          svg: (
            <svg viewBox="0 0 512 512" width="100%" height="100%" fill="currentColor">
              <path d="M470.9 9.4c-12.5-12.5-32.8-12.5-45.3 0L294.7 140.2c-3.5-3.5-7.8-6.3-12.5-8.2l-34-13.6c-11-4.4-23.2-4.4-34.2 0l-34 13.6c-4.7 1.9-9 4.7-12.5 8.2L36.7 270.9c-12.5 12.5-12.5 32.8 0 45.3l159.1 159.1c12.5 12.5 32.8 12.5 45.3 0L371.9 344.5c3.5-3.5 6.3-7.8 8.2-12.5l13.6-34c4.4-11 4.4-23.2 0-34.2l-13.6-34c-1.9-4.7-4.7-9-8.2-12.5L470.9 54.7c12.5-12.5 12.5-32.8 0-45.3zM256 384c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" stroke="none" />
            </svg>
          )
        },
        {
          name: 'Figma',
          color: '#F24E1E',
          glow: 'rgba(242, 78, 30, 0.15)',
          svg: (
            <svg viewBox="0 0 137 205" width="100%" height="100%" fill="currentColor">
              <path d="M34.2 205c18.9 0 34.2-15.3 34.2-34.2v-34.2H34.2C15.3 136.6 0 151.9 0 170.8s15.3 34.2 34.2 34.2z" stroke="none"/>
              <path d="M0 102.4c0-18.9 15.3-34.2 34.2-34.2h34.2v68.4H34.2C15.3 136.6 0 121.3 0 102.4z" stroke="none"/>
              <path d="M0 34.2C0 15.3 15.3 0 34.2 0h34.2v68.4H34.2C15.3 68.4 0 53.1 0 34.2z" stroke="none"/>
              <path d="M68.4 0h34.2c18.9 0 34.2 15.3 34.2 34.2s-15.3 34.2-34.2 34.2H68.4V0z" stroke="none"/>
              <path d="M136.8 102.4c0 18.9-15.3 34.2-34.2 34.2H68.4V68.2h34.2c18.9 0 34.2 15.3 34.2 34.2z" stroke="none"/>
            </svg>
          )
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
                    {item.svg}
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
