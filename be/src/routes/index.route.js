
import express from "express";
import AuthRoute from "./auth.route.js";
import GoogleAuthRoute from "./googleAuth.route.js";
import AccountRoute from "./Account.route.js";
import FacebookAuthRoute from "./facebookAuth.route.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js";

const indexRouter = express.Router();

indexRouter.use("/account",verifyToken, AccountRoute)
indexRouter.use("/auth/google", GoogleAuthRoute)
indexRouter.use("/auth/facebook",FacebookAuthRoute)
indexRouter.use("/auth", AuthRoute);

export default indexRouter;