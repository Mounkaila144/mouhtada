import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {blue, blueGrey, grey} from "@mui/material/colors";
import ButtonSide from "./ButtonSide";
import HistoriqueMenu from "../HistoriqueBtn";
import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';
import PrintIcon from '@mui/icons-material/Print';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {useContext} from "react";
import {DialogContext, DrawerContext} from "../../Context/GlobalContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        backgroundColor: grey[900],
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidbare({content}) {
    const {open,setOpen}=useContext(DrawerContext)


    const handleDrawerClose = () => {
        open? setOpen(false):setOpen(true);
    };

    return (
            <Drawer variant="permanent" open={open}>
                <DrawerHeader
                    sx={{backgroundColor: blueGrey[900],}}
                >
                    <IconButton onClick={handleDrawerClose}>
                        {!open? <ChevronRightIcon  sx={{color: "white",}}/> : <ChevronLeftIcon sx={{color: "white",}}/>}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    sx={{
                        backgroundColor: blueGrey[900],
                        height:"100vh"
                    }}>
                    <ListItem key={1} disablePadding sx={{ display: 'block' }}>
                        <ButtonSide text={"Dashboard"} open={open} icon={<DashboardIcon/>} link={"/"}/>
                        <ButtonSide text={"Meubles"} open={open} icon={<CategoryIcon/>} link={"/articles/articles"}/>
                        <ButtonSide text={"Ventes des meubles"} open={open} icon={<PaidIcon/>} link={"/articles/vente"}/>
                        <ButtonSide text={"Factures des ventes"} open={open} icon={<PrintIcon/>} link={"/factures/factures"}/>
                        <ButtonSide text={"AJouter de l'argent"} open={open} icon={<LibraryAddIcon/>} link={"/ajouter/ajouter"}/>
                        <ButtonSide text={"Retirer de l'argent"} open={open} icon={<RemoveCircleIcon/>} link={"/retirer/retirer"}/>
                        <HistoriqueMenu text={"historique"} icon={<FormatListBulletedIcon/>}/>
                    </ListItem>
                </List>
                <Divider />

            </Drawer>

    );
}
