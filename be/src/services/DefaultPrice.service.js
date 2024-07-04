import DefaultPriceModel from "../models/DefaultPrice.model.js"
import prisma from "../utils/prismaClient.js";

const DefaultPriceService = {
    addOne: async ( req )=> {
        try {
            
            // const data = await DefaultPriceModel.create({...req.body});
            const data = await prisma.defaultprice.create({
                data: {
                    ...req.body
                }
            })
            return data
        } catch (error) {
            throw error
        }
    },
    getOne: async (req) => {
        try {
            const {defaultPriceId} = req.params;
            // const data = await DefaultPriceModel.findById(defaultPriceId);
            const data = await prisma.defaultprice.findUnique({
                where: {
                    id:  Number(defaultPriceId)
                }
            })
            return data;
        } catch (error) {
            throw error
        }
    },
    getAll: async (req) => {
        try {
            
            // const data = await DefaultPriceModel.find({});
            const data = await prisma.defaultprice.findMany();

            return data;
        } catch (error) {
            throw error
        }
    }
}

export default DefaultPriceService