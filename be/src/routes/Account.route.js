import express from "express";
import AccountController from "../controllers/Account.controller.js";
import validateData from "../validations/ValidateData.js";
import accountValidate from "../validations/Account.validate.js";
const AccountRoute = express.Router();

AccountRoute.get("/stores/images", AccountController.getListImages);
AccountRoute.delete("/stores/images/delete", AccountController.deleteImages)
AccountRoute.post("/upload", validateData(accountValidate.validateUploadImage), AccountController.uploadImage);
AccountRoute.put("/profile/change-password", validateData(accountValidate.validateChangePassword), AccountController.changePassword);
AccountRoute.get("/profile", AccountController.getProfile);
AccountRoute.put("/profile", validateData(accountValidate.validateProfile), AccountController.updateProfile);

export default AccountRoute;
