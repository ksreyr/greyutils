import type {AppProps} from 'next/app'
import {UIProvider} from "@/context/UIProvider";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import {mdTheme} from "@/utils/themen/themeCreator";
import {SessionProvider} from "next-auth/react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from '@mui/x-date-pickers';

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {

    return (
        <SessionProvider session={session}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <UIProvider>
                    <CssBaseline/>
                    <Component {...pageProps} />
                    <ThemeProvider theme={mdTheme}>
                    </ThemeProvider>
                </UIProvider>
            </LocalizationProvider>
        </SessionProvider>
    )
}
