import * as React from 'react';
import {useEffect, useState} from 'react';
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import Title from '../structur/Title';
import {useGetAmountGropedByDay} from "@/fetchApi/registerRequest/useGetAmountGropedByDay";
import {ChartModel} from "../../../prisma/models/ChartModel";
import {mdTheme} from "@/utils/themen/themeCreator";


const useHookChart=(month:string)=>{

    const [registers, setRegisters] = useState<ChartModel[]>([])

    const getAllRegisters = useGetAmountGropedByDay();

    useEffect(() => {
        const fetchData = fetchingData(getAllRegisters, setRegisters)
        fetchData(month)}, [getAllRegisters, month])

    function fetchingData(getAllRegisters: () => Promise<Response>,
                         setRegisters: (value: (((prevState: ChartModel[]) => ChartModel[]) | ChartModel[])) => void)
    {
        return async (month: string) => {
            const allRegisters = await getAllRegisters();
            const registers = await allRegisters.json() as ChartModel[];
            //Just a Month
            const filterRegistersc = month ? registers.filter(value => {
                return (value.date.slice(5, 7) == month) ? value : null;
            }) : registers;
            //Char Model
            const charModel: ChartModel[] = filterRegistersc.map(value => {
                return {
                    date: value.date.slice(5, 10),
                    amount: value.amount
                }
            });
            setRegisters(charModel)
        };
    }
    return{
        registers
    }
}


export default function Chart({month}:{month:string}) {

    const hookChart = useHookChart(month)

    return (
        <React.Fragment>
            <Title>Grafica de ventas</Title>
            <ResponsiveContainer>
                <LineChart
                    data={hookChart.registers}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="date"
                        stroke={mdTheme.palette.text.secondary}
                        style={mdTheme.typography.body2}
                    />
                    <YAxis
                        stroke={mdTheme.palette.text.secondary}
                        style={mdTheme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: mdTheme.palette.text.primary,
                                ...mdTheme.typography.body1,
                            }}
                        >
                            Ventas
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={mdTheme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}