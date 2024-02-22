import exceljs from "exceljs";
import Rooms from "../models/Rooms.model.js";
import HousesModel from "../models/Houses.model.js";
import AccountModel from "../models/Account.model.js";
import bcrypt from "bcrypt";


const RoomService = {
    addRoom: async (req) => {
        try {
            const { houseId } = req.body;
            const house = await HousesModel.findById(houseId);
            const workbook = new exceljs.Workbook();
            const buffer = req.file.buffer;
            await workbook.xlsx.load(buffer);
            const worksheet = workbook.worksheets[0];
            const data = [];
            const accounts = [];
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("88888888", salt);
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                if (rowNumber !== 1 && row.getCell(1).value) {
                    const rowData = {
                        name: row.getCell(1).value,
                        status: row.getCell(2).value,
                        quantityMember: row.getCell(3).value,
                        roomType: row.getCell(4).value,
                        roomPrice: row.getCell(5).value,
                        deposit: row.getCell(6).value,
                        area: row.getCell(7).value,
                        houseId: houseId,
                        utilities: house.utilities,
                        otherUtilities: house.otherUtilities,
                    };
                    const accountData = {
                        username: house.name.replace(/\s/g, '') + row.getCell(1).value,
                        password: hashedPassword,
                        accountType: "renter",
                    }
                    accounts.push(accountData);
                    data.push(rowData);
                }
            });
            await AccountModel.insertMany(accounts)
            await Rooms.insertMany(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    addOne : async(req) => {
        try {
            const {houseId} = req.params;
            const house = await HousesModel.findById(houseId);

            const data = await Rooms.create({
                houseId,
                ...req.body,
                utilities: house.utilities,
                otherUtilities: house.otherUtilities,
            });
            return data
        } catch (error) {
            throw error
        }
    },
    getRooms: async (req) => {
        try {
            const { houseId } = req.body;
            const { page, limit } = req.query;
            const {name, status,quantityMember,roomType,area} = req.query;
            const pageNumber = parseInt(page) || 1;
            const limitPerPage = parseInt(limit) || 10;

            const skip = (pageNumber - 1) * limitPerPage;

            const totalRooms = await Rooms.countDocuments({ houseId });
            const totalPages = Math.ceil(totalRooms / limitPerPage);

            const  query = {houseId,deleted: false};
           
            if (name){
                query.name = { $regex: name, $options: 'i'};
            }
            if (status){
                query.status = status;
            }
            if (quantityMember){
                query.quantityMember =  quantityMember
            }
            if (roomType){
                query.roomType = roomType;
            }
            if (area){
                query.area =  area
            }
            const data = await Rooms.find(query)
                .skip(skip)
                .limit(limitPerPage)
                .sort({ createdAt: -1 })
                .exec();

            return {                
                pagination: {
                    currentPage: pageNumber,
                    totalPages: totalPages,
                    totalRooms: totalRooms,
                    roomsPerPage: data.length
                },
                room: data
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getOne: async (req) => {
        try {
            const {roomId} = req.params;
            const room = await Rooms.findById(roomId);
            return room
        } catch (error) {
            throw error
        }
        
    },
    updateOne: async(req) => {
        try {
            const {roomId} = req.params;
            
            await Rooms.findByIdAndUpdate(roomId,{...req.body});

            const newRoom = await Rooms.findById(roomId);
            return newRoom;

        } catch (error) {
            throw error
        }
    },
    deleteOne: async (req) => {
        try {
            const {roomId} = req.params;
            await Rooms.findByIdAndUpdate(roomId, {deleted: true, deletedAt: Date.now()})
            const newData = await Rooms.findById(roomId);
            return newData
        } catch (error) {
            throw error
        }
    }
};

export default RoomService;
