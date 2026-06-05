import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import styles from './GitHubOSS.module.css';

gsap.registerPlugin(ScrollTrigger);

const GitHubOSS = () => {
  const container = useRef(null);
  
  // Local state for live stats, preloaded with fallback defaults
  const [reposData, setReposData] = useState([
    {
      name: 'Hoopit',
      slug: 'Hoopit',
      description: 'Link management suite with shorteners, folders, and visit analytics tracking.',
      stars: 18,
      forks: 4,
      lang: 'JavaScript',
      url: 'https://github.com/me-sayanghosh/Hoopit'
    },
    {
      name: 'PrepDost',
      slug: 'PrepDost',
      description: 'Career prep platform featuring AI-driven interactive mock interviews and resume parsing.',
      stars: 32,
      forks: 8,
      lang: 'JavaScript',
      url: 'https://github.com/me-sayanghosh/PrepDost'
    },
    {
      name: 'CodeReviewer',
      slug: 'CodeReviewer',
      description: 'AI automated PR review agent analyzing code security vulnerabilities and patterns.',
      stars: 26,
      forks: 6,
      lang: 'Python',
      url: 'https://github.com/me-sayanghosh/CodeReviewer'
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const updatedRepos = await Promise.all(
          reposData.map(async (repo) => {
            try {
              const res = await fetch(`https://api.github.com/repos/me-sayanghosh/${repo.slug}`);
              if (!res.ok) throw new Error('API Rate Limit or Network Error');
              const data = await res.json();
              return {
                ...repo,
                stars: data.stargazers_count ?? repo.stars,
                forks: data.forks_count ?? repo.forks
              };
            } catch (err) {
              console.warn(`Failed to fetch stats for ${repo.slug}, using fallback data.`, err);
              return repo; // return original fallback on error
            }
          })
        );
        setReposData(updatedRepos);
      } catch (e) {
        console.error('General failure fetching GitHub stats.', e);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  // Entry GSAP animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.anim-oss-header', {
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

      gsap.fromTo('.anim-oss-card', {
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

  return (
    <section id="oss" className="section-padding" ref={container}>
      <div className={styles.sectionHeader}>
        <span className={`${styles.pretitle} anim-oss-header`}>OPEN SOURCE</span>
        <h2 className={`${styles.heading} anim-oss-header`}>Featured Contributions</h2>
      </div>

      <div className={styles.reposGrid}>
        {reposData.map((repo) => (
          <div key={repo.name} className={`${styles.repoCard} anim-oss-card`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconCircle}>
                <Code size={18} className={styles.codeIcon} />
              </div>
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.githubLink}
                title="View on GitHub"
              >
                <Github size={18} />
              </a>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.repoName}>{repo.name}</h3>
              <p className={styles.repoDesc}>{repo.description}</p>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.statsGroup}>
                <div className={styles.statItem} title={`${repo.stars} Stars`}>
                  <Star size={14} className={styles.starIcon} />
                  {loading ? (
                    <span className={styles.skeletonText} />
                  ) : (
                    <span className={styles.statValue}>{repo.stars}</span>
                  )}
                </div>
                <div className={styles.statItem} title={`${repo.forks} Forks`}>
                  <GitFork size={14} className={styles.forkIcon} />
                  {loading ? (
                    <span className={styles.skeletonText} />
                  ) : (
                    <span className={styles.statValue}>{repo.forks}</span>
                  )}
                </div>
              </div>

              <div className={styles.metaRight}>
                <span className={styles.langBadge}>{repo.lang}</span>
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.exploreBtn}
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GitHubOSS;
