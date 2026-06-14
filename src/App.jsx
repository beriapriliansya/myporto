import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function MainApp() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Dynamic Ambient Background Nodes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="glow-spot glow-blue top-[-10%] left-[-10%] w-[50vw] h-[50vw]" />
        <div className="glow-spot glow-purple bottom-[-10%] right-[-10%] w-[50vw] h-[50vw]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
