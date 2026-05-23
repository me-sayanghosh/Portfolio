import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Star, Award, Medal, Sparkles } from 'lucide-react';
import styles from './Achievements.module.css';
import MSCSCImg from '../assets/AchiveJISTECH.jpg';
import Hackfest from '../assets/Hackfest.jpeg';
import OpenSource from '../assets/OpenSource.jpeg';

gsap.registerPlugin(ScrollTrigger);

// Custom helper wrapper component for 3D cursor-tracking card
const AchievementCard = ({ item, index }) => {
  const cardRef = useRef(null);

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

  return (
    <div 
      className={`glassy-item anim-achievement-card ${styles.tiltWrapper}`}
      style={{ '--ach-accent': item.accent, '--ach-glow': item.glow }}
    >
      <div 
        className={styles.achievementCard3d}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.imageOverlayContainer}>
          <img src={item.image} alt={item.title} className={styles.image} />
          <div className={styles.cardGlare} />
          <div className={styles.metaOverlay}>
            <span className={styles.milestoneTag}>{item.milestone}</span>
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <div className={styles.iconBox}>
              {item.icon}
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
          </div>
          <p className={styles.cardDescription}>{item.description}</p>
        </div>
      </div>
    </div>
  );
};

const Achievements = () => {
  const container = useRef(null);

  const achievements = [
    {
      title: "JISTECH 2025 Winner",
      milestone: "2ND PLACE PODIUM",
      description: "Secured 2nd place in the prestigious JISTECH 2025 technical hackfest for developing an innovative platform resolving real-world societal friction.",
      image: MSCSCImg,
      icon: <Trophy size={18} />,
      accent: '#ffd700', // Gold glow
      glow: 'rgba(255, 215, 0, 0.18)'
    },
    {
      title: "Hackfest Top Finalist",
      milestone: "TOP 5 SEED",
      description: "Selected as a Top 5 national finalist out of 60 competing engineering teams at the GeeksforGeeks Kolkata Hackfest 2k26.",
      image: Hackfest,
      icon: <Star size={18} />,
      accent: '#f15a24', // Orange/Fiery glow
      glow: 'rgba(241, 90, 36, 0.18)'
    },
    {
      title: "Open Source Contributor",
      milestone: "NEXFELLOW FELLOWSHIP",
      description: "Acknowledged for significant pull requests, core layout additions, and plug-in optimizations across major open-source frameworks at NexFellow.",
      image: OpenSource,
      icon: <Award size={18} />,
      accent: '#8a2be2', // Violet glow
      glow: 'rgba(138, 43, 226, 0.18)'
    },
    {
      title: "UI/UX Design Laurels",
      milestone: "COMMUNITY CHOICE AWARD",
      description: "Awarded community choice award for creating and publishing an extremely fluid, accessible, and high-fidelity glassmorphism interface system.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
      icon: <Medal size={18} />,
      accent: '#00f2fe', // Sky Blue/Cyan glow
      glow: 'rgba(0, 242, 254, 0.18)'
    }
  ];

  // GSAP scroll trigger for achievements stagger entries
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-achievement-header', {
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

      gsap.fromTo('.anim-achievement-card', {
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

  return (
    <section id="achievements" className={styles.sectionPadding} ref={container}>
      <div className={styles.header}>
        <span className={`${styles.pretitle} anim-achievement-header`}>HONORS & MILESTONES</span>
        <h2 className={`${styles.heading} anim-achievement-header`}>My Achievements</h2>
        <p className={`${styles.subtitle} anim-achievement-header`}>
          A historical showcase of engineering milestones, awards, and significant community contributions.
        </p>
      </div>
      
      <div className={styles.grid}>
        {achievements.map((item, index) => (
          <AchievementCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
