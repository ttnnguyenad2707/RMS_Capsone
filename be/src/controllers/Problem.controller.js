import ProblemService from "../services/Problem.service.js";
import asyncHandler from "../utils/async-handler.js"
import response from "../utils/response.js"

const ProblemController = {
    addOne: asyncHandler(async (req,res) => {
        try {
            const problem = await ProblemService.addOne(req);
            if (problem) return res.status(201).json(response.successResponse(201,problem));
            else return res.status(404).json(response.errorResponse(404));
        } catch (error) {
            return res.status(500).json(response.errorResponse(500,error.toString()))
        }
    }),
}

export default ProblemController