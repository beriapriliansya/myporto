import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Download } from 'lucide-react';

const timelineData = [
  {
    type: 'work',
    role: 'Web Developer',
    company: 'Tech Solutions Corp',
    period: '2022 - Sekarang',
    description: 'Memimpin tim pengembangan frontend dalam membangun aplikasi berbasis React, mengintegrasikan sistem state management, dan meningkatkan performa loading hingga 40%.'
  },
  {
    type: 'work',
    role: 'Frontend Developer',
    company: 'Digital Creative Agency',
    period: '2022 - Sekarang',
    description: 'Mengembangkan website responsif interaktif, berkolaborasi dengan desainer UI/UX untuk merealisasikan mockup Pixel-Perfect, dan mengelola integrasi REST API.'
  },
  {
    type: 'education',
    role: 'Sarjana Sistem Informasi',
    company: 'UIN Raden Intan Lampung',
    period: '2022 - Sekarang',
    description: 'Lulus dengan predikat Cumlaude (insyaallah). Berfokus pada Rekayasa Perangkat Lunak, Algoritma Struktur Data, dan Pemrograman Web.'
  }
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-24 relative bg-transparent overflow-hidden">
      {/* Subtle Glow backdrop */}
      <div className="glow-spot glow-purple top-[40%] right-[5%]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span 
            className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tentang Saya
          </motion.span>
          <motion.h2 
            className="mt-2 text-3xl sm:text-4xl font-bold font-display text-slate-800 dark:text-slate-100"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Siapa Saya Sebenarnya?
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Biography */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-200">
              Saya adalah pengembang kreatif yang gemar memecahkan masalah melalui kode.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Saya memiliki minat mendalam dalam industri rekayasa perangkat lunak dan pembuatan antarmuka pengguna yang dinamis. Dengan pengalaman praktis yang matang, saya selalu antusias mempelajari teknologi baru dan menerapkannya dalam proyek-proyek nyata.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Setiap website yang saya buat menggabungkan arsitektur kode yang bersih, performa tinggi, dan aksesibilitas ramah pengguna untuk memastikan keselarasan bisnis dan estetika visual.
            </p>

            <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-slate-100/10 dark:bg-slate-900/30 text-slate-700 dark:text-slate-100 border border-slate-200/20 dark:border-slate-800 light:border-slate-300 rounded-xl font-medium hover:bg-slate-200/20 dark:hover:bg-slate-800 flex items-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4 text-blue-500" />
                Unduh Resume / CV
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Interactive Timeline */}
          <motion.div 
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h4 className="text-xl font-bold font-display mb-8 text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" /> Riwayat Karir & Pendidikan
            </h4>

            <div className="relative pl-6 border-l-2 border-slate-200/15 dark:border-slate-800 space-y-12">
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative group"
                  variants={itemVariants}
                >
                  {/* Timeline icon indicator */}
                  <span className="absolute -left-[37px] top-1 p-2 rounded-full border border-blue-500/20 bg-slate-900 dark:bg-[#0B0F19] text-blue-500 shadow-md group-hover:scale-110 transition-transform">
                    {item.type === 'work' ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <GraduationCap className="w-4 h-4" />
                    )}
                  </span>

                  {/* Content Card */}
                  <div className="glass-card p-6 rounded-2xl border border-slate-200/10 dark:border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group-hover:border-blue-500/30">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {item.role}
                      </h5>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-100 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-500 mt-1">{item.company}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
