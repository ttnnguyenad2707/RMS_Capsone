import exceljs from "exceljs";
import Rooms from "../models/Rooms.model.js";
import HousesModel from "../models/Houses.model.js";
import AccountModel from "../models/Account.model.js";
import bcrypt from "bcrypt";
import Image from "../models/Upload.model.js";


const RoomService = {
    addRoom: async (req) => {
        try {
            const { houseId } = req.body;
            const house = await HousesModel.findById(houseId);
            const workbook = new exceljs.Workbook();
            const buffer = req.file.buffer;
            await workbook.xlsx.load(buffer);
            const worksheet = workbook.worksheets[0];
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("Rms@12345", salt);
    
            for (let rowNumber = 1; rowNumber <= worksheet.rowCount; rowNumber++) {
                const row = worksheet.getRow(rowNumber);
                if (rowNumber !== 1 && row.getCell(1).value) {
                    const floor = row.getCell(1).value.toString().charAt(0);
                    const rowData = await Rooms.create({
                        floor: floor,
                        name: row.getCell(1).value,
                        status: row.getCell(2).value,
                        quantityMember: row.getCell(3).value,
                        roomType: row.getCell(4).value,
                        roomPrice: row.getCell(5).value,
                        deposit: row.getCell(6).value,
                        area: row.getCell(7).value,
                        houseId: houseId,
                        utilities: house?.utilities || [] ,
                        otherUtilities: house?.otherUtilities || [],
                    });
                    const accountData = await AccountModel.create({
                        username: house.name.replace(/\s/g, '') + row.getCell(1).value,
                        password: hashedPassword,
                        accountType: "renter",
                        roomId: rowData.id
                    })
                    house.numberOfRoom += 1; 
                    await house.save();
                }
            }
            return {
                message: "oke"
            }
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
                floor: req.body.name.charAt(0), 
                ...req.body,
                utilities: house.utilities,
                otherUtilities: house.otherUtilities,
            });
            house.numberOfRoom += 1;
            await house.save();
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("Rms@12345", salt);
            const accountData = await AccountModel.create({
                username: house.name.replace(/\s/g, '') + req.body.name,
                password: hashedPassword,
                accountType: "renter",
                roomId: data.id
            }); 

            return data
        } catch (error) {
            throw error
        }
    },
    getRooms: async (req) => {
        try {
            const { houseId } = req.params;
            const { page, limit, option } = req.query;
            const {floor,name, status,quantityMember,roomType,area} = req.query;
            const pageNumber = parseInt(page) || 1;
            const limitPerPage = parseInt(limit) || 10;

            const skip = (pageNumber - 1) * limitPerPage;

            const totalRooms = await Rooms.countDocuments({ houseId });
            const totalPages = Math.ceil(totalRooms / limitPerPage);

            const  query = {houseId,deleted: false};
            if (floor) {
                query.floor = floor
            }
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
            let data;
            if (String(option) === "all"){
                data = await Rooms.find(query)
                    .sort({ createdAt: -1 })
                    .exec();
                return data
                
            }
            else{
                data = await Rooms.find(query)
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
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getOne: async (req) => {
        try {
            const {roomId} = req.params;
            const room = await Rooms.findById(roomId)
                .populate("utilities")
                .populate("otherUtilities")
                .populate("houseId")
            return {
                ...room._doc,
                currentMember: room.members.length
            }
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
    },
    getFloor: async (req) => {
        try {
            const {houseId} = req.params;
            const floor = await Rooms.distinct("floor", {houseId})
            return floor
        } catch (error) {
            throw error
        }
    },
    addMember: async (req) => {
        try {
            const {roomId} = req.params;
            const room = await Rooms.findById(roomId);
            
            const image = new Image({
                imageName: req.file.mimetype,
                imageData: req.file.buffer
            })
            await image.save();
            room.members.push({...req.body,avatar: image.id})
            await room.save();
            return room;
        } catch (error) {
            throw error            
        }
    },
    removeMember: async (req) => {
        try {
            const {roomId} = req.params;
            const {memberId} = req.body;
            const room = await Rooms.findById(roomId);
            room.members = room.members.filter(member => member.id !== memberId);
            await room.save();
            return room
        } catch (error) {
            throw error
        }
    },
    updateMember: async (req) => {
        try {
            const {roomId} = req.params;
            const {memberId,...updateInfo} = req.body;
            const room = await Rooms.findById(roomId);            
            const memberIndex = room.members.findIndex(member => member.id === memberId);            
            if (memberIndex === -1) {
                throw new Error("Member not found in the room");
            }
            room.members[memberIndex] = {...updateInfo};            
            await room.save();            
            return room;
        } catch (error) {
            throw error;            
        }
    }
    
};

export default RoomService;
