import multer, { Multer } from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
}).array('image', 3);

export { upload };
