import multer from 'multer';

const exts = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

export const fileFilter = (req, file, cb) => {
  if (exts.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const imgMulter = multer({
  storage: multer.memoryStorage(), // Используем memory storage
  fileFilter,
});
