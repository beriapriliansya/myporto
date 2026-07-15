const fs = require('fs');
const path = require('path');

// Check if the user placed the file in the root directory
const localPhotoPath = path.join(__dirname, 'Desain tanpa judul (3).png');
const dest = path.join(__dirname, 'public', 'profile.png');

if (fs.existsSync(localPhotoPath)) {
  try {
    fs.copyFileSync(localPhotoPath, dest);
    console.log("🎉 Foto profil 'Desain tanpa judul (3).png' berhasil disalin ke public/profile.png!");
  } catch (err) {
    console.error("Gagal menyalin file:", err);
  }
} else {
  // Fallback to the temp media path
  const src = "C:\\Users\\Berwhy\\.gemini\\antigravity-ide\\brain\\1adc8a95-aca0-45aa-91d5-12aa960e2276\\media__1784084070321.png";
  try {
    fs.copyFileSync(src, dest);
    console.log("🎉 Foto profil dari cache berhasil disalin ke public/profile.png!");
  } catch (err) {
    console.error("Gagal menyalin file:", err);
  }
}
