import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Achievements from '../components/Achievements';
import GitHubOSS from '../components/GitHubOSS';
import Blogs from '../components/Blogs';
import Guestbook from '../components/Guestbook';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Projects featured={true} />
      <Services />
      <Achievements featured={true} />
      <GitHubOSS />
      <Blogs featured={true} />
      <Guestbook featured={true} />
      <Contact />
    </>
  );
};

export default Home;
