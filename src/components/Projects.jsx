import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';

const categories = ['Semua', 'Web Dev', 'Data Science'];

const projectsData = [
  {
    title: 'SMP Negeri 6 Tulung Selapan',
    category: 'Web Dev',
    tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL'],
    description: 'Website resmi SMP Negeri 6 Tulung Selapan sebagai pusat informasi akademik, profil sekolah, dan berita terintegrasi.',
    demoLink: '#',
    gitLink: 'https://github.com/beriapriliansya/SMPN6TLS',
    image: '/school_hero.png.png'
  },
  {
    title: 'LaporKu - Pengaduan Masyarakat',
    category: 'Web Dev',
    tags: ['Laravel', 'Blade', 'Bootstrap', 'MySQL'],
    description: 'Sistem pelaporan aduan online untuk mendukung program e-government di Kecamatan Kotaagung, lengkap dengan dashboard pelacakan status.',
    demoLink: '#',
    gitLink: 'https://github.com/beriapriliansya/pengaduan-masyarakat',
    image: '/lapor_ku.png'
  },
  {
    title: 'RestoPOS - Point Of Sale',
    category: 'Web Dev',
    tags: ['PHP', 'JavaScript', 'CSS3', 'MySQL'],
    description: 'Aplikasi kasir (Point of Sale) restoran modern untuk mengelola pesanan menu, keranjang aktif, kalkulasi tagihan, dan cetak transaksi secara real-time.',
    demoLink: '#',
    gitLink: 'https://github.com/beriapriliansya/PointOfSale-Kasir',
    image: '/resto_pos.png'
  },
  {
    title: 'SI - DETEKSI AI',
    category: 'Data Science',
    tags: ['Python', 'Flask', 'Machine Learning', 'Tailwind CSS'],
    description: 'Sistem deteksi kecerdasan buatan (AI) dan analisis risiko kecurangan tugas akademik untuk memilah karya orisinil manusia dari tulisan generator AI.',
    demoLink: '#',
    gitLink: 'https://github.com/beriapriliansya/KLASIFIKASI-RISIKO-KECURANGAN-TUGAS',
    image: '/deteksi_ai.png'
  },
  {
    title: 'Dinas Perdagangan Bandar Lampung',
    category: 'Web Dev',
    tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL'],
    description: 'Website portal resmi Dinas Perdagangan Kota Bandar Lampung untuk memantau pergerakan harga komoditas pasar, pengajuan layanan publik, dan media informasi berita perdagangan.',
    demoLink: '#',
    gitLink: 'https://github.com/beriapriliansya/disper',
    image: '/disper.png'
  },
  {
    title: 'Halo Lampung - Portal Pariwisata',
    category: 'Web Dev',
    tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL'],
    description: 'Platform portal pariwisata Lampung terintegrasi untuk mengeksplorasi destinasi wisata alam instagramable, info pantai eksotis, kuliner lokal, dan budaya daerah.',
    demoLink: '#',
    gitLink: 'https://github.com/beriapriliansya/UAS_HaloLampung',
    image: '/halo_lampung.png'
  }
];

export const getStoredProjects = () => {
  const stored = localStorage.getItem('portfolio_projects');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('portfolio_projects', JSON.stringify(projectsData));
  return projectsData;
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [projectsList, setProjectsList] = useState(() => getStoredProjects());

  useEffect(() => {
    const handleProjectsUpdate = () => {
      setProjectsList(getStoredProjects());
    };
    window.addEventListener('portfolio_projects_updated', handleProjectsUpdate);
    return () => window.removeEventListener('portfolio_projects_updated', handleProjectsUpdate);
  }, []);

  const filteredProjects = activeTab === 'Semua' 
    ? projectsList 
    : projectsList.filter(project => project.category === activeTab);

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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
                    }}
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
