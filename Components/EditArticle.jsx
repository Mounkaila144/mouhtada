import * as React from 'react';
import Box from '@mui/material/Box';
import {IconClose} from "./Icon";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import {UploadImage} from "./uploadImage/uploadImage";
import axios from "axios";
import {useEffect, useState} from "react";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import {useRouter} from "next/router";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";

const FormData = require('form-data');

export default function Edit({close,article}) {
    const [nom, createNom] = useState(null)
    const [prixAchat, createPrixAchat] = useState(null)
    const [prixVente, createPrixVente] = useState(null)
    const [stock, createStock] = useState(null)
    const [vendue, createVendue] = useState(null)
    const [image, createimage] = useState([])
    const [loading, setLoading] = useState(false)
    const router=useRouter();
    const [show, setShow] = useState(false)
    const refreshData=()=>{
        router.replace(router.asPath)
    }
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
            router.push("/articles/articles");

        }
    }, []);
    const getImage = (image) => {
        // 👇️ take parameter passed from Child component
        createimage(image);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        nom===null?null:formData.append('nom', nom);
        prixAchat===null?null:formData.append('prixAchat', prixAchat);
        prixVente===null?null:formData.append('prixVente', prixVente);
        stock===null?null:formData.append('stock', stock);
        vendue===null?null:formData.append('vendue', vendue);
        image===[]?null:formData.append('image', image);
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/articles/'+article.id+"?_method=PUT", formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(
            ).finally(()=>setLoading(false));
            if (res.status===200){
                await  setShow(true)

            }
            console.log(res.data)
        } catch (e) {
            alert(e)
        }

    }
    if (show) {
        return (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Votre modification <strong>a bien été prise en compte!</strong>
        </Alert>
        );
    }else {
        if (loading) {
            return (
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={true}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            )
        } else {
            return (
                <Box>
                    <Box sx={{margin: 1, boxShadow: 3, borderRadius: 3}}>


                        <UploadImage image={getImage}/>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <FormHelperText id="nom">
                                <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                    nom
                                </Typography>
                            </FormHelperText>

                            <OutlinedInput
                                sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                id="nom"
                                onChange={(event) => {
                                    createNom(event.target.value)
                                }}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                aria-describedby="nom"
                                defaultValue={article.nom}
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{m: 1, width: '20ch'}} variant="outlined">
                            <FormHelperText id="achat">
                                <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                    Prix d'achat
                                </Typography>
                            </FormHelperText>

                            <OutlinedInput
                                sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                id="achat"
                                onChange={(event) => {
                                    createPrixAchat(parseInt(event.target.value))
                                }}
                                endAdornment={<InputAdornment position="end">CFA</InputAdornment>}
                                aria-describedby="nom"
                                defaultValue={article.prixAchat}
                                inputProps={{
                                    'type': "number",
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{m: 1, width: '20ch'}} variant="outlined">
                            <FormHelperText id="vente">
                                <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                    Prix de vente
                                </Typography>
                            </FormHelperText>

                            <OutlinedInput
                                sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                id="vente"
                                onChange={(event) => {
                                    createPrixVente(parseInt(event.target.value))
                                }}
                                endAdornment={<InputAdornment position="end">CFA</InputAdornment>}
                                aria-describedby="prixVente"
                                defaultValue={article.prixVente}
                                inputProps={{
                                    'type': "number",
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{m: 1, width: '15ch'}} variant="outlined">
                            <FormHelperText id="Quantité">
                                <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                    Quantité
                                </Typography>
                            </FormHelperText>

                            <OutlinedInput
                                sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                id="Quantité"
                                onChange={(event) => {
                                    createStock(parseInt(event.target.value))
                                }}
                                endAdornment={<InputAdornment position="end">CFA</InputAdornment>}
                                aria-describedby="nom"
                                defaultValue={article.stock}
                                inputProps={{
                                    'type': "number",
                                    'min': "0",
                                    'max': "1000",
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>

                    </Box>
                    <Box textAlign='center'>
                        <Button variant={"contained"} onClick={onSubmit}>Enregistrer</Button>
                    </Box>
                </Box>

            );
        }
    }
}
