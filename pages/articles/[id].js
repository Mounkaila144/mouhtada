import Home, {getPostData} from "./articles";
import fetch from "node-fetch";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Add from "../../Components/AddArticle";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import Slide from "@mui/material/Slide";
import {useRouter} from "next/router";
import Page from "../index";
import ArticleDialog from "../../Components/Dialog";
import Edit from "../../Components/EditArticle";
import {Backdrop, CircularProgress} from "@mui/material";
import {useState} from "react";
import url from "../../Components/global";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Article(props) {
    const router = useRouter();
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        router.push("/articles/articles")
    };
    console.log(props.article)
    if (router.isFallback) {
        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }
    else {
        return (
            <>
                <Home articles={props.articles}/>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Modifier un article"}</DialogTitle>
                    <DialogContent>
                        <Edit article={props.article}/>
                    </DialogContent>
                    {/*<DialogActions>*/}
                    {/*    <Button onClick={handleClose}>Disagree</Button>*/}
                    {/*    <Button onClick={handleClose}>Agree</Button>*/}
                    {/*</DialogActions>*/}
                </Dialog>
            </>)
    }
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
    const res = await fetch(url+'/api/articles');
    const articles=await res.json();
    const paths=await articles.map(a=>({params:{id:a.id.toString()}}))
    return {
        paths,
        fallback: true, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const res = await fetch(url+'/api/articles/'+id);
    const article=await res.json();
    const rest = await fetch(url+'/api/articles');
    const articles=await rest.json();
    return {
        // Passed to the page component as props
        props: {articles,article},
    }
}
