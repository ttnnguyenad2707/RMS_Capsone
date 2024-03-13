
import express from "express";
import AuthRoute from "./auth.route.js";
import GoogleAuthRoute from "./googleAuth.route.js";
import AccountRoute from "./Account.route.js";
import FacebookAuthRoute from "./facebookAuth.route.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js";
import HouseRoute from "./House.router.js";
import UtilitiesRoute from "./Utilities.route.js";
import problemRoute from "./problem.router.js";
import newsRouter from "./news.router.js";
import defaultPriceRoute from "./Defaultprice.route.js";
import paymentRoute from "./Payment.route.js";
import BillController from "../controllers/Bill.controller.js";
import billRoute from "./Bill.route.js";
import RoomController from "../controllers/Room.controller.js";

const indexRouter = express.Router();

indexRouter.use("/news",verifyToken,newsRouter)
indexRouter.use("/problem",verifyToken,problemRoute)
indexRouter.use("/utilities",verifyToken,UtilitiesRoute)
indexRouter.use("/house",verifyToken,HouseRoute)
indexRouter.use("/account",verifyToken, AccountRoute)
indexRouter.use("/auth/google", GoogleAuthRoute)
indexRouter.use("/auth/facebook",FacebookAuthRoute)
indexRouter.use("/auth", AuthRoute);
indexRouter.use("/defaultPrice",defaultPriceRoute)
indexRouter.use("/payment",paymentRoute)
indexRouter.use("/bill",verifyToken,billRoute)
indexRouter.use("/downloadTemplate",RoomController.downloadTemplate)
export default indexRouter;