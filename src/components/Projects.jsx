import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';

const categories = ['Semua', 'Web Dev', 'Mobile App', 'UI/UX Design'];

const projectsData = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Dev',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    description: 'Platform e-commerce lengkap dengan sistem keranjang belanja, proses checkout, dashboard admin, dan integrasi payment gateway Midtrans.',
    demoLink: 'https://example.com',
    gitLink: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Fintech Mobile Wallet',
    category: 'Mobile App',
    tags: ['React Native', 'Redux Toolkit', 'Express.js', 'PostgreSQL'],
    description: 'Aplikasi dompet digital untuk transfer dana cepat, pembayaran tagihan bulanan, top up saldo, serta pencatatan riwayat transaksi keuangan harian.',
    demoLink: 'https://example.com',
    gitLink: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Modern Agency UI/UX',
    category: 'UI/UX Design',
    tags: ['Figma', 'Prototyping', 'Design System', 'Responsive'],
    description: 'Desain antarmuka website agensi kreatif modern dengan fokus estetika minimalis, kegunaan navigasi (UX), dan tata letak yang sangat interaktif.',
    demoLink: 'https://example.com',
    gitLink: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('Semua');

  const filteredProjects = activeTab === 'Semua' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeTab);

  return (
    <section id="projects" className="py-24 relative bg-transparent overflow-hidden">
      {/* Background glow effects */}
      <div className="glow-spot glow-purple top-[10%] left-[5%]" />
      <div className="glow-spot glow-pink bottom-[10%] right-[5%]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span 
            className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Portofolio
          </motion.span>
          <motion.h2 
            className="mt-2 text-3xl sm:text-4xl font-bold font-display text-slate-800 dark:text-slate-100"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Karya & Proyek Terkini
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-350 cursor-pointer ${
                  isActive 
                    ? 'text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 border border-slate-200/10 dark:border-white/5 bg-slate-100/5 dark:bg-slate-900/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid Container with Layout Animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.title}
                className="glass-card flex flex-col h-full rounded-3xl border border-slate-200/10 dark:border-white/5 overflow-hidden group shadow-lg"
              >
                
                {/* Image & Overlay Container */}
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Absolute Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a 
                      href={project.gitLink} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-blue-500/80 border border-white/20 transition-all shadow-md"
                      title="Lihat Repositori GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-blue-500/80 border border-white/20 transition-all shadow-md"
                      title="Lihat Demo Langsung"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 font-bold uppercase mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 group-hover:text-blue-550 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-200/10 dark:border-white/5">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[11px] font-semibold font-mono px-2.5 py-1 rounded-md border border-slate-200/10 dark:border-slate-800 bg-slate-100/5 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
