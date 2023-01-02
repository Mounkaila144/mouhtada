
import url from "../../Components/global";
import AjouterTable from "../../Components/tableau/AjouterTable";

export default function Ajouter({entresorties}) {
    return (
        <AjouterTable rows={entresorties}/>
    );

}
export async function getServerSideProps() {
    const res = await fetch(url+'/api/entresorties/ajouter');
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

