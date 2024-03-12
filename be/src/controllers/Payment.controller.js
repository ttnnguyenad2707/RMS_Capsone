import asyncHandler from "../utils/async-handler.js"
import response from "../utils/response.js"
import PayOS from "@payos/node";
import * as dotenv from 'dotenv'
dotenv.config();
const { PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECK_SUM_KEY } = process.env;

const PaymentController = {
    test : asyncHandler(async(req,res)=> {
        const payos = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECK_SUM_KEY);

        const requestData = {
            orderCode: 10003,
            amount: 10000,
            description: "testing",
            cancelUrl: "http://localhost:5173/",
            returnUrl: "http://localhost:5173/home",
            // signature?: "Nguyen",
            // items?: [{ name: "RMS", quantity: 1, price: 10000 }],
            // buyerName?: "Nguyen",
            // buyerEmail?: "trantrungnguyenad@gmail.com",
            // buyerPhone?: "0943895292",
            // buyerAddress?: "HN",
            // expiredAt?: "2h",
          }
        const paymentLink = await payos.createPaymentLink(requestData);
        return res.status(200).json(paymentLink)
        // try {
        //     const news = await NewsService.addOne(req);
        //     if (news) return res.status(201).json(response.successResponse(201,news));
        //     else return res.status(404).json(response.errorResponse(404));
        // } catch (error) {
        //     return res.status(500).json(response.errorResponse(500,error.toString()))
        // }
    })
}
export default PaymentController