import BaseUtilities from "../models/BaseUtilities.model.js"
import OtherUtilities from "../models/OtherUtilities.model.js"
const UtilitiesService = {
    addBaseUtilities : async (req) => {
        const {utilities} = req.body;
        const data = await BaseUtilities.insertMany(utilities);
        return data
    },
    
    getBaseUtilities : async (req) =>{
        const data = await BaseUtilities.find();
        return data
    },

    addOtherUtilities: async (req) => {
        const {houseId,name} = req.body;
        const data = await OtherUtilities.create({houseId,name});
        return data
    },


}

export default UtilitiesService