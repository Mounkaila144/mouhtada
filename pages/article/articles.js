import styles from '../../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import EnhancedTable from "../../Components/tableau/tableau";
import {Backdrop, CircularProgress} from "@mui/material";
import {grey} from "@mui/material/colors";
import {alpha} from "@mui/material/styles";
import axios from "axios";
import fetch from "node-fetch";

export default function Home({articles}) {
    const [parentSize, setParentSize] = useState(0);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [article, setArticle] = useState([]);

        return (

            <EnhancedTable rows={articles}/>

        );

}
// export async function getServerSideProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/articles');
//     const articles=await res.json();
//
//     return {
//         props: {articles},
//     }
//
// }
export async function getStaticProps() {
    const res = await fetch('https://mouhtada.allcine227.com/api/articles');
    const articles=await res.json();

    return {
        props: {articles},
        revalidate: 10,// will be passed to the page component as props
    }

}
