import Utilities from "../models/Utilities.model.js"

const UtilitiesService = {
    addUtilities : async (req) => {
        const {utilities} = req.body;
        const data = await Utilities.insertMany(utilities);
        return data
    }
}

export default UtilitiesService