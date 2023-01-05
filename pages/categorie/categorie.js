import EnhancedTable from "../../Components/tableau/tableau";
import MyRequest from "../../Components/request";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../Context/GlobalContext";
import {useRouter} from "next/router";
import {Grid} from "@mui/material";
import CategorieCard from "../../Components/CategorieCard";
import CategorieDialog from "../../Components/CategorieDialog";

export default function Home() {
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            await MyRequest('categories', 'GET', {}, {'Content-Type': 'application/json'})
                .then((response) => {
                    setData(response.data)
                });
        };
        fetchData();
    }, [router.query]);
    return (
        <>


        </>

    );

}

// export async function getStaticProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/articless');
//     const articless=await res.json();
//
//     return {
//         props: {articless},
//         revalidate: 10,// will be passed to the page component as props
//     }
//
// }

