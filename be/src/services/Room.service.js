import exceljs from "exceljs";
import Rooms from "../models/Rooms.model.js";

const RoomService = {
    addRoom: async (req) => {
        try {
            const { houseId } = req.body;
            const workbook = new exceljs.Workbook();
            const buffer = req.file.buffer;

            await workbook.xlsx.load(buffer);
            const worksheet = workbook.worksheets[0];

            const data = [];
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                if (rowNumber !== 1) {
                    const rowData = {
                        name: row.getCell(1).value,
                        status: row.getCell(2).value,
                        quantityMember: row.getCell(3).value,
                        roomType: row.getCell(4).value,
                        roomPrice: row.getCell(5).value,
                        deposit: row.getCell(6).value,
                        area: row.getCell(7).value,
                        houseId: houseId,
                    };
                    data.push(rowData);
                }
            });
            await Rooms.insertMany(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    getRooms: async (req) => {
        try {
            const { houseId } = req.body;
            const { page, limit } = req.query;
            const pageNumber = parseInt(page) || 1;
            const limitPerPage = parseInt(limit) || 10;

            const skip = (pageNumber - 1) * limitPerPage;

            const totalRooms = await Rooms.countDocuments({ houseId });
            const totalPages = Math.ceil(totalRooms / limitPerPage);

            const data = await Rooms.find({ houseId })
                .skip(skip)
                .limit(limitPerPage);

            return {
                room: data,
                pagination: {
                    currentPage: pageNumber,
                    totalPages: totalPages,
                    totalRooms: totalRooms,
                    roomsPerPage: data.length
                }
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
    }
};

export default RoomService;
