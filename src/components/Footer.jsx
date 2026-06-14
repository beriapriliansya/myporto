import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400){
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400){
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t border-slate-200/10 dark:border-slate-900/80 py-12 bg-slate-900/10 dark:bg-dark-bg/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo/Name */}
        <p className="text-sm font-semibold text-slate-500 font-display">
          &copy; {new Date().getFullYear()} <span className="text-blue-500 font-bold">DevFolio.</span> All rights reserved.
        </p>

        {/* Made with love */}
        <p className="text-sm text-slate-500 flex items-center gap-1">
          Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> menggunakan React & Tailwind
        </p>

        {/* Links */}
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#home" className="hover:text-blue-550 transition-colors">Home</a>
          <a href="#about" className="hover:text-blue-550 transition-colors">Tentang</a>
          <a href="#projects" className="hover:text-blue-550 transition-colors">Proyek</a>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-blue-500/30 border border-white/10 transition-all cursor-pointer"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
