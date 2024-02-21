import express from "express";
import ProblemController from "../controllers/Problem.controller.js";
const problemRoute = express.Router();

problemRoute.post("/",ProblemController.addOne);

export default problemRoute