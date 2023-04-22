import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {PdfDownloadComponent} from "./pdfDownloadComponent";
import {Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export type pdfStructur = {
    filename: string,
    conIva: string,
    url: string,
    totalSinIva: string,
    date: string
}
const pdfInitalStructur: pdfStructur = {
    filename: '',
    url: '',
    conIva: '',
    totalSinIva: '',
    date: ''
}

export const PdfContent = () => {

    const [pdf, setPdf] = useState(pdfInitalStructur);


    return (
        <div>
            <PdfDownloadComponent setPdf={setPdf} pdf={pdf}></PdfDownloadComponent>

            <Divider sx={{p: 2}}/>
            <Grid
                container
                spacing={0}
                direction="column"
                style={{}}
            >
                <Grid
                    container
                    spacing={0}
                    direction="row">
                    <Box sx={{pt: 2, pr: 1}}>
                        <Typography variant={"inherit"}>
                            Name:
                        </Typography>
                    </Box>
                    <Box sx={{pt: 2}}>
                        <Typography component="p" paragraph={true}>
                            {pdf.filename}
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                >
                    <Box sx={{pr: 1}}>
                        <Typography variant={"inherit"}>
                            IVA:
                        </Typography>
                    </Box>
                    <Box>
                        <Typography component="p" paragraph={true}>
                            {pdf.conIva}
                        </Typography>
                    </Box>

                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                >
                    <Box sx={{pr: 1}}>
                        <Typography variant={"inherit"}>
                            Total sin IVA:
                        </Typography>
                    </Box>
                    <Box>
                        <Typography component="p" paragraph={true}>
                            {pdf.totalSinIva}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={3} alignItems="center">
                    {pdf.url && (
                        <Document file={pdf.url}>
                            <Page pageNumber={1}/>
                        </Document>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
