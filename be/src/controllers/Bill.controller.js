import asyncHandler from "../utils/async-handler.js"
import response from "../utils/response.js"
import PayOS from "@payos/node";
import * as dotenv from 'dotenv'
dotenv.config();
const { PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECK_SUM_KEY } = process.env;
const payos = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECK_SUM_KEY);

const BillController = {
    addBillInRoom: asyncHandler(async(req,res)=> {
        try {
            const bill = await BillService.addBillInRoom(req);
            if (bill) return res.status(201).json(response.successResponse(201,bill));
            else return res.status(404).json(response.errorResponse(404));
        } catch (error) {
            return res.status(500).json(response.errorResponse(500,error.toString()))
        }
    })
}

export default BillController