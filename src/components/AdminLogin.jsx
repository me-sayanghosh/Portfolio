import React, { useState, useEffect } from 'react';
import { Terminal, Lock, ShieldAlert, Sparkles } from 'lucide-react';
import styles from './AdminLogin.module.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  const fullTitle = 'SECURE_PORTAL_CONNECTION_ESTABLISHED...';

  // Typewriter title effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypewriterText((prev) => prev + fullTitle.charAt(index));
      index++;
      if (index >= fullTitle.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setShake(false);
    setLoading(true);

    setTimeout(() => {
      // Get the stored password or fall back to default 'sayan123'
      const storedPass = localStorage.getItem('sayan_admin_password') || 'sayan123';
      
      if (password === storedPass) {
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError(true);
        setShake(true);
        setPassword('');
        setTimeout(() => setShake(false), 500);
      }
    }, 800);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.glowCircle} />
      
      <div className={`${styles.terminalCard} ${shake ? styles.shake : ''}`}>
        <div className={styles.terminalHeader}>
          <div className={styles.dots}>
            <span className={styles.redDot} />
            <span className={styles.yellowDot} />
            <span className={styles.greenDot} />
          </div>
          <div className={styles.title}>
            <Terminal size={12} className={styles.terminalIcon} />
            <span>ADMIN_AUTH.SYS</span>
          </div>
        </div>

        <div className={styles.terminalBody}>
          <div className={styles.typewriterContainer}>
            <span className={styles.prompt}>sayan@portfolio:~#</span>
            <span className={styles.typewriter}>{typewriterText}</span>
            <span className={styles.cursor}>_</span>
          </div>

          <p className={styles.instructions}>
            Provide the master administrator access key below to initialize full dashboard synchronization controls.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <Lock size={16} className={styles.lockIcon} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ENTER ACCESS KEY"
                  className={styles.input}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className={styles.errorAlert}>
                <ShieldAlert size={16} className={styles.errorIcon} />
                <span>ACCESS KEY UNVERIFIED. ACCESS DENIED.</span>
              </div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'SYNCHRONIZING...' : 'ESTABLISH LINK'}
            </button>
          </form>
        </div>

        <div className={styles.terminalFooter}>
          <div className={styles.statusGroup}>
            <Sparkles size={11} className={styles.footerIcon} />
            <span>PORTAL: SECURED</span>
          </div>
          <span className={styles.version}>v2.0.4-dev</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
