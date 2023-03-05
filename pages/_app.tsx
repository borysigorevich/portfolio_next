import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {ThemeProvider} from '@mui/material/styles'
import 'animate.css';


import {theme} from '@theme'
import {Layout} from "@components";
import React from "react";

function MyApp({Component, pageProps}: AppProps) {

    if(pageProps.three) return <Component {...pageProps}/>

    return <>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
        </Head>
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </>
}

export default MyApp
