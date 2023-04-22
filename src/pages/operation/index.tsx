import * as React from "react";
import {Structur} from "@/components/structur";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {PdfContent} from "@/components/pdf/pdfContent";

export default function Operation() {
    return (
        <Structur>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                    <PdfContent/>
                </Paper>
            </Grid>
        </Structur>
    );
}