const fs = require('fs');
const path = require('path');

const src = 'C:/xampp/htdocs/Web-SMPN6TLS/public/assets/images/school_hero.png';
const dest = path.join(__dirname, 'public', 'school_hero.png');

try {
  fs.copyFileSync(src, dest);
  console.log('🎉 Gambar berhasil disalin ke public/school_hero.png!');
} catch (err) {
  console.error('❌ Gagal menyalin gambar:', err.message);
}
