
import path from "path";

import fs from "fs";
import pkg from "@pdftron/pdfnet-node";
const { PDFNet } = pkg;
import mimeType from "../../modules/mimeType.js";

const PDFNetEndpoint = (main, pathname, res) => {
    PDFNet.runWithCleanup(main,"demo:1721146611810:7f95f64e0300000000e8fe9c60cc43e017bb6377e3ae8324e830c8ac98") // you can add the key to PDFNet.runWithCleanup(main, process.env.PDFTRONKEY)
        .then(() => {
            PDFNet.shutdown();
            fs.readFile(pathname, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(`Error getting the file: ${err}.`);
                } else {
                    const ext = path.parse(pathname).ext;
                    res.setHeader(
                        "Content-type",
                        mimeType[ext] || "text/plain"
                    );
                    res.end(data);
                }
            });
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
};

export default PDFNetEndpoint