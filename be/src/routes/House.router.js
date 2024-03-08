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

HouseRoute.get("/downloadTemplate",RoomController.downloadTemplate)
HouseRoute.post("/room/addOne/:houseId",RoomController.addOne)
HouseRoute.post("/room",upload.single('excelFile'),RoomController.addRoom)
HouseRoute.get("/room/:roomId",RoomController.getOne)
HouseRoute.put("/room/:roomId",validateData(RoomValidate.validateUpdate),RoomController.updateOne)
HouseRoute.get("/:houseId/room",RoomController.getRooms)
HouseRoute.delete("/room/:roomId",RoomController.deletedOne)
HouseRoute.get("/:houseId",HouseController.getOne)
HouseRoute.post("/:houseId",HouseController.updateOne)
HouseRoute.delete("/:houseId", HouseController.deleteOne)
HouseRoute.post("/", HouseController.addHouse)
HouseRoute.get("/",HouseController.getHouses)

export default HouseRoute