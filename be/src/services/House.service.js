import { connect } from "mongoose";
import DefaultPriceModel from "../models/DefaultPrice.model.js";
import HousesModel from "../models/Houses.model.js";
import RoomsModel from "../models/Rooms.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import prisma from "../utils/prismaClient.js";

const HouseService = {
    addHouse: async (req) => {
        try {
            const {
                name,
                status,
                location,
                electricPrice,
                waterPrice,
                utilities,
                otherUtilities,
                rules,
            } = req.body;

            const defaultPriceWater = await prisma.defaultprice.findFirst({
                where: {
                    name: "Tiền nước theo khối",
                },
            });
            const defaultPriceElectric = await prisma.defaultprice.findFirst({
                where: {
                    name: "Tiền điện theo số (kWh)",
                },
            });

            const priceList = [
                {
                    baseId: defaultPriceWater.id,
                    price: waterPrice,
                },
                {
                    baseId: defaultPriceElectric.id,
                    price: electricPrice,
                },
            ];

            const locationData = await prisma.locationschema.create({
                data: location,
            });
            const hostId = getCurrentUser(req);
            const house = await prisma.house.create({
                data: {
                    name,
                    status,
                    locationId: locationData.id,
                    electricPrice,
                    waterPrice,
                    pricelistitem: {
                        create: priceList,
                    },
                    housedefaultutilities: {
                        create: utilities.map((utilId) => ({
                            defaultutilities: {
                                connect: { id: parseInt(utilId) },
                            },
                        })),
                    },
                    houseotherutilities: {
                        create: otherUtilities.map((utilId) => ({
                            otherutilities: {
                                connect: { id: parseInt(utilId) },
                            },
                        })),
                    },
                    hostId,
                },
            });

            return house;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    getHouses: async (req) => {
        try {
            const hostId = getCurrentUser(req);
            const { page, limit, option } = req.query;
            const pageNumber = parseInt(page) || 1;
            const limitPerPage = parseInt(limit) || 10;
            const skip = (pageNumber - 1) * limitPerPage;

            const totalHouses = await prisma.house.count({
                where: {
                    hostId: hostId,
                },
            });
            const totalPages = Math.ceil(totalHouses / limitPerPage);
            let data;
            const includeRelations = {
                locationschema: true,
                account: true,
                housedefaultutilities: {
                    include: {
                        defaultutilities: true,
                    },
                },
                houseotherutilities: {
                    include: {
                        otherutilities: true,
                    },
                },
                news: true,
                pricelistitem: {
                    include: {
                        defaultprice: true,
                    },
                },
            };
            if (String(option) === "all") {
                data = await prisma.house.findMany({
                    where: {
                        hostId: hostId,
                    },
                    include: includeRelations,
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                return {
                    houses: data,
                };
            } else {
                data = await prisma.house.findMany({
                    where: {
                        hostId: hostId,
                    },
                    include: includeRelations,
                    skip: skip,
                    take: limitPerPage,
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                return {
                    pagination: {
                        currentPage: pageNumber,
                        totalPages: totalPages,
                        totalHouses: totalHouses,
                        housesPerPage: data.length,
                    },
                    houses: data,
                };
            }
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    updateOne: async (req) => {
        try {
            const { houseId } = req.params;
            const { name, status, location } = req.body;
            const { district, ward, province, detailLocation } = location;
            const updatedHouse = await prisma.house.update({
                where: {
                    id: parseInt(houseId),
                },
                data: {
                    name,
                    status,
                    locationschema: {
                        update: {
                            district,
                            ward,
                            province,
                            detailLocation,
                        },
                    },
                }
            });
            return updatedHouse;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    getOne: async (req) => {
        try {
            const { houseId } = req.params;
            const data = await prisma.house.findUnique({
                where: {
                    id: parseInt(houseId),
                },
                include: {
                    locationschema: true,
                    account: true,
                    housedefaultutilities: {
                        include: {
                            defaultutilities: true,
                        },
                    },
                    houseotherutilities: {
                        include: {
                            otherutilities: true,
                        },
                    },
                    news: true,
                    pricelistitem: {
                        include: {
                            defaultprice: true,
                        },
                    },
                },
                
            });
            

            return data;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    deleteOne: async (req) => {
        try {
            const { houseId } = req.params;
            await HousesModel.findByIdAndUpdate(houseId, {
                deleted: true,
                deletedAt: Date.now(),
            });
            const newData = await HousesModel.findById(houseId);
            await RoomsModel.updateMany(
                { houseId },
                { deleted: true, deletedAt: Date.now() }
            );
            return newData;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    addPriceItem: async (req) => {
        try {
            const { houseId } = req.params;
            const { base, price } = req.body;
            const house = await prisma.house.findUnique({
                where: {
                    id: parseInt(houseId),
                },
                include: {
                    pricelistitem: true,
                },
            })
            const existingPriceItem = house.priceList.find(
                (item) => item.baseId === base
            );
            if (existingPriceItem) {
                throw new Error("Đơn giá đã được tồn tại");
            }
            const newPriceItem = await prisma.pricelistitem.create({
                data: {
                  baseId: parseInt(base),
                  price: parseFloat(price),
                  house: {
                    connect: { id: parseInt(houseId) },
                  },
                },
                include: {
                  defaultprice: true, // Include related defaultprice if needed
                },
              });
          
              return newPriceItem;
        } catch (error) {
            throw error;
        }
    },
    updatePriceItem: async (req) => {
        try {
            const { houseId } = req.params;
            const { id, base, price } = req.body;
        } catch (error) {
            throw error;
        }
    },
    removePriceItem: async (req) => {
        try {
            const { houseId, priceItemId } = req.params;

            const house = await HousesModel.findById(houseId);

            const indexToRemove = house.priceList.findIndex(
                (item) => item._id.toString() === priceItemId
            );
            if (indexToRemove === -1) {
                throw new Error("Price item not found");
            }

            house.priceList.splice(indexToRemove, 1);
            await house.save();

            return { message: "Đơn giá xoá thành công" };
        } catch (error) {
            throw error;
        }
    },
};

export default HouseService;
