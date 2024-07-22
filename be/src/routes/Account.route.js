import express from "express";
import AccountController from "../controllers/Account.controller.js";
import validateData from "../validations/ValidateData.js";
import accountValidate from "../validations/Account.validate.js";
const AccountRoute = express.Router();
import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const storageCloudinary = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        format: async (req, file) => {
            const ext = file.originalname.split(".").pop();
            return ext;
        },
        public_id: (req, file) => file.originalname,
    },
});
const parserCloudinary = multer({ storage: storageCloudinary });

AccountRoute.put(
    "/profile/change-password",
    validateData(accountValidate.validateChangePassword),
    AccountController.changePassword
);
AccountRoute.get("/profile", AccountController.getProfile);
AccountRoute.put(
    "/profile/scan",
    parserCloudinary.fields([
        { name: "imageFront", maxCount: 1 },
        { name: "imageBack", maxCount: 1 },
    ]),
    AccountController.scanIdCard
);
AccountRoute.put(
    "/profile",
    validateData(accountValidate.validateProfile),
    AccountController.updateProfile
);
export default AccountRoute;
