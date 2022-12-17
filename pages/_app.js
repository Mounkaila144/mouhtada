import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '../styles/globals.css';
import createEmotionCache from "../config/createEmotionCache";
import lightTheme from "../styles/theme";
import MenuHome from "../Components/Home";
import Sidbare from "../Components/sidbare";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <MenuHome>
                        <Component {...pageProps} />
                    </MenuHome>
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
