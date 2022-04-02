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
import { Link } from "react-router-dom";
const DrawerComp = (props) => {
  console.log(props);
  const [OpenDrawer, setOpenDrawer] = useState(false);
  const logoutFun = () => {
    setOpenDrawer(false);
    localStorage.removeItem("authorInfo");
  };

  return (
    <>
      <Drawer open={OpenDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {props.author ? (
            <>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"home"}
                component={Link}
                to='/author'
              >
                <ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"newpost"}
                component={Link}
                to='/author/newpost'
              >
                <ListItemIcon>
                  <ListItemText>NewPost</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"activity"}
                component={Link}
                to='/author/activity'
              >
                <ListItemIcon>
                  <ListItemText>activity</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"message"}
                component={Link}
                to='/author/message'
              >
                <ListItemIcon>
                  <ListItemText>Messages</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"mypost"}
                component={Link}
                to='/author/mypost'
              >
                <ListItemIcon>
                  <ListItemText>MyPost</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={logoutFun}
                key={"logout"}
                component={Link}
                to='/'
              >
                <ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : props.admin ? (
            <>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"Dashboard"}
                component={Link}
                to='/admin'
              >
                <ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"allUser"}
                component={Link}
                to='/admin/alluser'
              >
                <ListItemIcon>
                  <ListItemText>All Users</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"premium"}
                component={Link}
                to='/admin/allPreuser'
              >
                <ListItemIcon>
                  <ListItemText>All Athors</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={logoutFun}
                key={"logout"}
                component={Link}
                to='/'
              >
                <ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"home"}
                component={Link}
                to='/'
              >
                <ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"explore"}
                component={Link}
                to='/explore'
              >
                <ListItemIcon>
                  <ListItemText>Explore</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"becomewriter"}
                component={Link}
                to='/becomewriter'
              >
                <ListItemIcon>
                  <ListItemText>Become an Writer</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"favorites"}
                component={Link}
                to='/favorites'
              >
                <ListItemIcon>
                  <ListItemText>Favorites</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"login"}
                component={Link}
                to='/login'
              >
                <ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => setOpenDrawer(false)}
                key={"Signup"}
                component={Link}
                to='/userSignup'
              >
                <ListItemIcon>
                  <ListItemText>Signup</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
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
