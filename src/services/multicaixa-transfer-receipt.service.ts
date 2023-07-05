import { Request, Response } from 'express';

import { worker } from '../utils/tesseractConfig';
import { Multer } from 'multer';
import { Readable } from 'stream';

type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export class MulticaixaTransferReceiptService {
  async execute(file: File | undefined) {
    try {
      const workerInstance = await worker;
      await workerInstance.load();
      await workerInstance.loadLanguage('por');
      await workerInstance.initialize('por');
     
      if (file === undefined) {
        throw new Error('Please upload a single image');
      }
      
      const image = file.buffer;
      
      const { data } = await workerInstance.recognize(image);
      
      const voucherText = data.text;
      
      const regexID = /AOO\d{11}/;
      const regexIBAN = /ADO6\.\d{4}\.\d{4}\.\d{4}\.\d{4}\.\d{1}/;
      const matchIBAN = voucherText.match(regexIBAN);
      const matchID = voucherText.match(regexID);
      const regexTransaction = /TRANSACÇÃO: (\d{5})/;
      const matchTransaction = voucherText.match(regexTransaction);
      const regex = /IMPORTANCIA A TRANSFERIR:\s*([\d.,]+)\s*KZ/;
      const match = voucherText.match(regex);
      const valueTransfer = match ? match[1] : null;
      const regexAccountNumber = /CONTA:\s*(\w+)/;
      const matchAccountNumber = voucherText.match(regexAccountNumber);
      const accountNumber = matchAccountNumber ? matchAccountNumber[1] : null;
      
      if (matchID && matchID[0] && matchTransaction && matchTransaction[0] && matchIBAN && valueTransfer && matchAccountNumber) {
        const [, code] = matchTransaction[0].split('TRANSACÇÃO: ');
        const voucherId = matchID[0];
        const iban = matchIBAN[0].replace(regexIBAN, (match) => {
          return match.replace("D", "O");
        });
        
        return {
          success: true,
          id: voucherId,
          iban,
          value: valueTransfer,
          account: accountNumber,
          code: Number(code),
        };
      }

      return {
        success: false,
        status: 404,
        message: 'Unable to read image or find transaction code and ID',
      }

    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}