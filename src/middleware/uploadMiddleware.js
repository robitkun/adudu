import multer from 'multer';
const storage = multer.memoryStorage();
import path from 'path';
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      const error = new Error('Hanya file gambar yang diperbolehkan');
      error.code = 'INVALID TYPE FILE';
      cb(error);
    }
  },
});
export default upload;
