import express from 'express'
import BillController from '../controllers/Bill.controller.js';

const billRoute = express.Router();
billRoute.post("/room/:roomId",BillController.addBillInRoom)

export default billRoute