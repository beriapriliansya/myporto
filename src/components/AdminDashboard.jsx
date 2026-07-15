import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, LayoutDashboard, Plus, Pencil, Trash2, LogOut, 
  ChevronRight, Save, X, Eye, FileCode, CheckCircle, AlertTriangle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredProjects } from './Projects';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [projects, setProjects] = useState([]);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // null if adding, object if editing
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Dev',
    tags: '',
    description: '',
    demoLink: '#',
    gitLink: '',
    image: ''
  });

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default credential for testing/local
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setLoginError('');
      confetti({
        particleCount: 80,
        spread: 50,
        origin: { y: 0.6 }
      });
    } else {
      setLoginError('Password salah. Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  const openAddModal = () => {
    setCurrentProject(null);
    setFormData({
      title: '',
      category: 'Web Dev',
      tags: '',
      description: '',
      demoLink: '#',
      gitLink: '',
      image: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      tags: project.tags.join(', '),
      description: project.description,
      demoLink: project.demoLink || '#',
      gitLink: project.gitLink || '',
      image: project.image || ''
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;
        
        if (img.width > MAX_WIDTH) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({
          ...prev,
          image: dataUrl
        }));
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    // Process tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    let updatedProjects;

    if (currentProject) {
      // Edit mode
      updatedProjects = projects.map(p => {
        if (p.title === currentProject.title) {
          return {
            ...p,
            title: formData.title,
            category: formData.category,
            tags: tagsArray,
            description: formData.description,
            demoLink: formData.demoLink,
            gitLink: formData.gitLink,
            image: formData.image || '/school_hero.png.png'
          };
        }
        return p;
      });
    } else {
      // Add mode
      const newProject = {
        title: formData.title,
        category: formData.category,
        tags: tagsArray,
        description: formData.description,
        demoLink: formData.demoLink,
        gitLink: formData.gitLink,
        image: formData.image || '/school_hero.png.png'
      };
      updatedProjects = [newProject, ...projects];
    }

    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    
    // Dispatch custom event to notify Projects.jsx in real-time
    window.dispatchEvent(new Event('portfolio_projects_updated'));
    
    setIsModalOpen(false);
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#3b82f6', '#8b5cf6', '#10b981']
    });
  };

  const handleDelete = (titleToDelete) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus proyek "${titleToDelete}"?`)) {
      const updatedProjects = projects.filter(p => p.title !== titleToDelete);
      localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      
      // Dispatch custom event
      window.dispatchEvent(new Event('portfolio_projects_updated'));
    }
  };

  // Login Screen render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative">
        <div className="glow-spot glow-blue top-1/4 left-1/4" />
        <div className="glow-spot glow-purple bottom-1/4 right-1/4" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-card p-8 rounded-3xl border border-white/5 relative z-10 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <span className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 mb-4 text-blue-500">
              <Lock className="w-8 h-8" />
            </span>
            <h1 className="text-2xl font-bold font-display text-slate-100">Portal Admin</h1>
            <p className="text-xs text-slate-450 mt-1">Masukkan password untuk manajemen proyek</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-550/50 focus:border-blue-500 transition-all text-center tracking-widest text-lg font-mono"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <p className="text-sm font-semibold text-red-500 text-center flex items-center justify-center gap-1.5 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertTriangle className="w-4 h-4" /> {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:from-blue-500 hover:to-purple-500 shadow-md cursor-pointer"
            >
              <span>Masuk Ke Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <a href="#" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">
              Kembali ke Portfolio Utama
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard Screen render
  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 p-6 sm:p-12 relative overflow-x-hidden">
      {/* glows */}
      <div className="glow-spot glow-blue top-[10%] left-[-10%] w-[40vw] h-[40vw]" />
      <div className="glow-spot glow-purple bottom-[10%] right-[-10%] w-[40vw] h-[40vw]" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Header Dashboard */}
        <header className="flex flex-wrap items-center justify-between gap-6 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
              <LayoutDashboard className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-100">Manajemen Proyek</h1>
              <p className="text-xs text-slate-400 mt-0.5">Edit dan sesuaikan seluruh karya portofolio Anda</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={openAddModal}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Proyek Baru</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-850 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Info Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4 shadow-lg">
            <span className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
              <FileCode className="w-6 h-6" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Total Proyek</p>
              <p className="text-2xl font-bold text-slate-100">{projects.length}</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4 shadow-lg">
            <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
              <CheckCircle className="w-6 h-6" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Penyimpanan</p>
              <p className="text-2xl font-bold text-slate-100">Local Disk</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4 shadow-lg">
            <span className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl">
              <Eye className="w-6 h-6" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Akses Publik</p>
              <p className="text-2xl font-bold text-slate-100">Aktif</p>
            </div>
          </div>
        </section>

        {/* Project Table Grid */}
        <section className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg font-bold font-display text-slate-100">Daftar Proyek Aktif</h2>
            <a href="#" className="text-xs text-blue-400 hover:underline">Lihat Hasil di Portfolio</a>
          </div>

          <div className="overflow-x-auto">
            {projects.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-slate-700 animate-bounce" />
                <p>Belum ada proyek yang ditambahkan.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/30 text-xs font-semibold text-slate-400 border-b border-white/5 uppercase font-mono">
                    <th className="p-5">Gambar</th>
                    <th className="p-5">Judul Proyek</th>
                    <th className="p-5">Kategori</th>
                    <th className="p-5">Tags</th>
                    <th className="p-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((project, index) => (
                    <motion.tr 
                      key={project.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-900/20 transition-colors"
                    >
                      <td className="p-5">
                        <img 
                          src={project.image} 
                          alt="" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=80';
                          }}
                          className="w-16 h-10 object-cover rounded-lg border border-white/10"
                        />
                      </td>
                      <td className="p-5 font-bold text-slate-200">
                        {project.title}
                      </td>
                      <td className="p-5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {project.category}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-850 transition-colors cursor-pointer"
                            title="Edit Proyek"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.title)}
                            className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-850 transition-colors cursor-pointer"
                            title="Hapus Proyek"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>

      {/* CRUD Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/85 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-dark-card border border-white/5 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
            >
              
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
                  {currentProject ? <Pencil className="w-5 h-5 text-blue-500" /> : <Plus className="w-5 h-5 text-blue-500" />}
                  <span>{currentProject ? 'Edit Proyek' : 'Proyek Baru'}</span>
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-slate-900 border border-slate-850 rounded-lg text-slate-400 hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Judul Proyek</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      placeholder="Masukkan nama proyek"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Kategori</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    >
                      <option value="Web Dev">Web Dev</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Keahlian / Tags (pisahkan dengan koma)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    placeholder="Contoh: Laravel, Tailwind CSS, MySQL"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Deskripsi Singkat</label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
                    placeholder="Jelaskan fitur utama proyek Anda..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Gambar Proyek (File / Path)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="image"
                        value={formData.image.startsWith('data:') ? 'Terunggah dari komputer' : formData.image}
                        onChange={handleInputChange}
                        disabled={formData.image.startsWith('data:')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-50"
                        placeholder="Contoh: /lapor_ku.png"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        id="image-file-upload"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-file-upload"
                        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-sm cursor-pointer flex items-center justify-center border border-slate-700 active:scale-[0.98] transition-all whitespace-nowrap"
                      >
                        Upload
                      </label>
                      {formData.image.startsWith('data:') && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="px-3 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-xl border border-red-900/40"
                          title="Hapus gambar unggahan"
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">GitHub Repositori Link</label>
                    <input
                      type="url"
                      name="gitLink"
                      value={formData.gitLink}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-bold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-650 text-white font-bold rounded-xl flex items-center gap-2 hover:from-blue-500 hover:to-purple-500 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4.5 h-4.5" />
                    <span>{currentProject ? 'Simpan Perubahan' : 'Tambahkan Proyek'}</span>
                  </button>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
