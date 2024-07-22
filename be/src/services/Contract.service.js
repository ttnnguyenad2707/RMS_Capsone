import prisma from "../utils/prismaClient.js";
import fs from "fs";
import path from "path";
import pkg from "@pdftron/pdfnet-node";
const { PDFNet } = pkg;
import { fileURLToPath } from "url";
import getCurrentUser from "../utils/getCurrentUser.js";
import PDFNetEndpoint from "../utils/PDFNetEndPoint.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesPath = "../../contractFile";
const templateContract = "./templateContract.docx.pdf";

const ContractService = {
    downloadContract: async (req, res) => {
        try {
            const {contractId} = req.params;
            const contract = await prisma.contract.findUnique({
                where: { id: contractId },
               
            });
            const creator = await prisma.account.findUnique({
                where: { id: contract.creatorId },
                include: { identifycard: true },
            });
            const memberSignatory = await prisma.members.findUnique({
                where: { id: contract.signatory },
            });
            
           

            const inputPath = path.resolve(
                __dirname,
                filesPath,
                templateContract
            );
            const outputPath = path.resolve(
                __dirname,
                filesPath,
                `contract-${roomId}.pdf`
            );

            const main = async () => {
                const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(
                    inputPath
                );
                await pdfdoc.initSecurityHandler();
                const replacer = await PDFNet.ContentReplacer.create();
                const addStringsToPage = async (page) => {
                    await replacer.addString(
                        "currentAddress",
                        contract.currentAddress
                    );
                    await replacer.addString(
                        "nowDay",
                        contract.startDate.getDay().toString()
                    );
                    await replacer.addString(
                        "nowMonth",
                        contract.startDate.getMonth().toString()
                    );
                    await replacer.addString(
                        "nowYear",
                        contract.startDate.getFullYear().toString()
                    );

                    await replacer.addString(
                        "ownerName",
                        creator.identifycard.identifyName || ""
                    );
                    await replacer.addString(
                        "ownerDOB",
                        creator.identifycard.dob || ""
                    );
                    await replacer.addString(
                        "ownerAddress",
                        creator.identifycard.address || ""
                    );
                    await replacer.addString(
                        "ownerIdentifyNumber",
                        creator.identifycard.identifyNumber || ""
                    );
                    await replacer.addString(
                        "ownerIdentifyCreated",
                        creator.identifycard.issueDate || ""
                    );
                    await replacer.addString(
                        "ownerIdentifyCardIssuedBy",
                        creator.identifycard.issueLoc || ""
                    );
                    await replacer.addString("ownerPhone", creator.phone || "");

                    await replacer.addString(
                        "memberName",
                        memberSignatory.name || ""
                    );
                    await replacer.addString(
                        "memberDOB",
                        memberSignatory.dob || ""
                    );
                    await replacer.addString(
                        "memberAddress",
                        memberSignatory.address || ""
                    );
                    await replacer.addString(
                        "memberIdentifyNumber",
                        memberSignatory.cccd || ""
                    );
                    await replacer.addString(
                        "memberIdentifyCreated",
                        memberSignatory.issueDate || ""
                    );
                    await replacer.addString(
                        "memberIdentifyCardIssuedBy",
                        memberSignatory.issueLoc || ""
                    );
                    await replacer.addString(
                        "memberPhone",
                        memberSignatory.phone || ""
                    );

                    await replacer.addString(
                        "roomAddress",
                        room.house.locationschema.detailLocation || ""
                    );
                    await replacer.addString(
                        "roomPrice",
                        room.roomPrice.toString()
                    );
                    await replacer.addString(
                        "roomPriceElectric",
                        result.electric.toString()
                    );
                    await replacer.addString(
                        "roomPriceWater",
                        result.water.toString()
                    );
                    await replacer.addString(
                        "roomDeposit",
                        room.deposit.toString()
                    );

                    await replacer.addString(
                        "expiredDay",
                        expiredDate.getDate().toString()
                    );
                    await replacer.addString(
                        "expiredMonth",
                        (expiredDate.getMonth() + 1).toString()
                    );
                    await replacer.addString(
                        "expiredYear",
                        expiredDate.getFullYear().toString()
                    );

                    await replacer.process(page);
                };
                const page1 = await pdfdoc.getPage(1);
                await addStringsToPage(page1);
                const page2 = await pdfdoc.getPage(2);
                await addStringsToPage(page2);
                pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
            };
            PDFNetEndpoint(main, outputPath, res);
        } catch (error) {
            throw error;
        }
    },
    addOne: async(req,res) => {
        try {
            const { roomId } = req.params;
            const { signatory, duration, note, currentAddress } = req.body;
            const creatorId = getCurrentUser(req);
            // const creator = await prisma.account.findUnique({
            //     where: { id: creatorId },
            //     include: { identifycard: true },
            // });
            // const memberSignatory = await prisma.members.findUnique({
            //     where: { id: signatory },
            // });
            const room = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                include: {
                    house: true,
                    house: {
                        include: { locationschema: true, pricelistitem: true },
                    },
                },
            });
            const pricelistItems = await prisma.pricelistitem.findMany({
                where: {
                    houseId: room.houseId,
                    defaultprice: {
                        name: {
                            in: [
                                "Tiền điện theo số (kWh)",
                                "Tiền nước theo khối",
                            ],
                        },
                    },
                },
                include: {
                    defaultprice: true,
                },
            });
            let result = { electric: null, water: null };

            pricelistItems.forEach((item) => {
                if (item.defaultprice.name === "Tiền điện theo số (kWh)") {
                    result.electric = item.price;
                } else if (item.defaultprice.name === "Tiền nước theo khối") {
                    result.water = item.price;
                }
            });
            let currentDate = new Date();
            let expiredDate = new Date(currentDate);
            expiredDate.setMonth(expiredDate.getMonth() + parseInt(duration));
            const contract = await prisma.contract.create({
                data: {
                    currentAddress:currentAddress,
                    startDate: currentDate,
                    endDate: expiredDate,
                    roomId: parseInt(roomId),
                    roomPrice:room.roomPrice,
                    roomDeposit: room.deposit,
                    roomElectric: result.electric,
                    roomWater: result.water,
                    signatory: signatory,
                    isExpired: false,
                    note: note,
                    creatorId: creatorId
                }
            })
            return contract;
        } catch (error) {
            throw error;
            
        }
    }
    
};
export default ContractService;
