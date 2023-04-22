import {Structur} from "@/components/structur";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {MobileDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useGetRegistersByMonth} from "@/fetchApi/registerRequest/useGetRegistersByMonth";
import {RegisterModel} from "../../../prisma/models/RegisterModel";
import {useState} from "react";
import {Download, FileUpload} from "@mui/icons-material";
import {Button} from "@mui/material";
import Chart from "@/components/chart";



export default function Reports() {
    const getRegistersByMonth = useGetRegistersByMonth();
    const [cvsToSave, setCVSToSave]= useState<string>('')
    const [monthString, setMonthString] = useState<string>('')
    async function handleChange(event: Date | null) {
        const month = dayjs(event).format('MM');
        setMonthString(month)
        const request={month}
        const registrationByMonth = await getRegistersByMonth(request).then(res => res.json()) as RegisterModel[];
        const headers = Array.from(new Set(registrationByMonth.flatMap(Object.keys)));

        const csv = [
            // @ts-ignore
            headers.join(','), ...registrationByMonth.map((fila) => headers.map((header) => fila[header] ?? '').join(',')),
        ].join('\n');
        setCVSToSave(csv)
        console.log("Recods",registrationByMonth);
    }

    function handleDownload() {
        const blob = new Blob([cvsToSave], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "datos.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <Structur>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                    <MobileDatePicker
                        // @ts-ignore
                        maxDate={dayjs('2024-04-17')} minDate={dayjs('2023-04-17')} defaultValue={dayjs('2023-04-17')}
                        onChange={handleChange}
                    />
                    <Button variant="outlined"
                            fullWidth={true}
                            disabled={cvsToSave==''}
                            onClick={() => handleDownload()}
                            startIcon={<Download/>}
                            sx={{mt:4}}>
                        Download CSV
                    </Button>
                </Paper>

            </Grid>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 340,
                    }}
                >
                    <Chart month={monthString}/>
                </Paper>
            </Grid>

        </Structur>
    );
}