import React, {useState, useEffect, useRef, useContext} from 'react';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import url from "../../Components/global";
import {useRouter} from "next/router";
import Circular from "../../Components/Circular";
import {Alert, AlertTitle, Avatar, Box, Button, Grid, ListItem, ListItemAvatar, Stack} from "@mui/material";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Search from "../../Components/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {DialogContext} from "../../Context/GlobalContext";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import {blue, blueGrey, grey, orange, pink, red, yellow} from "@mui/material/colors";
import OutlinedInput from "@mui/material/OutlinedInput";
import {useForm} from "react-hook-form";
import {useCart} from "react-use-cart";
import RemovCircleIcon from "@mui/icons-material/AddCircle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormData from "form-data";
import Add from "../../Components/AddArticle";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function addStock({articles}) {
    const router = useRouter()
    const [search, setsearch] = useState("   ");
    const [meuble, setMeuble] = useState([]);
    const [add, setAdd] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [sucess, setSucess] = useState(false);
    const initial = useRef(false);
    const {dialog, setDialog} = useContext(DialogContext)
    const urlAll = url + '/api/articles'

    const handleClickOpen = () => {
        setDialog(true);
        Searche(urlAll)
    };
    const {emptyCart, isEmpty, items, inCart, addItem, updateItemQuantity, removeItem, cartTotal} = useCart();
    const handleClose = () => {
        setDialog(false);
    };
    const sucessCLose = () => {
        setSucess(false);
    };
    const formErrorCLose = () => {
        setErrorForm(false);
    };
    const Searche = async (url) => {

        axios
            .get(url)
            .then((res) => {
                setMeuble(res.data);
                if (res.status === 200) {
                }

            }, (error) => {
                setError(true);
            })
        console.log(meuble)
    }
    const urls = url + '/api/historique/add?nom=' + search
    useEffect(() => {
        if (initial.current) {
            Searche(urls)
            window.scrollTo(0, 0);
        } else {
            initial.current = true
        }

    }, [search])
    const [nom, createNom] = useState("")
    const [prenom, createPrenom] = useState("")
    const [adresse, createAdresse] = useState("")
    const [errorForm, setErrorForm] = useState(false)

    if (error) {
        return <h1>Erreur de chargement veuiller recharger la page</h1>
    } else if (isLoaded) {
        return (
            <Circular/>
        )
    } else {
        return (
            <Box sx={{boxShadow:3}}>
                <Toolbar
                    sx={{
                        pl: {sm: 2},
                        pr: {xs: 1, sm: 1},
                    }}
                >
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Meubles
                        </Typography>
                    <Search setsearch={setsearch}/>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Quantité Ajouter</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meuble.map((meubles) => {
                                const fullDate = meubles.created_at;
                                const date = new Date(fullDate);
                                const shortDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}h:${date.getMinutes()}:${date.getSeconds()}`;

                                return (
                                    <TableRow
                                        key={meubles.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="meubles">
                                            {meubles.nom}
                                        </TableCell>
                                        <TableCell>{meubles.quantite}</TableCell>
                                        <TableCell>{shortDate}</TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

}

export async function getServerSideProps() {
    const res = await fetch(url + '/api/articles');
    const articles = await res.json();

    return {
        props: {articles},
    }

}


