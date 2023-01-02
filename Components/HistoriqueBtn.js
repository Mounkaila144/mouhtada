import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {blue, blueGrey} from "@mui/material/colors";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useRouter} from "next/router";

export default function HistoriqueMenu({text,icon}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ListItemButton
                sx={{
                    color: "white",
                    minHeight: 3,
                    borderRadius: 5,
                    background: blueGrey[700],
                    justifyContent: 'initial',
                    px: 2.5,
                    '&:hover': {
                        background: blue[800],
                        borderRadius: 5,
                    },
                    margin:1,boxShadow:3
                }}
                onClick={handleClick}
            >
                <ListItemIcon
                    sx={{
                        color: "white",
                        minWidth: 0,
                        mr: 1,
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText sx={{marginLeft:1}} primary={text} />
            </ListItemButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem sx={{color: "white", maxHeight: 100, borderRadius: 5, background: blueGrey[700], justifyContent: 'initial', px: 2.5, '&:hover': {background: blue[800], borderRadius: 5,}, margin:1,boxShadow:3}}
                          onClick={()=>router.push("/historique/vente")}>Ventes</MenuItem>
                <MenuItem sx={{color: "white", maxHeight: 100, borderRadius: 5, background: blueGrey[700], justifyContent: 'initial', px: 2.5, '&:hover': {background: blue[800], borderRadius: 5,}, margin:1,boxShadow:3}}
                          onClick={()=>router.push("/historique/addStock")}>Ajouts au Stocks</MenuItem>
                <MenuItem sx={{color: "white", maxHeight: 100, borderRadius: 5, background: blueGrey[700], justifyContent: 'initial', px: 2.5, '&:hover': {background: blue[800], borderRadius: 5,}, margin:1,boxShadow:3}}
                          onClick={()=>router.push("/historique/removeStock")}>Duminition au Stocks</MenuItem>

                <MenuItem sx={{color: "white", maxHeight: 100, borderRadius: 5, background: blueGrey[700], justifyContent: 'initial', px: 2.5, '&:hover': {background: blue[800], borderRadius: 5,}, margin:1,boxShadow:3}}
                          onClick={()=>router.push("/historique/prixStock")}>Modification des Prix</MenuItem>
                <MenuItem sx={{color: "white", maxHeight: 100, borderRadius: 5, background: blueGrey[700], justifyContent: 'initial', px: 2.5, '&:hover': {background: blue[800], borderRadius: 5,}, margin:1,boxShadow:3}}
                          onClick={()=>router.push("/historique/delectStock")}>Supression de articles</MenuItem>
            </Menu>
        </div>
    );
}