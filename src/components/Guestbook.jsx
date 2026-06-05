import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Send, Sparkles, User, AlertCircle, Check } from 'lucide-react';
import styles from './Guestbook.module.css';

gsap.registerPlugin(ScrollTrigger);

const Guestbook = () => {
  const container = useRef(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const maxCharLimit = 160;

  // Pre-cached mock signatures
  const defaultSignatures = [
    {
      id: 1,
      name: 'Subhadip Saha',
      message: 'This portfolio is insane, Sayan! That interactive canvas grid in the background is incredibly clean. Keep building! 🚀',
      date: 'May 30, 2026',
      avatarColor: 'linear-gradient(135deg, #f15a24 0%, #ff723f 100%)'
    },
    {
      id: 2,
      name: 'Rohan Sharma',
      message: 'Clean UI and solid full-stack project blueprint selections. PrepDost is particularly interesting!',
      date: 'June 1, 2026',
      avatarColor: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      message: 'The blogs slide-in modal detail panel feels extremely premium! Flawless GSAP integration.',
      date: 'June 4, 2026',
      avatarColor: 'linear-gradient(135deg, #8a2be2 0%, #c084fc 100%)'
    }
  ];

  // Helper to generate a random dark/accent-themed gradient for user avatar
  const generateAvatarGradient = () => {
    const gradients = [
      'linear-gradient(135deg, #f15a24 0%, #ff8c5a 100%)', // Sayan Copper
      'linear-gradient(135deg, #2563eb 0%, #00d2ff 100%)', // Electric Blue
      'linear-gradient(135deg, #059669 0%, #34d399 100%)', // Emerald Green
      'linear-gradient(135deg, #8a2be2 0%, #e0aaff 100%)', // Purple Haze
      'linear-gradient(135deg, #db2777 0%, #f472b6 100%)', // Pink Rose
      'linear-gradient(135deg, #ea580c 0%, #facc15 100%)'  // Sunset Yellow
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  useEffect(() => {
    // Load existing signatures from localstorage or seed with default
    const stored = localStorage.getItem('sayan_guestbook_signatures');
    if (stored) {
      try {
        setSignatures(JSON.parse(stored));
      } catch (err) {
        setSignatures(defaultSignatures);
      }
    } else {
      setSignatures(defaultSignatures);
      localStorage.setItem('sayan_guestbook_signatures', JSON.stringify(defaultSignatures));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      setError('Please provide your name.');
      return;
    }
    if (!trimmedMsg) {
      setError('Please write a message.');
      return;
    }
    if (trimmedMsg.length > maxCharLimit) {
      setError(`Message must not exceed ${maxCharLimit} characters.`);
      return;
    }

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString('en-US', options);

    const newSignature = {
      id: Date.now(),
      name: trimmedName,
      message: trimmedMsg,
      date: dateFormatted,
      avatarColor: generateAvatarGradient()
    };

    const updated = [newSignature, ...signatures];
    setSignatures(updated);
    localStorage.setItem('sayan_guestbook_signatures', JSON.stringify(updated));

    // Clear form and set success state
    setName('');
    setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  // Entry GSAP ScrollTrigger animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-gb-header', {
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

      gsap.fromTo('.anim-gb-form', {
        x: -40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.fromTo('.anim-gb-list', {
        x: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out'
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="guestbook" className="section-padding" ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-gb-header`}>VISITOR LOG</span>
        <h2 className={`${styles.heading} anim-gb-header`}>Sign the Guestbook</h2>
      </div>

      <div className={styles.guestbookGrid}>
        {/* Left Column: Signature Form Card */}
        <div className={`${styles.formColumn} anim-gb-form`}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <Sparkles size={16} className={styles.headerIcon} />
              <h3 className={styles.formTitle}>Leave your mark</h3>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Your Name</label>
                <div className={styles.inputWrapper}>
                  <User size={14} className={styles.fieldIcon} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className={styles.input}
                    maxLength={40}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelLine}>
                  <label className={styles.label}>Your Message</label>
                  <span className={`${styles.charCount} ${message.length > maxCharLimit ? styles.charLimitExceeded : ''}`}>
                    {message.length}/{maxCharLimit}
                  </span>
                </div>
                <div className={styles.inputWrapper}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a friendly note..."
                    className={styles.textarea}
                    maxLength={200}
                    rows={4}
                  />
                </div>
              </div>

              {error && (
                <div className={styles.errorAlert}>
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className={styles.successAlert}>
                  <Check size={14} />
                  <span>Log signed successfully! Thank you.</span>
                </div>
              )}

              <button type="submit" className={styles.submitBtn}>
                <span>Sign Guestbook</span>
                <Send size={13} className={styles.sendIcon} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Signatures Scrollable Feed */}
        <div className={`${styles.listColumn} anim-gb-list`}>
          <div className={styles.listHeader}>
            <div className={styles.listHeaderLeft}>
              <MessageSquare size={16} className={styles.listHeaderIcon} />
              <h3 className={styles.listTitle}>Recent Signatures ({signatures.length})</h3>
            </div>
            <div className={styles.statusIndicator} title="Connected to Local Storage Log">
              <span className={styles.statusBlink} />
              <span className={styles.statusText}>Live Log</span>
            </div>
          </div>

          <div className={styles.signaturesTimeline}>
            {signatures.length === 0 ? (
              <p className={styles.emptyFeed}>No signatures yet. Be the first to sign!</p>
            ) : (
              signatures.map((sig) => (
                <div key={sig.id} className={styles.sigItem}>
                  <div 
                    className={styles.avatar}
                    style={{ background: sig.avatarColor }}
                  >
                    {sig.name.charAt(0).toUpperCase()}
                  </div>

                  <div className={styles.sigBody}>
                    <div className={styles.sigHeader}>
                      <span className={styles.sigName}>{sig.name}</span>
                      <span className={styles.sigDate}>{sig.date}</span>
                    </div>
                    <p className={styles.sigMsg}>{sig.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
