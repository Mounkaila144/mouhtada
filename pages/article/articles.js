import styles from '../../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import EnhancedTable from "../../Components/tableau/tableau";
import {Backdrop, CircularProgress} from "@mui/material";
import {grey} from "@mui/material/colors";
import {alpha} from "@mui/material/styles";
import axios from "axios";

export default function Home() {
    const [parentSize, setParentSize] = useState(0);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://mouhtada.allcine227.com/api/articles',
        })
            .then(
                (data) => {
                    setIsLoaded(true);
                    setArticle(data['data']);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return(

            <Backdrop open={true} sx={{backgroundColor: alpha(grey[300], 5)}}>
                <CircularProgress size="30vh" sx={{color:"black"}} disableShrink />
            </Backdrop>);
    } else {
        return (

            <EnhancedTable rows={article}/>

        );
    }
}