import { Router } from "express";


export const routerMulticaixaTransferReceipt = Router();

routerMulticaixaTransferReceipt.get('/multicaixa-transfer-receipt', (req, res) => {
  return res.send('hello world')
});