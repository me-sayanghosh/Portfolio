import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './FAQ.module.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.item} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.question}>
        <h4>{question}</h4>
        {isOpen ? <Minus size={20} className="anim-pulse" /> : <Plus size={20} className="anim-spin-slow" />}
      </div>
      {isOpen && (
        <div className={styles.answer}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const leftQuestions = [
    {
      question: 'Who are you, and what do you do?',
      answer: 'I am a passionate software developer specializing in building exceptional digital experiences. I focus on modern web technologies to create scalable and engaging applications.'
    },
    {
      question: 'What technologies do you work with?',
      answer: 'My primary stack includes React, Node.js, JavaScript/TypeScript, and modern CSS frameworks. I also work with databases like MongoDB and PostgreSQL, and various cloud services.'
    },
    {
      question: 'Can you redesign an existing website?',
      answer: 'Absolutely! I can take your current website and give it a modern, responsive redesign while improving performance and user experience.'
    }
  ];

  const rightQuestions = [
    {
      question: 'What services do you provide?',
      answer: 'I offer full-stack web development, frontend UI/UX implementation, performance optimization, and custom web application architecture.'
    },
    {
      question: 'How do you approach a new project?',
      answer: 'I start with a comprehensive discussion to understand your goals, followed by wireframing, technical planning, iterative development, and finally, deployment and testing.'
    },
    {
      question: 'How can I collaborate with you on a project?',
      answer: 'Simply reach out via the contact form or send me an email. We can schedule a brief introductory call to discuss your ideas and how I can help bring them to life.'
    }
  ];

  return (
    <section id="faqs" className={`section-padding ${styles.faqSection}`}>
      <h2 className={styles.heading}>Frequently Asked<br/>Questions</h2>
      
      <div className={styles.grid}>
        <div className={styles.column}>
          {leftQuestions.map((q, idx) => (
            <FAQItem key={`left-${idx}`} question={q.question} answer={q.answer} />
          ))}
        </div>
        <div className={styles.column}>
          {rightQuestions.map((q, idx) => (
            <FAQItem key={`right-${idx}`} question={q.question} answer={q.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
