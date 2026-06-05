import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ArrowRight, X, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import styles from './Blogs.module.css';

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const container = useRef(null);
  const modalContentRef = useRef(null);

  const categories = ['All', 'UI/UX & Creative', 'Web Performance', 'Backend & Core'];

  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Micro-Animations: Crafting Cinematic Web UIs',
      category: 'UI/UX & Creative',
      date: 'May 20, 2026',
      readTime: '5 min read',
      snippet: 'How subtle movements, CSS custom properties, and linear interpolation elevate standard landing pages into memorable, premium digital experiences.',
      accent: '#f15a24',
      glow: 'rgba(241, 90, 36, 0.15)',
      content: `
# The Art of Micro-Animations: Crafting Cinematic Web UIs

Have you ever visited a website and felt an immediate sense of premium quality, even before reading a single line of text? That feeling is rarely accidental. More often than not, it is the result of meticulously designed **micro-animations**—subtle, interactive motion guidelines that make a interface feel responsive and alive.

In modern web development, micro-animations bridge the gap between static content and tactile human interaction. Let's explore how to design these experiences without overloading your DOM or compromising performance.

---

## 1. The Core Principle: Purpose Over Decoration

The number one mistake developers make when introducing animations is adding motion for the sake of motion. Cinematic UIs use movement as **feedback** or **guidance**.

* **Feedback:** A button scaling down slightly when pressed, mimicking a real-world spring.
* **Guidance:** A spotlight glow tracking the cursor, guiding the eye toward interactive elements.
* **Continuity:** Transitioning shapes smoothly instead of sudden snaps.

> "Animation is like web typography: when done well, it is nearly invisible. When done poorly, it is all you can see."

---

## 2. Technical Blueprint: Mouse Tracking with CSS Custom Properties

One of the most lightweight ways to implement interactive spotlights (like the ones on this portfolio) is by updating CSS custom variables in JavaScript. This completely bypasses React render cycles, keeping performance at a clean 60fps.

\`\`\`javascript
// Highly optimized mouse tracking
const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  e.currentTarget.style.setProperty('--mouse-x', \`\${x}px\`);
  e.currentTarget.style.setProperty('--mouse-y', \`\${y}px\`);
};
\`\`\`

In your CSS, you can then render a radial gradient background that references these properties:

\`\`\`css
.spotlightCard::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(241, 90, 36, 0.1),
    transparent 80%
  );
  pointer-events: none;
}
\`\`\`

---

## 3. Smooth Interchanges: Linear Interpolation (Lerp)

To achieve that luxurious "weighted drag" feel rather than a rigid tracking indicator, we use **Linear Interpolation (Lerp)**.

Instead of directly setting the position to the cursor's coordinates, we move the spotlight a percentage of the distance toward the target coordinates on every animation frame:

$$\\text{Position}_{\\text{new}} = \\text{Position}_{\\text{current}} + (\\text{Target} - \\text{Position}_{\\text{current}}) \\times \\text{EaseFactor}$$

Using an ease factor around \`0.08\` yields a buttery smooth momentum effect that slows down beautifully as it reaches the destination.

---

## Conclusion

Cinematic web experiences aren't about heavy movies or flashy page entries. They are built on small, micro-interactions that respect the user's focus and react instantly. By utilizing CSS variables and lightweight Math, you can create immersive interfaces that feel premium and look state-of-the-art.
      `
    },
    {
      id: 2,
      title: 'Optimizing Mobile Web Performance: Lessons from Canvas & Smooth Scroll',
      category: 'Web Performance',
      date: 'May 28, 2026',
      readTime: '4 min read',
      snippet: 'A deep dive into why JavaScript touch smooth-scrolling and background canvas loops bottleneck mobile rendering pipelines, and how to fix them.',
      accent: '#2563eb',
      glow: 'rgba(37, 99, 235, 0.15)',
      content: `
# Optimizing Mobile Web Performance: Lessons from Canvas & Smooth Scroll

Building a modern, beautiful landing page often involves adding canvas grids, parallax graphics, and smooth scrolling. While these features look breathtaking on a powerful desktop monitor with a dedicated GPU, they can quickly turn into a lagging nightmare on mobile devices.

Let's dissect why this happens and explore the strategies used to achieve buttery-smooth 60fps scrolling on both desktop and mobile screens.

---

## 1. The Mobile Bottleneck: Hardware and Threads

Unlike desktops, mobile processors are optimized for power efficiency. When you run heavy calculations in the browser, mobile engines quickly throttle CPU speeds to prevent overheating.

There are two primary culprits for mobile scroll lag:
1. **JS-Driven Smooth Scroll:** Libraries that intercept mouse wheel and touch actions (like Lenis with touch sync) block the browser's multi-threaded compositor. The main thread gets stuck calculating physics coordinates, causing "touch lag."
2. **Fixed Canvas Re-Compositions:** A full-bleed canvas rendering particles or grids fixed in the background forces the mobile browser to re-draw and re-composite the entire page layout on every single scroll offset change.

---

## 2. Solution: Bypassing Smooth Scrolling on Touch

Mobile devices already possess a highly advanced, hardware-accelerated kinetic scroll engine built directly into their operating systems. Trying to override this with JavaScript is counter-productive.

The solution is simple: **initialize smooth scroll triggers strictly on desktop viewports**.

\`\`\`javascript
useEffect(() => {
  // Graceful mobile exit
  if (window.innerWidth <= 768) return;

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    syncTouch: false // Do not override native touch gestures
  });
  
  // ... GSAP setup ...
}, []);
\`\`\`

By returning touchscreen actions to the native rendering thread, mobile scrolling becomes instantly responsive and lag-free.

---

## 3. Solution: Bypassing requestAnimationFrame Loops

If a canvas grid is rendering dynamically in the background, drawing logic like \`requestAnimationFrame\` runs continuous cycles. On mobile, this will rapidly drain battery life and cause micro-stutters during scrolling.

Instead of running an active draw loop, we can **switch to a single, static high-performance render** for mobile screens:

\`\`\`javascript
useEffect(() => {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Render one beautiful frame on mount or resize
    drawStaticGrid();
    return; // Completely bypass requestAnimationFrame loop!
  }
  
  // Desktop active interactive animation loop
  const renderLoop = () => {
    drawInteractiveGrid();
    requestAnimationFrame(renderLoop);
  };
  renderLoop();
}, []);
\`\`\`

---

## Summary

Performance is the foundation of user experience. A premium design is useless if it lags. By dynamically adjusting the animation pipelines according to the device's capabilities, we ensure that Sayan's portfolio looks cinematic on desktop and feels lightning-fast on mobile.
      `
    },
    {
      id: 3,
      title: 'Building Secure API Gateways with FastAPI & Docker',
      category: 'Backend & Core',
      date: 'June 2, 2026',
      readTime: '6 min read',
      snippet: 'How to architecture robust and high-speed API layers for modern applications, featuring JWT authentication, auto-documentation, and rate limiting.',
      accent: '#8a2be2',
      glow: 'rgba(138, 43, 226, 0.15)',
      content: `
# Building Secure API Gateways with FastAPI & Docker

When building full-stack web applications, frontend elegance is only half the equation. A secure, rapid, and scalable backend is what keeps the application robust under load. 

FastAPI has emerged as one of the premier frameworks for Python backend engineering due to its performance (matching Node.js and Go via Starlette and Pydantic) and automatic documentation standards. Let's review the best practices for setting up a production-ready API gateway.

---

## 1. Why FastAPI?

Traditional Python frameworks like Django are powerful but can feel heavy. FastAPI offers several advantages for modern service-oriented APIs:

* **Asynchronous Support:** Native support for \`async\` and \`await\` allows the engine to handle thousands of concurrent requests without blocking.
* **Auto-Validation:** Pydantic models automatically validate incoming requests and sanitize inputs, preventing database injection vectors.
* **Instant Documentation:** Generates interactive Swagger UI and ReDoc pages automatically, saving valuable hours.

---

## 2. Securing the Gateway: JWT Authentication

A secure API requires authentication that doesn't burden the database. JSON Web Tokens (JWT) allow the gateway to verify user identities cryptographically without needing a database lookup for every request.

Here is a standard router dependency layout for securing endpoints:

\`\`\`python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception
\`\`\`

---

## 3. Containerization with Docker

To ensure the backend runs identically on local workspaces, staging servers, and cloud clusters, containerization is essential. Here is a production-optimized \`Dockerfile\` using multi-stage builds to keep build sizes light:

\`\`\`dockerfile
# Stage 1: Build dependencies
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Final minimal runtime
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

---

## Conclusion

A high-performance backend requires modern routing speeds, cryptographic security, and clean packaging. FastAPI combined with Docker provides a state-of-the-art framework for freshers and experienced backend engineers alike, ensuring that your core server logic remains robust, clean, and scaling-ready.
      `
    }
  ];

  const filteredBlogs = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  // Scroll handler for modal progress indicator
  const handleModalScroll = () => {
    if (!modalContentRef.current) return;
    const element = modalContentRef.current;
    const totalHeight = element.scrollHeight - element.clientHeight;
    if (totalHeight > 0) {
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    }
  };

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setScrollProgress(0);
    document.body.style.overflow = 'hidden'; // Lock main page scrolling
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    document.body.style.overflow = ''; // Unlock main page scrolling
  };

  // Section entry animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-blog-header', {
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

      gsap.fromTo('.anim-blog-card', {
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
        stagger: 0.1
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Format content parser helper to make rich text render beautifully
  const renderArticleContent = (content) => {
    if (!content) return null;
    
    return content.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // Handle main title
      if (trimmed.startsWith('# ')) {
        return <h1 key={index} className={styles.artH1}>{trimmed.replace('# ', '')}</h1>;
      }
      // Handle subheadings
      if (trimmed.startsWith('## ')) {
        return <h2 key={index} className={styles.artH2}>{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={index} className={styles.artH3}>{trimmed.replace('### ', '')}</h3>;
      }
      // Handle blockquotes
      if (trimmed.startsWith('> ')) {
        return <blockquote key={index} className={styles.artQuote}>{trimmed.replace('> ', '')}</blockquote>;
      }
      // Handle code blocks
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const lang = lines[0].replace('```', '') || 'code';
        const codeText = lines.slice(1, -1).join('\n');
        return (
          <div key={index} className={styles.codeContainer}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>{lang}</span>
            </div>
            <pre className={styles.artCode}><code>{codeText}</code></pre>
          </div>
        );
      }
      // Handle bullet lists
      if (trimmed.startsWith('* ')) {
        const listItems = trimmed.split('\n').map((li, i) => (
          <li key={i} className={styles.artLi}>
            <ChevronRight size={12} className={styles.liBullet} />
            <span>{li.replace('* ', '')}</span>
          </li>
        ));
        return <ul key={index} className={styles.artUl}>{listItems}</ul>;
      }

      // Default text rendering
      return <p key={index} className={styles.artPara}>{trimmed}</p>;
    });
  };

  return (
    <section id="blogs" className="section-padding" ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-blog-header`}>KNOWLEDGE SHARING</span>
        <h2 className={`${styles.heading} anim-blog-header`}>Articles & Insights</h2>

        {/* Categories Bar */}
        <div className={`${styles.filterBar} anim-blog-header`}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid - Flat 2D elements */}
      <div className={styles.blogsGrid}>
        {filteredBlogs.map((post) => (
          <article 
            key={post.id} 
            className={`${styles.blogCard} anim-blog-card`}
            style={{ '--card-accent': post.accent, '--card-glow': post.glow }}
            onClick={() => openBlog(post)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.categoryBadge} style={{ color: post.accent }}>{post.category}</span>
              <div className={styles.metaInfo}>
                <span className={styles.metaItem}>
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </span>
                <span className={styles.metaItem}>
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </span>
              </div>
            </div>

            <h3 className={styles.cardTitle}>{post.title}</h3>
            <p className={styles.cardSnippet}>{post.snippet}</p>

            <div className={styles.cardFooter}>
              <span className={styles.readMore}>
                <span>Read Full Article</span>
                <ArrowRight size={14} className={styles.readMoreArrow} />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Immersive Slide-in Article Modal */}
      {selectedBlog && (
        <div className={`${styles.modalOverlay} ${selectedBlog ? styles.modalVisible : ''}`}>
          <div className={styles.modalContainer}>
            {/* Modal Header Progress Tracker */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className={styles.modalHeader}>
              <div className={styles.modalMeta}>
                <span className={styles.modalCategory} style={{ color: selectedBlog.accent }}>
                  {selectedBlog.category}
                </span>
                <span className={styles.modalDivider}>•</span>
                <span className={styles.modalMetaItem}>{selectedBlog.readTime}</span>
              </div>
              
              <button className={styles.closeBtn} onClick={closeBlog} aria-label="Close Article">
                <X size={20} />
              </button>
            </div>

            <div 
              className={styles.modalContent} 
              ref={modalContentRef} 
              onScroll={handleModalScroll}
            >
              <article className={styles.articleBody}>
                {/* Author Info Card */}
                <div className={styles.authorCard}>
                  <div className={styles.authorDetails}>
                    <strong>Sayan Ghosh</strong>
                    <span>Full-Stack Engineer</span>
                  </div>
                  <div className={styles.publishDate}>
                    <Calendar size={13} />
                    <span>Published {selectedBlog.date}</span>
                  </div>
                </div>

                {/* Main Content Render */}
                <div className={styles.richText}>
                  {renderArticleContent(selectedBlog.content)}
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
