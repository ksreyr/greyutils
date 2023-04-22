import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "@/components/chart";
import TotalSellsComponent from "@/components/TotalSellsComponent";
import RegisterTable from "@/components/RegisterTable";
import * as React from "react";

export const DashBoadContent = () => {
    return (
        <Grid container spacing={3}>
            {/* Index */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 340,
                    }}
                >
                    <Chart month={''}/>
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 340,
                    }}
                >
                    <TotalSellsComponent/>
                </Paper>
            </Grid>
            {/* Recent RegisterTable */}
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                    <RegisterTable/>
                </Paper>
            </Grid>
        </Grid>
    )
}