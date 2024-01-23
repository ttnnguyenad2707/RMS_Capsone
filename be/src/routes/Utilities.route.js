import express from 'express'
import UtilitiesController from '../controllers/Utilities.controller.js';

const UtilitiesRoute = express.Router();
UtilitiesRoute.post("/",UtilitiesController.addBaseUtilities)

export default UtilitiesRoute