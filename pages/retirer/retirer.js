import styles from '../../styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import EnhancedTable from "../../Components/tableau/tableau";

import fetch from "node-fetch";
import url from "../../Components/global";
import {useRouter} from "next/router";
import Circular from "../../Components/Circular";
import RetirerTable from "../../Components/tableau/retirerTable";

export default function Retirer({entresorties}) {
    return (
        <RetirerTable rows={entresorties}/>
    );

}
export async function getServerSideProps() {
    const res = await fetch(url+'/api/entresorties/retirer');
    const entresorties=await res.json();

    return {
        props: {entresorties},
    }

}
// export async function getStaticProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/entresorties');
//     const entresorties=await res.json();
//
//     return {
//         props: {entresorties},
//         revalidate: 10,// will be passed to the page component as props
//     }
//
// }

