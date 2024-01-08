import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 5 MB limit for file size
  },
});

export default upload;
