import BillsModel from "../models/Bills.model.js";
import RoomsModel from "../models/Rooms.model.js";

const BillService = {
    addBillInRoom : async (req) => {
        try {
            const {roomId} = req.params;
            const room = await RoomsModel.findById(roomId).populate({path:"houseId", populate: {path: "priceList", populate: "base"} });
            const {electricNumber, waterUnit} = req.body;
            const priceList = room.houseId.priceList;
            let priceListForBill = [];
            priceList.map(item => {
                if(item.base.unit === "đồng/tháng"){
                    priceListForBill.push({
                        
                    })
                }
                else if(item.base.unit === "đồng/kWh") {

                }
                else if(item.base.unit === "đồng/khối") {

                }
                else if(item.base.unit === "đồng/người") {

                }
            })
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