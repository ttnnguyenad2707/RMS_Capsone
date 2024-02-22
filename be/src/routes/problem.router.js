import express from "express";
import ProblemController from "../controllers/Problem.controller.js";
import { verifyTokenRenter } from "../middlewares/verifyToken.middleware.js";
const problemRoute = express.Router();

problemRoute.get("/:problemId",ProblemController.getOne)
problemRoute.get("/",ProblemController.getByFilter)
problemRoute.post("/",verifyTokenRenter,ProblemController.addOne);
problemRoute.put("/:problemId",ProblemController.updateOne);
problemRoute.delete("/:problemId",verifyTokenRenter,ProblemController.deleteOne)

export default problemRoute