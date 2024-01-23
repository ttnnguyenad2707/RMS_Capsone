import House from '../models/Houses.model.js'
import getCurrentUser from '../utils/getCurrentUser.js';
import UtilitiesOfHouse from "../models/UtilitiesOfHouse.model.js"

const HouseService = {
    addHouse: async (req) => {
        const {name,status,location,electricPrice,waterPrice,utilities,rules} = req.body;
        const hostId = getCurrentUser(req);
        const house = new House({
            name,
            status,
            location,
            electricPrice,
            waterPrice, 
            utilities,
            rules,
            hostId
        });
        await house.save();

        return house

        
    },
    getHouses: async (req) => {
        const hostId = getCurrentUser(req);
        const data = await House.find({hostId}).populate({
            path: "utilities",
            populate: [
                {
                    path: "utilities"
                },
                {
                    path: "otherUtilities"
                }
            ]
        });
        return data
    }
}

export default HouseService