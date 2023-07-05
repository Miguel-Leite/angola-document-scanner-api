import "reflect-metadata";
import express from 'express';
import cors from 'cors'
import multer, { Multer } from 'multer';
import { createWorker } from 'tesseract.js';
import { routerMulticaixaTransferReceipt } from './routes/multicaixa-transfer-receipt.routes';


const app = express();

const PORT = process.env.APP_PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage,
}).array('image', 3);

app.use('/api', routerMulticaixaTransferReceipt);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});