import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Tentang', href: '#about' },
  { name: 'Keahlian', href: '#skills' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Monitor scrolling to highlight active section and add border/shadow
  useEffect(() => {
    const handleScroll = () => {
      // Background change on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is in view
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-dark-bg/80 dark:bg-dark-bg/80 light:bg-light-bg/80 backdrop-blur-md border-b border-slate-200/10 dark:border-slate-800/50 light:border-slate-200 shadow-lg' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a 
          href="#home"
          className="flex items-center gap-2 text-xl font-bold font-display tracking-tight text-blue-500 dark:text-blue-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Terminal className="w-6 h-6 animate-pulse" />
          <span>Dev<span className="text-purple-500 dark:text-purple-400">Folio.</span></span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 items-center">
            {navLinks.map((link, index) => {
              const linkId = link.href.substring(1);
              const isActive = activeSection === linkId;
              return (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className={`relative text-sm font-medium font-sans transition-colors duration-200 hover:text-blue-500 ${
                      isActive 
                        ? 'text-blue-500 dark:text-blue-400 font-semibold' 
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-slate-200/10 dark:border-slate-800/80 light:border-slate-300/80 bg-slate-100/10 dark:bg-slate-900/30 hover:bg-slate-200/20 dark:hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle Theme"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile menu toggle & theme toggle combined */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-200/10 dark:border-slate-800 light:border-slate-200 bg-slate-100/10 dark:bg-slate-900/30 text-slate-700 dark:text-amber-400"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-slate-200/10 dark:border-slate-800 light:border-slate-200 bg-slate-100/10 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-slate-900/95 dark:bg-dark-bg/95 light:bg-light-bg/95 backdrop-blur-lg border-b border-slate-200/10 dark:border-slate-800 light:border-slate-200"
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-base font-medium transition-colors ${
                      activeSection === link.href.substring(1)
                        ? 'text-blue-500 dark:text-blue-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
