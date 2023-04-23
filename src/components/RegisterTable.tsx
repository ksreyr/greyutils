import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './structur/Title';
import {useGetAllRegisters} from "@/fetchApi/registerRequest/useGetAllRegisters";
import {RegisterModel} from "../../prisma/models/RegisterModel";
import {Button} from "@mui/material";
import {handleDownload} from "@/utils/pdf/downloadPDF";
import {Download} from "@mui/icons-material";
import {useGetRegistersByMonth} from "@/fetchApi/registerRequest/useGetRegistersByMonth";


function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}


export default function RegisterTable() {

    const [registers, setRegister] = useState<RegisterModel[]>([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllRegister = useCallback(useGetAllRegisters(), []);

    useEffect(() => {
        const fetchRegister = async () => {
            const allRegister = await getAllRegister().then(res => res.json())
            console.log("fetched all registers", allRegister)
            setRegister(allRegister)
        }
        fetchRegister();
    }, [getAllRegister])
    return (
        <React.Fragment>
            <Title>Register Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Consecutive</TableCell>
                        <TableCell>IVA</TableCell>
                        <TableCell>Total Sin Iva</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {registers.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date.slice(0, 10)}</TableCell>
                            <TableCell>{row.number}</TableCell>
                            <TableCell>{row.iva}</TableCell>
                            <TableCell>{row.totalSinIva}</TableCell>
                            <TableCell>{row.totalSinIva + row.iva}</TableCell>
                            <TableCell align="right"><Button variant="outlined"
                                               fullWidth={true}
                                               onClick={()=>handleDownload(row.totalSinIva.toString(), row.iva.toString())}
                                               startIcon={<Download/>}>
                                Download Excel
                            </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{mt: 3}}>
                See more orders
            </Link>
        </React.Fragment>
    );
}