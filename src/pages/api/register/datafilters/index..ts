import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../../../lib/prisma";
import {RegisterModel} from "../../../../../prisma/models/RegisterModel";
import {TotalSellsModel} from "../../../../../prisma/models/TotalSellsModel";


async function getSortedRegisterArrray() {
    const findMany = await prisma.register.findMany();
    const sortedArray: RegisterModel[] = [...findMany].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });
    return {sortedArray};
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TotalSellsModel | RegisterModel[]>) {
    switch (req.method) {
        case 'GET':
            const { sortedArray: sortedArrayGet} = await getSortedRegisterArrray();
            const totalIva = sortedArrayGet.reduce((prev: number, current: RegisterModel) => {
                return current.iva ? current.iva + prev : prev
            }, 0);
            const totalSinIva = sortedArrayGet.reduce((prev: number, current: RegisterModel) => {
                return current.totalSinIva ? current.totalSinIva + prev : prev
            }, 0);

            const from = sortedArrayGet.at(0)?.date.toString() || '';
            const until = sortedArrayGet.reverse().at(0)?.date.toString() || '';

            return res.status(200)
                .json( {
                    totalIva: totalIva,
                    totalSells: totalSinIva,
                    from: from,
                    until: until
                })
        
        case 'POST':

            const { sortedArray: sortedArrayPost } = await getSortedRegisterArrray();
            const { month } = req.body

            const filterdArray = sortedArrayPost.filter(
                value =>
                {
                    return value.date.slice(5,7)==month?value:null
                })
            return res.status(200).json(filterdArray)

        default:
            // @ts-ignore
            return res.status(405).json('Method not allowed')
    }

}