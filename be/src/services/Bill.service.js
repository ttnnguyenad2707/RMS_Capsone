import BillsModel from "../models/Bills.model.js";
import RoomsModel from "../models/Rooms.model.js";

const BillService = {
    addBillInRoom : async (req) => {
        try {
            const {roomId} = req.params;
            const room = await RoomsModel.findById(roomId).populate("houseId");
            const {electricNumber, waterUnit} = req.body;
            
            
            const bill = new BillsModel({
                roomId,
                roomPrice: room.roomPrice,
                electricPrice: room.houseId.electricPrice * electricNumber,
                waterPrice: room.houseId.waterPrice * waterUnit,
                priceList: [
                    {}
                ]

            })
        } catch (error) {
            throw error
        }
    }
}
export default BillService