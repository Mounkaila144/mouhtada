import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Add from "./AddArticle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useContext} from "react";
import {DialogContext} from "../Context/GlobalContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArticleDialog() {
const {dialog,setDialog}=useContext(DialogContext)
    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    return (
        <div>
            <Button
                startIcon={<AddCircleIcon/>} variant="contained" onClick={handleClickOpen}>
                Ajouter
            </Button>
            <Dialog

                open={dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Ajouter un nouveau meuble"}</DialogTitle>
                <DialogContent >
                    <Add/>
                </DialogContent>
            </Dialog>
        </div>
    );
}