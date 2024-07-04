import Account from "../models/Account.model.js";
import bcrypt from "bcrypt";
import getCurrentUser from "../utils/getCurrentUser.js";
import prisma from "../utils/prismaClient.js";

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
                            id: account.id
                        },
                        data: {
                            password: hashedPassword
                        }
                    })
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
}

export default new AccountService();
