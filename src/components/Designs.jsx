import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './Designs.module.css';

const Designs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Checkout',
      description: 'This page is designed for checking out your products bought from Astro Mart which, a high quality e-commerce website for delivering fresh and high quality products.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Admin Panel',
      description: 'The MSCSC Admin Panel streamlines website management, enabling efficient updates to events and content. A simple and user-friendly tool for the team to keep the site dynamic.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Analytics Dashboard',
      description: 'A comprehensive analytics dashboard for tracking user engagement, traffic sources, and conversion rates across the platform in real-time.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="designs" className="section-padding">
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h2 className={styles.heading}>Creative Designs Made for<br/>My Clients</h2>
          <div className={styles.indicator}>{currentSlide + 1}/{slides.length}</div>
        </div>
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={prevSlide}><ArrowLeft size={20} /></button>
          <button className={styles.arrowBtn} onClick={nextSlide}><ArrowRight size={20} /></button>
        </div>
      </div>

      <div className={styles.carouselContainer}>
        <div 
          className={styles.carouselTrack} 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.imageContainer}>
                <img src={slide.image} alt={slide.title} className={styles.image} />
              </div>
              <h3 className={styles.slideTitle}>{slide.title}</h3>
              <p className={styles.slideDesc}>{slide.description}</p>
              <a href="#" className={styles.learnMore}>Learn more &rarr;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Designs;
