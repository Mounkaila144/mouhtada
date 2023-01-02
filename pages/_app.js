import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';
import '../styles/globals.css';
import createEmotionCache from "../config/createEmotionCache";
import lightTheme from "../styles/theme";
import MenuHome from "../Components/Home";
import {CartProvider} from "react-use-cart";

import Sidbare from "../Components/sidbare";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import {DialogContext, DrawerContext} from "../Context/GlobalContext";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
    const [dialog, setDialog] = useState(false)
    const [open, setOpen] = useState(true)

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <CartProvider>
                <DrawerContext.Provider value={{open,setOpen}} >
                <DialogContext.Provider value={{dialog,setDialog}} >
                    <MenuHome>
                        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={7} showOnShallow={true} />
                        <Component {...pageProps} />
                    </MenuHome>
                </DialogContext.Provider>
                </DrawerContext.Provider>
                </CartProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
