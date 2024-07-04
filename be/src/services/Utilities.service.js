import DefaultUtilitiesModel from "../models/DefaultUtilities.model.js";
import OtherUtilitiesModel from "../models/OtherUtilities.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import prisma from "../utils/prismaClient.js";

const UtilitiesService = {
    addDefaultUtilities : async (req) => {
        const {utilities} = req.body;
        // const data = await DefaultUtilitiesModel.insertMany(utilities);
        const data = await prisma.defaultutilities.createMany({data: utilities});
        return data
    },
    
    getDefaultUtilities : async (req) =>{
        try {
            
            // const data = await DefaultUtilitiesModel.find();
            const data = await prisma.defaultutilities.findMany();
            return data
        } catch (error) {
            throw error
        }
    },

    addOtherUtilities: async (req) => {
        const userID = getCurrentUser(req);
        const {name} = req.body;
        // const data = await OtherUtilitiesModel.create({userID,name});
        const data = await prisma.otherutilities.create({
            data : {
                userID,
                name
            }
        })
        return data
        
    },

    getOtherUtilities: async (req) => {
        const userID = getCurrentUser(req);
        // const data = await OtherUtilitiesModel.find({userID});
        const data = await prisma.otherutilities.findMany();
        return data;
    }


}

export default UtilitiesService