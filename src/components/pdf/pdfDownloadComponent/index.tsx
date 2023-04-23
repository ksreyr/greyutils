import {Button} from "@mui/material";
import {Download, FileUpload} from "@mui/icons-material";
import * as React from "react";
import {ChangeEvent} from "react";
import {pdfStructur} from "@/components/pdf/pdfContent";
import {useCreateRegister} from "@/fetchApi/registerRequest/useCreateRegister";
import {RegisterModel} from "../../../../prisma/models/RegisterModel";
import {getInfoFromText} from "@/utils/textUtils";
import {handleDownload} from "@/utils/pdf/downloadPDF";
import {pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PdfDownloadComponent = ({setPdf, pdf}: { setPdf: any, pdf: pdfStructur }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const createRegister = useCreateRegister();

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            alert("Selecciona un archivo PDF");
            return;
        }
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        console.log("URL ", url)
        console.log("pdfjs version ", pdfjs.version)
        const pdf = await pdfjs.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();

        // @ts-ignore
        const text = textContent.items.map((item) => item.str).join("");
        const {totalSinIva, conIva, date} = getInfoFromText(text);
        const filename = file.name.split('.')[0] ? file.name.split('.')[0] : file.name;
        const pdfToSave: pdfStructur = {
            conIva: conIva,
            filename: filename,
            url: url,
            totalSinIva: totalSinIva,
            date: date
        }
        const toSaveRegister: RegisterModel = {
            company: "helados",
            user: "admin",
            iva: parseFloat(conIva.replace(',', '')),
            totalSinIva: parseFloat(totalSinIva.replace(',', '')),
            number: parseInt(filename),
            date: date
        }
        await createRegister(toSaveRegister).then(res => res.json())
        setPdf(pdfToSave);
    };


    return(<>
            <Button
                component="label"
                variant="outlined"
                fullWidth={true}
                startIcon={<FileUpload/>}
            >
                Upload PDF
                <input type="file" accept="application/pdf" hidden onChange={handleFileChange}/>
            </Button>
            <Button variant="outlined"
                    fullWidth={true}
                    disabled={!pdf.url}
                    onClick={() => handleDownload(pdf.totalSinIva, pdf.conIva)}
                    startIcon={<Download/>}>
                Download Excel
            </Button>
        </>)
}