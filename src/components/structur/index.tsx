import Box from "@mui/material/Box";
import {AppBarContent} from "@/components/structur/appBar";
import {Drawler} from "@/components/drawler";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import * as React from "react";
import {Copyright} from "@/components/structur/copyright/Copyright";

export const Structur = ({children}:{children:React.ReactNode}) => {
    return (
        <Box sx={{display: "flex"}}>
            <AppBarContent/>
            <Drawler/>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    {children}
                    <Copyright props={''}/>
                </Container>
            </Box>
        </Box>
    )

}