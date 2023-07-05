import { container } from "tsyringe";
import { MulticaixaTransferReceiptService } from "../../services/multicaixa-transfer-receipt.service";
import { MulticaixaTransferReceiptController } from "../../controllers/multicaixa-transfer-receipt.controller";

container.registerSingleton(MulticaixaTransferReceiptService);
container.registerSingleton<MulticaixaTransferReceiptController>(MulticaixaTransferReceiptController);