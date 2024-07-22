import express from 'express'
import ContractController from '../controllers/Contract.controller.js';

const contractRoute = express.Router();

contractRoute.get("/:filename",ContractController.convert)
contractRoute.get("/:roomId/download",ContractController.downloadContract);
contractRoute.post("/:roomId",ContractController.addOne)
contractRoute.put("/:contractId",ContractController.updateContract)



export default contractRoute