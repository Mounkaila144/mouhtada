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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Vente({articles}) {
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
    const urls = url + '/api/articles?nom=' + search
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
    const onSubmit = async (e) => {
        e.preventDefault()
        if (nom.length<3 || prenom.length<3 || adresse.length<3){

            setErrorForm(true)
        }else {
            console.log(nom.length)
            console.log(prenom.length)
            const formData = {
                "nom": nom,
                "prenom": prenom,
                "adresse": adresse,
                "contenue": items,
                "user_id": 1
            }
            try {
                setIsLoaded(true)
                const res = await axios.post(url + '/api/factures', formData).finally(() => setIsLoaded(false));
                if (res.status === 200) {
                    createAdresse("")
                    createNom("")
                    createPrenom("")
                    emptyCart()
                    setSucess(true)

                }
                console.log(res.data)
            } catch (e) {

            }
        }
    }


    if (error) {
        return <h1>Erreur de chargement veuiller recharger la page</h1>
    } else if (isLoaded) {
        return (
            <Circular/>
        )
    } else {
        return (
            <Box sx={{boxShadow:3,backgroundColor:blueGrey[900]}}>
                <Dialog
                    fullWidth
                    maxWidth="md"
                    open={dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Ajouter un nouveau meuble"}</DialogTitle>
                    <DialogContent>
                        <Search setsearch={setsearch}/>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prix de vente</TableCell>
                                        <TableCell>Quantité du Stock</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meuble.map((meubles) => {
                                        return (
                                            <TableRow
                                                key={meubles.id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell> <Image
                                                    src={url + "/storage/meuble/" + meubles.image}
                                                    width={50} height={50} style={{borderRadius: 8}}
                                                    alt={"image"}/></TableCell>
                                                <TableCell component="th" scope="meubles">
                                                    {meubles.nom}
                                                </TableCell>
                                                <TableCell>{meubles.prixVente}</TableCell>
                                                <TableCell>{meubles.stock}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            marginTop: 1,
                                                            backgroundColor: inCart(meubles.id) ? "#1b5e20" : blue[900],
                                                        }}
                                                        onClick={() => {
                                                            inCart(meubles.id) ? removeItem(meubles.id) : addItem({
                                                                'nom': meubles.nom,
                                                                'stock': meubles.stock,
                                                                'image': meubles.image,
                                                                'price': meubles.prixVente,
                                                                'id': meubles.id,
                                                            })
                                                        }}>
                                                        <AddShoppingCartIcon
                                                            sx={{color: "white"}}
                                                        />{inCart(meubles.id) ? <DoneIcon/> : "Ajouter"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    {/*<DialogActions>*/}
                    {/*    <Button onClick={handleClose}>Disagree</Button>*/}
                    {/*    <Button onClick={handleClose}>Agree</Button>*/}
                    {/*</DialogActions>*/}
                </Dialog>

                        <TableContainer style={{maxHeight: "85vh"}} component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prix de vente</TableCell>
                                        <TableCell>Quantité du Stock</TableCell>
                                        <TableCell>Quantité a vendre</TableCell>
                                        <TableCell>Prix Total</TableCell>
                                        <TableCell align={"right"}>
                                            <Button
                                            startIcon={<AddCircleIcon/>} variant="contained" onClick={handleClickOpen}>
                                            Ajouter
                                        </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {isEmpty ?
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                    </TableRow>
                                </TableBody>:
                                    <TableBody>
                                        {items.map((meubles) => {
                                            return (
                                                <TableRow
                                                    key={meubles.id}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell> <Image
                                                        src={url + "/storage/meuble/" + meubles.image}
                                                        width={50} height={50} style={{borderRadius: 8}}
                                                        alt={"image"}/></TableCell>
                                                    <TableCell component="th" scope="meubles">
                                                        {meubles.nom}
                                                    </TableCell>
                                                    <TableCell>{meubles.price} CFA</TableCell>
                                                    <TableCell>{meubles.stock}</TableCell>
                                                    <TableCell><Box display="flex"
                                                                    justifyContent="center"
                                                                    alignItems="center" sx={{
                                                        justifyContent: "center",
                                                        boxShadow: 3,
                                                        borderRadius: 2,
                                                        width: 50,
                                                        height: 40,
                                                        backgroundColor: blueGrey[900],
                                                        fontSize: 20,
                                                        color: "white"
                                                    }}>{meubles.quantity}</Box></TableCell>
                                                    <TableCell>{meubles.itemTotal} CFA</TableCell>
                                                    <TableCell>
                                                        <Stack spacing={3} direction="row"
                                                               sx={{marginLeft: 7, marginTop: 0}}>
                                                            <Button variant={"contained"}
                                                                    sx={{backgroundColor: yellow[800], borderRadius: 1}}
                                                                    style={{
                                                                        maxWidth: '50px',
                                                                        maxHeight: '25px',
                                                                        minWidth: '30px',
                                                                        minHeight: '20px'
                                                                    }}
                                                                    onClick={() => updateItemQuantity(meubles.id, meubles.quantity - 1)}><RemoveCircleIcon
                                                                sx={{color: "white"}}/></Button>
                                                            {meubles.stock > meubles.quantity ?
                                                                <Button variant={"contained"}
                                                                        sx={{color: "blue", borderRadius: 1}} style={{
                                                                    maxWidth: '50px',
                                                                    maxHeight: '25px',
                                                                    minWidth: '30px',
                                                                    minHeight: '20px'
                                                                }}
                                                                        onClick={() => updateItemQuantity(meubles.id, meubles.quantity + 1)}><AddCircleIcon
                                                                    sx={{color: "white"}}/></Button> :
                                                                <Button variant={"outlined"} style={{
                                                                    maxWidth: '50px',
                                                                    maxHeight: '25px',
                                                                    minWidth: '30px',
                                                                    minHeight: '20px'
                                                                }}><AddCircleIcon sx={{color:"white"}}/></Button>}
                                                            <Button variant={"contained"}
                                                                    sx={{backgroundColor: red[800], borderRadius: 1}}
                                                                    style={{
                                                                        maxWidth: '50px',
                                                                        maxHeight: '25px',
                                                                        minWidth: '30px',
                                                                        minHeight: '20px'
                                                                    }} onClick={() => removeItem(meubles.id)}><DeleteIcon
                                                                style={{maxWidth: '20px', maxHeight: '20px',}}
                                                                sx={{color: "white"}}/></Button>
                                                        </Stack>

                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell><Box sx={{fontSize: 20}}>Total =</Box></TableCell>
                                            <TableCell>{cartTotal} CFA</TableCell>
                                        </TableRow>
                                    </TableBody>}
                            </Table>
                        </TableContainer>
                {!isEmpty ?
                    <>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={3}>
                                <FormControl sx={{m: 1, width: '20ch'}} variant="filled">
                                    <OutlinedInput
                                        sx={{height: '5ch', width: '30ch', boxShadow: 3, borderRadius: 2,backgroundColor:"white"}}
                                        id="nom"
                                        onChange={(event) => {
                                            createNom(event.target.value)
                                        }}
                                        aria-describedby="nom"
                                        placeholder={"nom"}
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl sx={{m: 1, width: '30ch'}} variant="outlined">
                                    <OutlinedInput
                                        sx={{height: '5ch', boxShadow: 3, borderRadius: 2,backgroundColor:"white"}}
                                        id="Prenom"
                                        onChange={(event) => {
                                            createPrenom(event.target.value)
                                        }}
                                        placeholder={"prenom"}
                                        aria-describedby="prenom"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl sx={{m: 1, width: '30ch'}} variant="outlined">
                                    <OutlinedInput
                                        sx={{height: '5ch', boxShadow: 3, borderRadius: 2,backgroundColor:"white"}}
                                        id="Adresse"
                                        onChange={(event) => {
                                            createAdresse(event.target.value)
                                        }}
                                        placeholder={"Adresse"}
                                        aria-describedby="Adresse"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} display="flex"
                                  justifyContent="center"
                                  alignItems="center" >

                                <Button onClick={onSubmit} variant={"contained"} sx={{fontSize:20}} startIcon={<BeenhereIcon/>}>Vendue</Button>
                            </Grid>

                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={9}>
                                <Box display="flex"
                                     justifyContent="center"
                                     alignItems="center" sx={{fontSize: 20,color:"white"}}>Information Clients</Box>
                            </Grid>
                        </Grid>
                    </>
                    :null}
                <Dialog

                    open={errorForm}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={formErrorCLose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Message"}</DialogTitle>
                    <DialogContent >
                        <Alert severity="error">
                            <AlertTitle>Eureur</AlertTitle>
                            Les champs
                            {nom.length<3?<Box > nom </Box>:null}
                            {prenom.length<3?<Box > prenom </Box>:null}
                            {adresse.length<3?<Box > adresse </Box>:null}
                            <strong> sont ivalide!</strong>

                        </Alert>
                    </DialogContent>
                </Dialog>
                <Dialog

                    open={sucess}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={sucessCLose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Message"}</DialogTitle>
                    <DialogContent >
                        <Alert severity="success">
                            <AlertTitle>Sucesse</AlertTitle>
                            La vente a bien
                            <strong> été enregistrer</strong>

                        </Alert>
                    </DialogContent>
                </Dialog>
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

