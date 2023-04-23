import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './structur/Title';
import {useGetTotalIva} from "@/fetchApi/registerRequest/useGetTotalIva";
import {TotalSellsModel} from "../../prisma/models/TotalSellsModel";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TableCell from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function TotalSellsComponent() {
    const [totalIva, setTotalIvaState] = useState<TotalSellsModel>({
        totalIva: 0,
        from: '',
        until: '',
        totalSells:0
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getTotalIva = useCallback(useGetTotalIva(),[]);

    useEffect(() => {
        const getTotalObject = async () => {
            const totalIva = await getTotalIva().then(res => res.json());
            console.log("fetched total Iva", totalIva)
            setTotalIvaState(totalIva);
        }
        getTotalObject()

    }, [getTotalIva])
    return (
        <React.Fragment>
            <Title>Ventas Totales</Title>
            <Typography component="p" variant="h6" sx={{pt:2}}>
                IVA: {(totalIva.totalIva).toString().slice(0, 10)}
            </Typography>
            <Typography component="p" variant="h6">
                Total: {(totalIva.totalSells).toString().slice(0, 10)}
            </Typography>
            <Divider sx={{my:2}} ></Divider>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Grid sx={{pr:10}}>
                    <Typography color="text.primary" sx={{flex: 1}}>
                        from
                    </Typography>
                    <Typography color="text.secondary" sx={{flex: 1}}>
                        {totalIva.from.slice(2, 10)}
                    </Typography>
                </Grid>
                <Grid >
                    <Typography color="text.primary" sx={{flex: 1}}>
                        until
                    </Typography>
                    <Typography color="text.secondary" sx={{flex: 1}}>
                        {totalIva.until.slice(2, 10)}
                    </Typography>
                </Grid>
            </div>
        </React.Fragment>
    );
}