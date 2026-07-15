import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const words = ["Web Developer", "React Specialist", "UI/UX Designer", "Problem Solver"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          // Pause at full word before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100 + Math.random() * 80);
        }
      } else {
        // Deleting characters
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(60);
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-transparent">
      {/* Dynamic Ambient Blur Glows */}
      <div className="glow-spot glow-blue top-[20%] left-[10%]" />
      <div className="glow-spot glow-purple bottom-[20%] right-[10%]" />

      {/* Decorative Rotating Grid/Shapes */}
      <div className="absolute top-[25%] right-[15%] w-72 h-72 rounded-full border border-blue-500/10 dark:border-blue-500/10 light:border-blue-500/5 animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-[20%] left-[15%] w-96 h-96 rounded-full border border-purple-500/10 dark:border-purple-500/10 light:border-purple-500/5 animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Details */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-100 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1 
            className="mt-6 text-4xl sm:text-6xl font-extrabold font-display leading-[1.15] tracking-tight text-slate-800 dark:text-slate-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Halo, Saya <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Beri Apriliansya</span>
          </motion.h1>
          <motion.h2 
            className="mt-4 text-2xl sm:text-3xl font-bold font-sans text-slate-500 dark:text-slate-300 min-h-[40px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Seorang <span className="text-blue-500 dark:text-blue-400 font-extrabold">{currentText}</span>
            <span className="w-1 h-6 ml-1 inline-block bg-blue-500 dark:bg-blue-400 animate-pulse" />
          </motion.h2>

          <motion.p 
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Saya berfokus pada pembuatan website modern yang berperforma tinggi dengan user experience (UX) yang menarik dan intuitif. Terbiasa menggunakan React dan ekosistem modern lainnya.
          </motion.p>

          {/* Social Icons & Buttons */}
          <motion.div 
            className="mt-8 flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="#projects"
              className="px-6 py-3.5 rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-purple-650 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
            >
              Lihat Proyek
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#contact"
              className="px-6 py-3.5 rounded-xl font-medium border border-slate-200/20 dark:border-slate-800 light:border-slate-300 bg-slate-100/10 dark:bg-slate-900/30 text-slate-700 dark:text-slate-200 hover:bg-slate-200/20 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              Hubungi Saya
            </a>

            <div className="flex items-center gap-3 ml-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-slate-200/10 dark:border-slate-800 light:border-slate-300 text-slate-600 dark:text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-slate-200/10 dark:border-slate-800 light:border-slate-300 text-slate-600 dark:text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Visual Element (Right side) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <motion.div
            className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background glowing sphere */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-2xl animate-pulse" />
            
            {/* Visual Glass Box Card (Shifted slightly back and left) */}
            <motion.div 
              className="absolute top-4 left-4 w-[280px] sm:w-[320px] h-[260px] sm:h-[300px] rounded-3xl bg-slate-900/65 border border-slate-200/10 dark:border-white/10 p-5 flex flex-col justify-between shadow-2xl backdrop-blur-md z-0"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">developer.js</span>
              </div>

              {/* Pseudo-code illustration */}
              <div className="font-mono text-[11px] text-slate-400 space-y-1.5 mt-3 flex-grow">
                <p className="text-purple-400"><span className="text-blue-400">const</span> developer = &#123;</p>
                <p className="pl-4">name: <span className="text-emerald-400">'Beri Apriliansya'</span>,</p>
                <p className="pl-4">role: <span className="text-emerald-400">'Full Stack Dev'</span>,</p>
                <p className="pl-4">skills: [<span className="text-orange-400">'React'</span>, <span className="text-orange-400">'Vite'</span>, <span className="text-orange-400">'Tailwind'</span>],</p>
                <p className="pl-4">hardworker: <span className="text-amber-400">true</span></p>
                <p className="text-purple-400">&#125;;</p>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between text-[10px] text-slate-500 font-mono">
                <span className="text-blue-400">⚡ Kreatif & Responsif</span>
                <span className="text-purple-400">100% Cocok</span>
              </div>
            </motion.div>

            {/* Profile Cutout Image (In the foreground, with premium float and glow) */}
            <motion.img
              src="/profile.png"
              alt="Beri Apriliansya"
              className="absolute bottom-0 right-4 h-[85%] sm:h-[90%] object-contain z-10 pointer-events-none drop-shadow-[0_25px_40px_rgba(59,130,246,0.3)] filter contrast-[1.05]"
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 0.8, 0, -0.8, 0]
              }}
              onError={(e) => {
                // Fallback invisibly if image not loaded yet
                e.target.style.display = 'none';
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Micro stats cards (Front-most layer) */}
            <motion.div
              className="absolute bottom-6 left-0 sm:-left-4 glass-card px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-slate-200/15 dark:border-white/5 z-20 shadow-xl"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="text-xl">🏆</span>
              <div>
                <p className="text-[10px] text-slate-400">Pengalaman</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">3+ Tahun</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-12 right-0 sm:-right-4 glass-card px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-slate-200/15 dark:border-white/5 z-20 shadow-xl"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <span className="text-xl">💻</span>
              <div>
                <p className="text-[10px] text-slate-400">Total Proyek</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">6 Selesai</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
