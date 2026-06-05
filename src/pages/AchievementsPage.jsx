import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Achievements from '../components/Achievements';

const AchievementsPage = () => {
  return (
    <div className="subpage-container" style={{ paddingTop: '6rem', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="subpage-header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem 2rem' }}>
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-secondary)', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      <Achievements featured={false} />
    </div>
  );
};

export default AchievementsPage;
