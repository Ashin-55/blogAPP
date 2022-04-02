import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useStyles } from "./headerStyles";
import DrawerComp from "./DrawerComp";

const AuthHeader = () => {
  const classes = useStyles();
  const authorInfo = localStorage.getItem("authorInfo");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authorInfo");
    localStorage.removeItem("authorFirstname");
    localStorage.removeItem("authorId");
    navigate("/");
  };
  return (
    <>
      <AppBar
        sx={{ background: "#0E185F", marginBottom: "3%" }}
        position='static'
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Typography
                component={Link}
                to='/author'
                sx={{
                  fontWeight: "bold",
                  paddingRight: "10%",
                  paddingLeft: ".5%",
                  fontSize: 20,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Be on the ROAD
              </Typography>
              <DrawerComp author={true} />
            </>
          ) : (
            <>
              <Typography
                component={Link}
                to='/author'
                sx={{
                  fontWeight: "bold",
                  paddingRight: "1%",
                  paddingLeft: ".5%",
                  fontSize: 20,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Be on the ROAD
              </Typography>
              <Tabs
                sx={{ marginLeft: "10px" }}
                textColor='inherit'
                value={value}
                indicatorColor='primary'
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  key={"home"}
                  label={"Home"}
                  component={Link}
                  to={"/author"}
                />
                <Tab
                  key={"newPost"}
                  label={"NeW Post "}
                  component={Link}
                  to={"/author/newpost"}
                />
                <Tab
                  key={"activity"}
                  label={"activity"}
                  component={Link}
                  to={"/author/activity"}
                />
                <Tab
                  key={"mesage"}
                  label={"Messages"}
                  component={Link}
                  to={"/author/message"}
                />
                <Tab
                  key={"mypost"}
                  label={"MyPost"}
                  component={Link}
                  to={"/author/mypost"}
                />
                <Tab
                  key={"profile"}
                  label={"Profile"}
                  component={Link}
                  to={"/author/profile"}
                />
              </Tabs>
              <Button
                sx={{ marginLeft: "auto" }}
                variant='contained'
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.mainlogo}>
        <img
          src='../../images/MainLogo.png'
          alt='logo'
          style={{ width: "30%", height: "auto" }}
        />
      </Toolbar>
      <Toolbar className={classes.tagline} sx={{ marginBottom: "2.5%" }}>
        OFFBEAT PLACES UNTOLD STORIES
      </Toolbar>
    </>
  );
};

export default AuthHeader;
