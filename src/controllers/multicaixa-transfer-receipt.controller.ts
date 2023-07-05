import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

import { MulticaixaTransferReceiptService } from '../services/multicaixa-transfer-receipt.service';

@injectable()
export class MulticaixaTransferReceiptController {
  async index(request: Request, response: Response) {
    const multicaixaTransferReceiptService = container.resolve(MulticaixaTransferReceiptService);
    return response.json(await multicaixaTransferReceiptService.execute(request.file));
  }
}