import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './SidebarLink.css'

interface Props {
    text: string;
    location: string;
    icon: React.ReactNode;
}

export const SidebarLink:FC<Props> = ({ text, location, icon }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const visitPage = () => {
        navigate(location);
    }
   
  return (
    <ListItem disablePadding className={ (pathname === location)? "active-link": undefined }>
        <ListItemButton onClick={visitPage}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
  )
}