import multer from 'multer';

// Middleware untuk menangani error multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      error: err.message,
    });
  } else if (err) {
    return res.status(500).json({ error: `Server error: ${err.message}` });
  }

  next();
};

export { handleMulterError };
