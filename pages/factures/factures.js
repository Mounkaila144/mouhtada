
import fetch from "node-fetch";
import url from "../../Components/global";
import FactureTable from "../../Components/tableau/FactureTableau";


export default function Factures({factures}) {
        return (
            <FactureTable rows={factures}/>
        );

}
export async function getServerSideProps() {
    const res = await fetch(url+'/api/factures');
    const factures=await res.json();

    return {
        props: {factures},
    }

}
// export async function getStaticProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/factures');
//     const factures=await res.json();
//
//     return {
//         props: {factures},
//         revalidate: 10,// will be passed to the page component as props
//     }
//
// }

