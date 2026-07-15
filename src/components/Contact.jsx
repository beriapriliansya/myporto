import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquareCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Confetti explosion effect!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent overflow-hidden">
      {/* Glow effect */}
      <div className="glow-spot glow-blue top-[20%] right-[10%]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span
            className="text-xs font-semibold tracking-widest uppercase text-blue-500 dark:text-blue-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Kontak
          </motion.span>
          <motion.h2
            className="mt-2 text-3xl sm:text-4xl font-bold font-display text-slate-800 dark:text-slate-100"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Mari Mulai Berkolaborasi
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Contact Info */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-150">
                Punya Ide Proyek Menarik?
              </h3>
              <p className="text-slate-650 dark:text-slate-400 mt-3 leading-relaxed">
                Silakan tinggalkan pesan melalui formulir di samping, atau hubungi saya secara langsung melalui media sosial atau informasi kontak di bawah. Saya selalu terbuka untuk kolaborasi baru!
              </p>
            </div>

            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="flex items-center gap-4">
                <span className="p-3.5 bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-100 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-550/20">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Email</p>
                  <a href="mailto:john.doe@example.com" className="text-base font-bold text-slate-850 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    beriapriliansya04@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="p-3.5 bg-purple-500/10 dark:bg-purple-500/10 light:bg-purple-100 text-purple-600 dark:text-purple-400 rounded-2xl border border-purple-500/20">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Telepon / WhatsApp</p>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-base font-bold text-slate-850 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    +62 812 3456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="p-3.5 bg-pink-500/10 dark:bg-pink-500/10 light:bg-pink-100 text-pink-600 dark:text-pink-400 rounded-2xl border border-pink-500/20">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Lokasi</p>
                  <p className="text-base font-bold text-slate-850 dark:text-slate-200">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8 rounded-3xl border border-slate-200/10 dark:border-white/5 shadow-xl">
              <h4 className="text-lg font-bold font-display mb-6 text-slate-850 dark:text-slate-100 flex items-center gap-2">
                <MessageSquareCode className="w-5 h-5 text-blue-500" /> Kirim Pesan Cepat
              </h4>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200/20 dark:border-slate-800 light:border-slate-300 bg-slate-100/5 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-sans"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2">Alamat Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200/20 dark:border-slate-800 light:border-slate-300 bg-slate-100/5 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-sans"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2">Pesan Anda</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200/20 dark:border-slate-800 light:border-slate-300 bg-slate-100/5 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-sans resize-none"
                    placeholder="Tulis pesan atau detail proyek Anda di sini..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:from-blue-550 hover:to-purple-550 transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Kirim Pesan</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Success Notification message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-sm font-semibold text-center"
                >
                  🎉 Terima kasih! Pesan Anda telah terkirim dan efek kembang api diluncurkan!
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
