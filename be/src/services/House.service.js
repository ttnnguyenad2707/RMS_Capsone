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
            const existHouseByName = await prisma.house.findUnique({
                where: {
                    name,
                },
            })
            if (existHouseByName){
                throw new Error("Toà Nhà " + name + " đã tồn tại")
            }
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
                room: {
                    select: {
                        id: true,
                    }
                }
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
                },
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

            // Update the house to set deleted and deletedAt fields
            const updatedHouse = await prisma.house.update({
                where: {
                    id: parseInt(houseId),
                },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
                include: {
                    room: true, // Include related rooms if needed
                },
            });

            // Update all rooms associated with the house to set deleted and deletedAt fields
            await prisma.room.updateMany({
                where: {
                    houseId: parseInt(houseId),
                },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });

            return updatedHouse;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    addPriceItem: async (req) => {
        try {
            const { houseId } = req.params;
            const { base, price } = req.body;

            // Check if the house exists and fetch its price list items
            const house = await prisma.house.findUnique({
                where: {
                    id: parseInt(houseId),
                },
                include: {
                    pricelistitem: true,
                },
            });

            if (!house) {
                throw new Error(`House with ID ${houseId} not found.`);
            }

            // Check if the price item already exists
            const existingPriceItem = house.pricelistitem.find(
                (item) => item.baseId === parseInt(base)
            );

            if (existingPriceItem) {
                throw new Error("Đơn giá đã được tồn tại");
            }

            // Create new price list item
            const newPriceItem = await prisma.pricelistitem.create({
                data: {
                    baseId: parseInt(base),
                    price: parseFloat(price),
                    houseId: parseInt(houseId),
                },
                include: {
                    defaultprice: true, // Include related defaultprice if needed
                },
            });

            return newPriceItem;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    updatePriceItem: async (req) => {
        try {
            const { houseId, priceItemId } = req.params;
            const { base, price } = req.body;
        
            // Find the house to ensure it exists
            const house = await prisma.house.findUnique({
              where: {
                id: parseInt(houseId),
              },
              include: {
                pricelistitem: true,
              },
            });
        
            if (!house) {
              throw new Error(`House with ID ${houseId} not found.`);
            }
        
            // Check if the price item exists in the house's price list
            const priceItem = house.pricelistitem.find(
              (item) => item.id === parseInt(priceItemId)
            );
        
            if (!priceItem) {
              throw new Error("Price item not found");
            }
        
            // Update only the price field of the price item
            const updatedPriceItem = await prisma.pricelistitem.update({
              where: {
                id: parseInt(priceItemId),
              },
              data: {
                price: parseFloat(price),
              },
            });
        
            return updatedPriceItem;
          } catch (error) {
            throw new Error(error.toString());
          }
    },
    removePriceItem: async (req) => {
        try {
            const { houseId, priceItemId } = req.params;

            // Find the house to ensure it exists
            const house = await prisma.house.findUnique({
                where: {
                    id: parseInt(houseId),
                },
                include: {
                    pricelistitem: true,
                },
            });

            if (!house) {
                throw new Error(`House with ID ${houseId} not found.`);
            }

            // Check if the price item exists in the house's price list
            const priceItem = house.pricelistitem.find(
                (item) => item.id === parseInt(priceItemId)
            );

            if (!priceItem) {
                throw new Error("Price item not found");
            }

            // Delete the price item
            await prisma.pricelistitem.delete({
                where: {
                    id: parseInt(priceItemId),
                },
            });

            return { message: "Đơn giá xoá thành công" };
        } catch (error) {
            throw new Error(error.toString());
        }
    },
};

export default HouseService;
