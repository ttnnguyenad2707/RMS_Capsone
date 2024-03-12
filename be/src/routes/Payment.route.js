import express from "express";
import PaymentController from '../controllers/Payment.controller.js';


const paymentRoute = express.Router();

paymentRoute.post("/", PaymentController.test)

export default paymentRoute