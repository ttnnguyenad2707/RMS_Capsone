import UtilitiesService from "../services/Utilities.service.js";
import asyncHandler from "../utils/async-handler.js"
import response from "../utils/response.js";

const UtilitiesController = {
    addUtilities : asyncHandler(async (req,res,next) => {
        const utilities = await UtilitiesService.addUtilities(req);
        if (utilities) return res.status(201).json(response.successResponse(201,utilities))
        else return res.status(404).json(response.errorResponse(404))
    })
}

export default UtilitiesController