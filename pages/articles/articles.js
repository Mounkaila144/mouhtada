import styles from '../../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import EnhancedTable from "../../Components/tableau/tableau";

import fetch from "node-fetch";
import url from "../../Components/global";
import {useRouter} from "next/router";
import Circular from "../../Components/Circular";

export default function Home({articles}) {
    return (
        <EnhancedTable rows={articles}/>
    );

}
export async function getServerSideProps() {
    const res = await fetch(url+'/api/articles');
    const articles=await res.json();

    return {
        props: {articles},
    }

}
// export async function getStaticProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/articles');
//     const articles=await res.json();
//
//     return {
//         props: {articles},
//         revalidate: 10,// will be passed to the page component as props
//     }
//
// }

