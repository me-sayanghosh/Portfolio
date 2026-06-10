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
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              <g transform="translate(12, 12)">
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
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M18.665 21.978c-.254-.15-.494-.325-.72-.519L10.3 12.8v5.6h-1.6V5.6h1.6l8.84 10.158c.243-.25.46-.516.653-.8.643-1.077.922-2.324.922-3.558 0-3.76-3.04-6.8-6.8-6.8a6.764 6.764 0 0 0-6.8 6.8c0 3.76 3.04 6.8 6.8 6.8a6.711 6.711 0 0 0 3.558-.922c.13-.037.25-.082.376-.145zM12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0z"/>
            </svg>
          )
        },
        {
          name: 'JavaScript',
          color: '#F7DF1E',
          glow: 'rgba(247, 223, 30, 0.15)',
          svg: (
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M12 15.122c0 1.096-.593 1.878-1.748 1.878-.97 0-1.57-.45-1.812-1.097l1.178-.698c.176.368.424.636.732.636.425 0 .65-.298.65-.929v-5.694h1.002v5.904zM17.842 16.03c0 1.085-.85 1.97-2.146 1.97-1.272 0-2.029-.687-2.316-1.38l1.189-.687c.18.393.479.807.999.807.509 0 .913-.27.913-.77 0-.52-.393-.71-.976-.962l-.468-.202c-.892-.382-1.486-.87-1.486-1.89 0-.987.807-1.804 1.975-1.804 1.05 0 1.762.51 2.028 1.125l-1.125.65c-.176-.328-.425-.515-.827-.515-.403 0-.743.234-.743.646 0 .445.31.62.839.847l.469.2c1.071.464 1.699.92 1.699 1.961z"/>
            </svg>
          )
        },
        {
          name: 'CSS Modules',
          color: '#264de4',
          glow: 'rgba(38, 77, 228, 0.15)',
          svg: (
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3H3v18h3" />
              <path d="M18 3h3v18h-3" />
              <rect x="8" y="8" width="5" height="5" rx="1" />
              <rect x="11" y="11" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
            </svg>
          )
        },
        {
          name: 'WordPress',
          color: '#21759b',
          glow: 'rgba(33, 117, 155, 0.15)',
          svg: (
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365a8.91 8.91 0 0 0 2.821-.453l-2.663-7.752zm-3.665.412l-2.4 6.985A8.956 8.956 0 0 1 3 12c0-1.895.587-3.655 1.583-5.105l3.91 10.722v.001c.247.632.483.98.81.98.11 0 .23-.024.36-.073.34-.127.53-.418.53-.787 0-.308-.184-.813-.39-1.428l-1.3-3.815zM20.15 6.78a8.94 8.94 0 0 1 .85 3.82c0 2.213-.8 4.24-2.127 5.82l-2.73-8.232c1.472-.057 2.66-.085 2.66-.085.92-.028.92-1.378 0-1.35 0 0-1.294.085-2.822.085-.826 0-1.748-.028-2.673-.085-.92-.028-.92 1.322 0 1.35 0 0 1.05.028 1.94.057l1.792 5.37-2.748 8.243-3.955-11.834c.732-.029 1.4-.057 1.4-.057.922-.028.922-1.378 0-1.35 0 0-1.127.085-2.523.085-.436 0-.916-.01-1.423-.028C7.575 3.513 9.682 3 12 3c3.064 0 5.82 1.533 7.502 3.896l-.002-.006c.038.064.072.13.107.195a8.88 8.88 0 0 1 .543.695zm-8.293 4.887c0 .127.01.25.027.367l1.326 3.876 1.355-3.96a2.15 2.15 0 0 0 .022-.283c0-.606-.412-1.04-.925-1.04-.53 0-.918.423-.918 1.04zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.2c-5.625 0-10.2-4.575-10.2-10.2S6.375 1.8 12 1.8s10.2 4.575 10.2 10.2-4.575 10.2-10.2 10.2z"/>
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
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M12 0L1.76 5.914v11.828L12 23.656l10.24-5.914V5.914L12 0zm7.68 15.656l-7.68 4.434-7.68-4.434V7.656l7.68-4.434 7.68 4.434v8zM12 5.172l5.12 2.956v5.912L12 17.004l-5.12-2.96V8.128L12 5.172z"/>
            </svg>
          )
        },
        {
          name: 'Express',
          color: 'var(--text-primary)',
          glow: 'var(--text-primary-glow)',
          svg: (
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="15" fontWeight="800" fill="currentColor" letterSpacing="-0.04em" fontFamily="system-ui, -apple-system, sans-serif">ex</text>
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
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M11.87 0c-4.47 0-4.19 1.93-4.19 1.93l.01 2.01h4.25c3.48 0 4.67 1.89 4.67 4.67v4.24s1.93.28 1.93-4.19c0-4.47-3.95-8.66-8.66-8.66v.01zm-3.66 3.66c-4.47 0-8.66 4.19-8.66 8.66 0 4.47 1.93 4.19 1.93 4.19l2.01-.01v-4.25c0-3.48 1.89-4.67 4.67-4.67h4.24s.28-1.93-4.19-1.93h.01zm.92 1.83a.915.915 0 0 1 .92.92c0 .5-.41.92-.92.92a.915.915 0 0 1-.92-.92c0-.5.41-.92.92-.92zm5.5 11.01c0 4.47-1.93 4.19-1.93 4.19l-2.01.01v-4.25c0 3.48-1.89 4.67-4.67 4.67H1.83s-.28 1.93 4.19 1.93c4.47 0 8.66-3.95 8.66-8.66v-.01c4.47 0 4.19-1.93 4.19-1.93l-.01-2.01h-4.25c-3.48 0-4.67-1.89-4.67-4.67V5.5s-1.93-.28-1.93 4.19c0 4.47 3.95 8.66 8.66 8.66v-.01zM14.81 18.5a.915.915 0 0 1-.92-.92c0-.5.41-.92.92-.92s.92.41.92.92a.915.915 0 0 1-.92.92z"/>
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
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M11.95 2C6.46 2 2 6.47 2 12s4.46 10 9.95 10c2.39 0 4.59-.85 6.32-2.27l-1.37-1.37A7.95 7.95 0 0 1 11.95 20c-4.42 0-8-3.58-8-8s3.58-8 8-8c2.93 0 5.51 1.58 6.93 3.93l1.43-1.43A9.96 9.96 0 0 0 11.95 2z" />
              <path d="M17.15 11.16c.36-.61.6-1.32.65-2.11-.06-.09-.13-.18-.2-.26-.23-.28-.53-.49-.87-.63l-.06-.02c-.75-.27-1.54-.42-2.34-.43-.75-.01-1.5.09-2.22.3-.23.07-.46.16-.68.27-.18.05-.36.1-.55.15-1.02.29-2.06.91-2.86 1.78-.7.76-1.21 1.7-1.52 2.76-.23.78-.32 1.6-.28 2.42.02.48.08.96.18 1.43.14.67.38 1.32.72 1.92l.02.04c.6.9 1.46 1.58 2.5 1.93v-2.09c0-1.65 1.35-3 3-3h.97l2.67 7.75c1.33-1.58 2.13-3.61 2.13-5.82 0-2.32-.88-4.43-2.32-6z" />
            </svg>
          )
        },
        {
          name: 'Git',
          color: '#F05032',
          glow: 'rgba(240, 80, 50, 0.15)',
          svg: (
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.708 2.624l3.136 3.136c.668-.225 1.428-.073 1.954.453.54.54.673 1.336.417 1.996l3.14 3.14c.66-.257 1.456-.124 1.996.417.654.654.654 1.714 0 2.368a1.683 1.683 0 0 1-2.368 0c-.54-.54-.673-1.336-.417-1.996L13.38 8.998c-.225.668-.073 1.428.453 1.954.54.54 1.336.673 1.996.417l3.14 3.14c-.257.66-.124 1.456.417 1.996.654.654 1.714.654 2.368 0a1.683 1.683 0 0 1 0-2.368zm-12.06 1.411a1.68 1.68 0 0 1-2.368 0c-.654-.654-.654-1.714 0-2.368a1.68 1.68 0 0 1 2.368 0 .84.84 0 0 0 1.184-1.184 3.36 3.36 0 1 0-4.736 4.736 1.68 1.68 0 0 1 2.368 0 .84.84 0 0 0 1.184-1.184z"/>
            </svg>
          )
        },
        {
          name: 'Figma',
          color: '#F24E1E',
          glow: 'rgba(242, 78, 30, 0.15)',
          svg: (
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-4 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-4H8zm0-10C5.79 4 4 5.79 4 8s1.79 4 4 4h4V4H8zm8 8c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4zm-4 2c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4h-4v4z"/>
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
