import {blue, blueGrey, grey} from "@mui/material/colors";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useRouter } from 'next/router'
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

export default function ButtonSide({text,icon,link,open}) {
    const router = useRouter()

    return (
        <ListItemButton
            sx={{
                color: "white",
                minHeight: 3,
                borderRadius: 5,
                background: blueGrey[700],
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                    background: blue[800],
                    borderRadius: 5,
                },
                margin:1,boxShadow:3
            }}
            onClick={()=>router.push(link)}
        >
            <ListItemIcon
                sx={{
                    color: "white",
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
    );
}
