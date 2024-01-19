import HouseService from "../services/House.service.js"
import asyncHandler from "../utils/async-handler.js"
import response from "../utils/response.js"
const HouseController = {
    addHouse: asyncHandler(async (req,res) => {
        try {
            const house = await HouseService.addHouse(req);
            if (house) return res.status(201).json(response.successResponse(201,house));
            else return res.status(404).json(response.errorResponse(404));
        } catch (error) {
            return res.status(500).json(response.errorResponse(500))
        }
    }),
    getHouses: asyncHandler(async (req,res) => {
        try {
            const houses = await HouseService.getHouses(req);
            if (houses) return res.status(201).json(response.successResponse(201,houses));
            else return res.status(404).json(response.errorResponse(404));
        } catch (error) {
            return res.status(500).json(response.errorResponse(500))
            
        }
    })
    
}

export default HouseController