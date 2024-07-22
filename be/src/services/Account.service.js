import Account from "../models/Account.model.js";
import bcrypt from "bcrypt";
import getCurrentUser from "../utils/getCurrentUser.js";
import prisma from "../utils/prismaClient.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import fetch from 'node-fetch';
class AccountService {
    async getProfile(req, res) {
        try {
            const accountId = getCurrentUser(req);
            // const profile = await Account.findById(accountId);
            const profile = await prisma.account.findUnique({
                where: {
                    id: accountId,
                },
            });
            if (!profile) {
                return res.send("Account not found !!");
            }

            const { password, refreshToken, passwordResetCode, ...other } =
                profile;
            return res.status(200).json({
                data: other,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async updateProfile(req, res) {
        try {
            const accountId = getCurrentUser(req);
            const account = await prisma.account.findUnique({
                where: {
                    id: accountId,
                },
            });
            if (!account) {
                return res.send("Account not found !!");
            }

            const { name, phone, avatar } = req.body;

            await prisma.account.update({
                where: {
                    id: accountId,
                },
                data: {
                    name,
                    phone,
                    avatar,
                },
            });
            prisma.account
                .findUnique({
                    where: {
                        id: accountId,
                    },
                })
                .then((data) => {
                    const {
                        password,
                        id,
                        refreshToken,
                        passwordResetCode,
                        ...other
                    } = data;
                    return res.status(200).json({
                        message: "Update Successfully",
                        data: other,
                    });
                });
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async changePassword(req, res) {
        try {
            const accountId = getCurrentUser(req);
            const { oldPassword, newPassword } = req.body;
            const account = await prisma.account.findUnique({
                where: {
                    id: accountId,
                },
            });
            if (!account) {
                res.status(200).json({
                    success: false,
                    message: "Tài khoản không tồn tại !",
                });
            } else {
                const comparePassword = await bcrypt.compare(
                    oldPassword,
                    account.password
                );
                if (!comparePassword) {
                    return res.status(200).json({
                        success: false,
                        message: "Mật khẩu cũ không đúng !",
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(newPassword, salt);
                    await prisma.account.update({
                        where: {
                            id: account.id,
                        },
                        data: {
                            password: hashedPassword,
                        },
                    });
                    // account.password = hashedPassword;
                    // await account.save();
                    return res.status(200).json({
                        success: true,
                        message: "Đổi mật khẩu thành công",
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async scanIdCard(req, res) {
        try {
            const currentUser = await getCurrentUser(req);
            const account = await prisma.account.findUnique({
                where: {
                    id: currentUser,
                },
            });

            if (!req.files || !req.files.imageFront || !req.files.imageBack) {
                return res.status(400).json({
                    error: "Both images (imageFront and imageBack) are required",
                });
            }
            const imageFrontUrl = req.files.imageFront[0].path;
            const imageBackUrl = req.files.imageBack[0].path;

            const imageFrontResponse = await fetch(imageFrontUrl);
            const imageFrontBuffer = await imageFrontResponse.buffer();

            const imageBackResponse = await fetch(imageBackUrl);
            const imageBackBuffer = await imageBackResponse.buffer();

            const formFront = new FormData();
            formFront.append("image", imageFrontBuffer, {
                filename: req.files.imageFront[0].originalname,
                contentType: req.files.imageFront[0].mimetype,
            });

            const formBack = new FormData();
            formBack.append("image", imageBackBuffer, {
                filename: req.files.imageBack[0].originalname,
                contentType: req.files.imageBack[0].mimetype,
            });
            const [responseFront, responseBack] = await Promise.all([
                axios.post('https://api.fpt.ai/vision/idr/vnm', formFront, {
                  headers: {
                    ...formFront.getHeaders(),
                    Accept: 'application/json',
                    api_key: 'OjBTWquTWYqaRuKJu3JX8KCW3f9vHYox',
                  },
                }),
                axios.post('https://api.fpt.ai/vision/idr/vnm', formBack, {
                  headers: {
                    ...formBack.getHeaders(),
                    Accept: 'application/json',
                    api_key: 'OjBTWquTWYqaRuKJu3JX8KCW3f9vHYox',
                  },
                })
              ]);
            const dataIdentifyCardFront = responseFront.data.data[0];
            const dataIdentifyCardBack = responseBack.data.data[0];
            const data = await prisma.identifycard.create({
                data: {
                    accountId: currentUser,
                    identifyName: dataIdentifyCardFront.name,
                    identifyNumber: dataIdentifyCardFront.id,
                    dob: dataIdentifyCardFront.dob,
                    gender: dataIdentifyCardFront.sex,
                    address: dataIdentifyCardFront.address,
                    issueDate: dataIdentifyCardBack.issue_date,
                    issueLoc: dataIdentifyCardBack.issue_loc,
                    imageFrontSide: imageFrontUrl,
                    imageBackSide: imageBackUrl
                },
            });
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message: error.toString(),
            });
        }
    }
}

export default new AccountService();
