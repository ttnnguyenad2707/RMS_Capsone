import RoomService from "../services/Room.service.js"
import asyncHandler from "../utils/async-handler.js"
import response from "../utils/response.js"

const RoomController = {
    addRoom: asyncHandler(async (req,res,next) => {
        try {
            const room = await RoomService.addRoom(req);
            if (room) return res.status(201).json(response.successResponse(201))
            else res.status(404).json(response.errorResponse(404));
            
        } catch (error) {
            return res.status(500).json(response.errorResponse(500));
        }

    }),
    getRooms: asyncHandler(async (req,res,next) => {
        try {
            const rooms = await RoomService.getRooms(req);
            if (rooms) return res.status(200).json(response.successResponse(200,rooms))
            else res.status(404).json(response.errorResponse(404));
            
        } catch (error) {
            return res.status(500).json(response.errorResponse(500));
        }

    }),
    getOne: asyncHandler(async (req,res,next) => {
        try {
            const room = await RoomService.getOne(req);
            if (room) return res.status(200).json(response.successResponse(200,room))
            else res.status(404).json(response.errorResponse(404));
            
        } catch (error) {
            return res.status(500).json(response.errorResponse(500));
        }
    }),
    updateOne: asyncHandler(async (req,res,next) => {
        try {
            const room = await RoomService.updateOne(req);

            if (room) { return res.status(200).json(response.successResponse(204,room))}
            else res.status(404).json(response.errorResponse(404));
            
        } catch (error) {
            return res.status(500).json(response.errorResponse(500));
        }
    }),
}

export default RoomController