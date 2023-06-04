import { createWorker } from 'tesseract.js';

const worker = createWorker({
  langPath: './tessdata',
});

export { worker };
