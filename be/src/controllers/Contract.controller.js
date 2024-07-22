import asyncHandler from "../utils/async-handler.js";
import response from "../utils/response.js";
import fs from "fs";
import path from "path";
import pkg from "@pdftron/pdfnet-node";
const { PDFNet } = pkg;
import { fileURLToPath } from "url";
const filesPath = "../../contractFile/templateContract";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import PDFNetEndpoint from "../utils/PDFNetEndPoint.js";
import ContractService from "../services/Contract.service.js";
const ContractController = {
    convert: asyncHandler (async (req, res) => {
        try {
            const filename = req.params.filename;
            let ext = path.parse(filename).ext;

            const inputPath = path.resolve(__dirname, filesPath, filename);
            const outputPath = path.resolve(
                __dirname,
                filesPath,
                `${filename}.pdf`
            );

            if (ext === ".pdf") {
                res.statusCode = 500;
                res.end(`File is already PDF.`);
            }

            const main = async () => {
                const pdfdoc = await PDFNet.PDFDoc.create();
                await pdfdoc.initSecurityHandler();
                await PDFNet.Convert.toPdf(pdfdoc, inputPath);
                pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
              };
            
              PDFNetEndpoint(main, outputPath, res);
        } catch (error) {
            throw error;
        }
    }),
    addOne: asyncHandler(async (req,res) => {
        try {
            await ContractService.addOne(req,res);
            
        } catch (error) {
            
            return res.status(500).json(response.errorResponse(500,error.toString()))
            
        }
    }),
    downloadContract: asyncHandler(async (req, res) => {
        const { roomId } = req.params;
        const CONTRACT_PATH = `./contractFile/contract-${roomId}.pdf`;
        
        // Check if the file exists
        if (!fs.existsSync(CONTRACT_PATH)) {
            return res.status(404).send('Contract not found');
        }
    
        const contractFileStream = fs.createReadStream(CONTRACT_PATH);
        const contractFileName = path.basename(CONTRACT_PATH);
        
        res.setHeader('Content-disposition', `attachment; filename=${contractFileName}`);
        res.setHeader('Content-type', 'application/pdf');
    
        contractFileStream.pipe(res);
    }),
    updateContract: asyncHandler(async (req,res) => {
        try {
            const contract = await ContractService.updateContract(req,res);
            return res.status(200).json(response.successResponse(200,contract));
        } catch (error) {
            
            return res.status(500).json(response.errorResponse(500,error.toString()))
            
        }
    }),
   
};
export default ContractController;
