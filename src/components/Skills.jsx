import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Wrench, Palette } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Code2 className="w-6 h-6 text-blue-500" />,
    skills: [
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'React.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Next.js', level: 75 }
    ]
  },
  {
    title: 'Backend & Database',
    icon: <Database className="w-6 h-6 text-purple-500" />,
    skills: [
      { name: 'Node.js / Express', level: 70 },
      { name: 'PHP / Laravel', level: 75 },
      { name: 'RESTful API', level: 80 },
      { name: 'MySQL / PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 65 }
    ]
  },
  {
    title: 'UI/UX Design & Soft Skills',
    icon: <Palette className="w-6 h-6 text-pink-500" />,
    skills: [
      { name: 'Figma', level: 80 },
      { name: 'Wireframing & Prototyping', level: 85 },
      { name: 'Problem Solving', level: 90 },
      { name: 'Komunikasi Tim', level: 85 }
    ]
  },
  {
    title: 'Tools & DevOps',
    icon: <Wrench className="w-6 h-6 text-emerald-500" />,
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Vite', level: 85 },
      { name: 'Docker', level: 55 },
      { name: 'Vercel / Netlify', level: 80 }
    ]
  }
];

export default function Skills() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="skills" className="py-24 relative bg-transparent overflow-hidden">
      {/* Glow backgrounds */}
      <div className="glow-spot glow-blue bottom-[30%] left-[5%]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span 
            className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Keahlian
          </motion.span>
          <motion.h2 
            className="mt-2 text-3xl sm:text-4xl font-bold font-display text-slate-800 dark:text-slate-100"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Teknologi Yang Saya Gunakan
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              custom={catIndex}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/10 dark:border-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3.5 bg-slate-100/10 dark:bg-slate-900/40 rounded-2xl border border-slate-200/15 dark:border-white/5 shadow-inner">
                  {category.icon}
                </span>
                <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-200">
                  {category.title}
                </h3>
              </div>

              {/* Individual Skill Progress Bars */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                      <span className="text-blue-500 dark:text-blue-400 font-bold">{skill.level}%</span>
                    </div>
                    {/* Track */}
                    <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden">
                      {/* Bar */}
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: skillIndex * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
