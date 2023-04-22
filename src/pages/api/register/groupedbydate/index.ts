import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../../../lib/prisma";

import {RegisterModel} from "../../../../../prisma/models/RegisterModel";
import {ChartModel} from "../../../../../prisma/models/ChartModel";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ChartModel[]>) {
    if (req.method == 'GET') {
        // @ts-ignore
        const allRegister: RegisterModel[] = await prisma.register.findMany();
        const registerDates = allRegister.map(value => value.date.slice(0, 10));
        const notReplyDates = Array.from(new Set(registerDates))
        const chartTypeEntries: ChartModel[] = notReplyDates.map(dateAtIterator => {

            const filteredRegisters = allRegister.filter(value => new Date(value.date).toISOString().substr(0, 10) === dateAtIterator);
            const totalAmount = filteredRegisters.reduce((acc, curr) => acc + curr.totalSinIva, 0);

            const datesArray: ChartModel = {
                date: dateAtIterator,
                amount: totalAmount
            }
            return datesArray
        })
        const sortedArray: ChartModel[] = [...chartTypeEntries].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });

        res.status(200).json(sortedArray)
    }

}