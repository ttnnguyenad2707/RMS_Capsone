import express from 'express'
import HouseController from '../controllers/House.controller.js';
import RoomController from '../controllers/Room.controller.js';

import multer from 'multer'
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import validateData from '../validations/ValidateData.js';
import RoomValidate from '../validations/Room.validate.js';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const HouseRoute = express.Router();

HouseRoute.post("/", HouseController.addHouse)
HouseRoute.get("/",verifyToken,HouseController.getHouses)
HouseRoute.post("/room",upload.single('excelFile'),RoomController.addRoom)
HouseRoute.get("/room/:roomId",RoomController.getOne)
HouseRoute.put("/room/:roomId",validateData(RoomValidate.validateUpdate),RoomController.updateOne)
HouseRoute.get("/room",RoomController.getRooms)

export default HouseRoute