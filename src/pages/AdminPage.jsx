import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if session token exists in sessionStorage
    const authSession = sessionStorage.getItem('sayan_portfolio_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('sayan_portfolio_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sayan_portfolio_admin_auth');
    setIsAuthenticated(false);
  };

  if (checking) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh', 
        color: 'var(--text-secondary)',
        fontFamily: 'monospace'
      }}>
        INITIALIZING AUTHENTICATION NODES...
      </div>
    );
  }

  return (
    <div className="subpage-container" style={{ paddingTop: '6rem', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {isAuthenticated ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
