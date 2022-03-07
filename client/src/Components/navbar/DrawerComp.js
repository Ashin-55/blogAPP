import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";

const DrawerComp = () => {
  const [OpenDrawer, setOpenDrawer] = useState(false);
  const navOptions = [
    {
      text: "HOME",
      path: "/",
    },
    {
      text: "Explore",
      path: "/explore",
    },
    {
      text: "Become an Writer",
      path: "/becomewriter",
    },
    {
      text: "Favorites",
      path: "/favorites",
    },
    {
      text: "Login",
      path: "/login",
    },
    {
      text: "Signup",
      path: "/Signup",
    }
  ];
  return (
    <>
      <Drawer open={OpenDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {navOptions.map((item) => (
            <ListItemButton
              onClick={() => setOpenDrawer(false)}
              key={item.text}
            >
              <ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!OpenDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
