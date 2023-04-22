import type {NextApiRequest, NextApiResponse} from 'next'
// @ts-ignore
import prisma from "../../../../lib/prisma";
import {RegisterModel} from "../../../../prisma/models/RegisterModel";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterModel[] | RegisterModel>
) {
    if (req.method == 'GET') {
        const getAll = await prisma.register.findMany();
        const miArrayOrdenado: RegisterModel[] = [...getAll].sort((a, b) => {
            const fechaA = new Date(a.date);
            const fechaB = new Date(b.date);
            return fechaA.getTime() - fechaB.getTime();
        });
        res.status(200).json(miArrayOrdenado);
    } else if (req.method == 'POST') {
        const saveRegister = await prisma.register.create({data: req.body});
        res.status(200).json(saveRegister)
    }
}