import React from 'react';
import { Monitor, Server, Paintbrush, Zap } from 'lucide-react';
import styles from './Services.module.css';

const Services = () => {
  const services = [
    {
      icon: <Monitor size={24} className="anim-pulse" />,
      title: 'Front-End Dev',
      description: 'Bringing designs to life with clean, efficient, and optimized code. I build responsive, interactive, and user-friendly web applications using the latest front-end technologies like React.'
    },
    {
      icon: <Server size={24} className="anim-float" />,
      title: 'Back-End Dev',
      description: 'I develop robust server-side applications that power dynamic and data-driven websites. From API creation to database management, I ensure your web apps run smoothly and efficiently.'
    },
    {
      icon: <Paintbrush size={24} className="anim-wiggle" />,
      title: 'UI/UX Design',
      description: 'I design intuitive and visually compelling user interfaces that enhance engagement. My approach focuses on user behavior, accessibility, and aesthetics to deliver a polished digital experience.'
    },
    {
      icon: <Zap size={24} className="anim-bounce" />,
      title: 'Performance Optimization',
      description: 'Slow websites lose visitors! I enhance website performance with code optimization, caching strategies, and SEO improvements, ensuring fast load times and a smooth user experience.'
    }
  ];

  return (
    <section id="services" className={`section-padding ${styles.servicesSection}`}>
      <div className={styles.grid}>
        <div className={styles.introInfo}>
          <h2 className={styles.heading}>My Skills</h2>
          <p className={styles.description}>
            Explore my range of services designed to go beyond aesthetics. I craft visually appealing and fully functional websites tailored to your business needs.
          </p>
        </div>
        
        <div className={styles.serviceList}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceItem}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
