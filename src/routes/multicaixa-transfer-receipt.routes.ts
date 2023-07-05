import { Router } from "express";
import { container } from "tsyringe";

import { MulticaixaTransferReceiptController } from "../controllers/multicaixa-transfer-receipt.controller";
import multer from "multer";

export const routerMulticaixaTransferReceipt = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const multicaixaTransferReceiptController = container.resolve(MulticaixaTransferReceiptController);

routerMulticaixaTransferReceipt.post('/multicaixa-transfer-receipt', upload.single('file'), multicaixaTransferReceiptController.index);