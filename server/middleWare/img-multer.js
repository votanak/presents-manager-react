import multer from 'multer';

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../public/good-pictures/');
  },
  filename(req, res, cb) {
    cb(null, file.originalname);
  },
});

const exts = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

export const fileFilter = (req, file, cb) => {
  if (exts.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const imgMulter = multer({ storage, fileFilter });
