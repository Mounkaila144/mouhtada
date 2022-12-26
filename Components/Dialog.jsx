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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArticleDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                startIcon={<AddCircleIcon/>} variant="contained" onClick={handleClickOpen}>
                Ajouter
            </Button>
            <Dialog

                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Ajouter un nouveau meuble"}</DialogTitle>
                <DialogContent >
                    <Add/>
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose}>Disagree</Button>*/}
                {/*    <Button onClick={handleClose}>Agree</Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}