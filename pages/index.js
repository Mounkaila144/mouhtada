import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import ItemCard from "../Components/itemCard";
import url from "../Components/global";
import io from 'socket.io-client';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Circular from "../Components/Circular";
import {blueGrey, yellow} from "@mui/material/colors";
import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';


function Dashboard() {
    const [data, setData] = useState(null);
    const Cfa = (price) => {
        return price.toLocaleString('fr-FR', {style: 'currency', currency: 'CFA'}).replace(',00', '');
    }
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url + '/api/dahboard');
            const json = await response.json();
            setData(json);
        }

        // Fetch data every 5 seconds
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (data) {
        return (
            <div style={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper style={{padding: '16px', textAlign: 'center', color: '#757575', boxShadow: 3}}>
                            <Grid container spacing={3} justify="center">

                                <Grid item xs={4}>
                                    <ItemCard icon={<PointOfSaleIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Dans la caisse"} number={Cfa(data.caisse)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <ItemCard icon={<PaidIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Récette Journalier"} number={Cfa(data.recetJour)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <ItemCard icon={<PaidIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Recette Mensielle"} number={Cfa(data.recetMoi)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <ItemCard icon={<CategoryIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Nombre de Meuble"} number={data.TotalArticle}/>
                                </Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Benefice Jounalier"} number={Cfa(data.beneficeJour)}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Benefice Mensielle"} number={Cfa(data.beneficeMoi)}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<CategoryIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Nombre De meuble Vendue"} number={data.articleVendue}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme retirer durant ce moi"}
                                                            number={Cfa(data.prixRetirerMoi)}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme retirer durant cette année"}
                                                            number={Cfa(data.prixRetirerAnnee)}/></Grid>
                                <Grid item xs={4}>

                                </Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme Ajouter durant ce moi"}
                                                            number={Cfa(data.prixAjouterMoi)}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme Ajouter durant cette année"}
                                                            number={Cfa(data.prixAjouterAnnee)}/></Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{padding: '16px', textAlign: 'center', color: '#757575', boxShadow: 3}}></Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{padding: '16px', textAlign: 'center', color: '#757575'}}></Paper>
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return <Circular/>
    }
}

export default Dashboard;
