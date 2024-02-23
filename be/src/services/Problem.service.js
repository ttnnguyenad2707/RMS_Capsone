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
    },/*  */
    getByFilter: async(req) => {
        try {
            const {roomId} = req.params; 
            const {page,limit,type,status,title,content} = req.query;
            const query = {roomId,deleted: false};
            if (type) {
                query.type = type;
            }
            if (status){
                query.status = status;
            }
            if (title) {
                query.title = {$regex: title, $options: "i"};
            }
            if (content) {
                query.content = {$regex: content, $options: "i"}
            }
            const data = await getPaginationData(ProblemsModel,page,limit,query);
            return data;
        } catch (error) {
            throw error
        }

    },
    getOne: async (req) => {
        try {
            const {problemId} = req.params;
            const data =  await ProblemsModel.findById(problemId).populate([{path: "creatorId"}, {path: "roomId"}]);
            return data;

        } catch (error) {
            throw error
        }
    },
    updateOne: async (req) => {
        try {
            const {problemId} = req.params;
            await ProblemsModel.findByIdAndUpdate(problemId,{...req.body});
            const newData = await ProblemsModel.findById(problemId);
            return newData
        } catch (error) {
            throw error
        }
    },
    deleteOne: async (req) => {
        try {
            const {problemId} = req.params;
            await ProblemsModel.findByIdAndUpdate(problemId,{deleted: true,deletedAt: Date.now()});
            const newData = await ProblemsModel.findById(problemId);
            return newData;
        } catch (error) {
            throw error
        }
    }
    
}

export default ProblemService