import React from 'react';
import styles from './Achievements.module.css';
import { Trophy, Star, Award, Medal } from 'lucide-react';
import MSCSCImg from '../assets/AchiveJISTECH.jpg';
import Hackfest from '../assets/Hackfest.jpeg';
import OpenSource from '../assets/OpenSource.jpeg';

const Achievements = () => {
  const achievements = [
    {
      title: "JISTECH 2025",
      description: "Secured 2nd place in the JISTECH 2025 for developing an innovative solution that addresses real-world challenges.",
      image: MSCSCImg,
      icon: <Trophy size={20} className="anim-pulse" />
    },
    {
      title: "Hackfest Finalist",
      description: "Selected as a Top 5 finalist (out of 60 teams) at the GeeksforGeeks Kolkata Hackfest 2k26",
      image: Hackfest,
      icon: <Star size={20} className="anim-wiggle" />
    },
    {
      title: "Open Source Contributor",
      description: "Acknowledged for significant pull requests and plugin development in major open-source web frameworks At NexFellow.",
      image: OpenSource,
      icon: <Award size={20} className="anim-bounce" />
    },
    {
      title: "UI/UX Design Excellence",
      description: "Awarded community choice for creating the most fluid, responsive, and accessible glassmorphism design system.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
      icon: <Medal size={20} className="anim-float" />
    }
  ];

  return (
    <section id="achievements" className="section-padding">
      <div className="app-container">
        <div className={styles.header}>
          <h2 className={styles.heading}>My Achievements</h2>
          <p className={styles.subtitle}>
            A showcase of milestones, awards, and significant accomplishments throughout my career journey.
          </p>
        </div>
        
        <div className={styles.grid}>
          {achievements.map((item, index) => (
            <div key={index} className={`glassy-item ${styles.card}`}>
              <div className={styles.imageContainer}>
                <img src={item.image} alt={item.title} className={styles.image} />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
