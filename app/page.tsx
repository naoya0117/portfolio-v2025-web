import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Background from './components/Background';
import Skills from './components/Skills';
import TeamProjects from './components/TeamProjects';
import PersonalProjects from './components/PersonalProjects';
import WorkExperience from './components/WorkExperience';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import "./portfolio.css";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Background />
      <Skills />
      <TeamProjects />
      <PersonalProjects />
      <WorkExperience />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
