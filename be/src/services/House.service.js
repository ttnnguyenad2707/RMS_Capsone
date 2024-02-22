import HousesModel from "../models/Houses.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";

const HouseService = {
    addHouse: async (req) => {
        const {
            name,
            status,
            location,
            electricPrice,
            waterPrice,
            servicePrice,
            utilities,
            otherUtilities,
            rules,
        } = req.body;
        const hostId = getCurrentUser(req);
        const house = new HousesModel({
            name,
            status,
            location,
            electricPrice,
            waterPrice,
            servicePrice,
            utilities,
            otherUtilities,
            rules,
            hostId,
        });
        await house.save();

        return house;
    },
    getHouses: async (req) => {
        try {
            const hostId = getCurrentUser(req);
            const { page, limit } = req.query;
            const pageNumber = parseInt(page) || 1;
            const limitPerPage = parseInt(limit) || 10;
            const skip = (pageNumber - 1) * limitPerPage;

            const totalHouses = await HousesModel.countDocuments({});
            const totalPages = Math.ceil(totalHouses / limitPerPage);

            const data = await HousesModel.find({ hostId, deleted: false })
                .populate([{ path: "utilities" }, { path: "otherUtilities" }])
                .skip(skip)
                .limit(limitPerPage)
                .sort({ createdAt: -1 });
            return {
                pagination: {
                    currentPage: pageNumber,
                    totalPages: totalPages,
                    totalRooms: totalHouses,
                    roomsPerPage: data.length,
                },
                houses: data,
            };
        } catch (error) {
            throw new Error(error.toString())
        }
    },
    updateOne: async(req) => {
        try {
            const {houseId} = req.params;
            await HousesModel.findByIdAndUpdate(houseId,{...req.body});
            const newData = await HousesModel.findById(houseId);
            return newData
            
        } catch (error) {
            throw new Error(error.toString())
        }
    },
    getOne: async(req) => {
        try {
            const {houseId} = req.params;
            const data = await HousesModel.find({houseId})
                .populate([{ path: "utilities" }, { path: "otherUtilities" }]);

            return data
            
        } catch (error) {
            throw new Error(error.toString())
        }
    },
    deleteOne: async(req) => {
        try {
            const {houseId} = req.params;
            await HousesModel.findByIdAndUpdate(houseId,{deleted:true,deletedAt: Date.now()})
            const newData = await HousesModel.findById(houseId);
            return newData

        } catch (error) {
            throw new Error(error.toString())
            
        }
    }
};

export default HouseService;
