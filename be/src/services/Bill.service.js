import HousesModel from "../models/Houses.model.js";

const BillService = {
    createBills : async (req) => {
        try {
            
            const {houseId} = req.params;
            const house = await HousesModel.findById(houseId);
            if (!house) {
                throw new Error("House Not Found")
            }
            else {
                
            }
        } catch (error) {
            throw error
        }
    }
}
export default BillService