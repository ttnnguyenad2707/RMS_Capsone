import ProblemsModel from "../models/Problems.model.js";
import RoomsModel from "../models/Rooms.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import getPaginationData from "../utils/getPaginationData.js";

const ProblemService = {
    addOne: async(req) => {
        try {
            const {roomId} = req.body;
            const room = await RoomsModel.findById(roomId);
            const creatorId = getCurrentUser(req);
            const data = await ProblemsModel.create({...req.body,creatorId});
            room.problemId = [...room.problemId,data.id];
            await room.save();
            return data;
        } catch (error) {
            throw error
        }
    },
    getByFilter: async(req) => {
        try {
            const {roomId} = req.params; 
            const {page,limit} = req.query;
            const data = await getPaginationData(ProblemsModel,page,limit,{roomId});
            return data;
        } catch (error) {
            throw error
        }

    }
}

export default ProblemService