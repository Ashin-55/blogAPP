import React, { useState } from "react";
import {
  AppBar,
  Button,
  ButtonGroup,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComp from "./DrawerComp";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  mainlogo: {
    justifyContent: "center",
  },
  tagline: {
    fontSize: 20,
    textTransform: "uppercase",
    justifyContent: "center",
    fontFamily: "Montserrat",
    flexGrow: 1,
  },
}));
const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
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
  ];
  console.log(isMatch);
  return (
    <>
      <AppBar
        sx={{ background: "#0E185F", marginBottom: "3%" }}
        position='static'
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Typography variant='title'>
                <img src='../Logo.png' alt='logo' height={30} />
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  paddingRight: "10%",
                  paddingLeft: ".5%",
                  paddingTop: "3%",
                  fontSize: 10,
                }}
              >
                Be on the ROAD
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Typography variant='title'>
                <img src='../Logo.png' alt='logo' height={40} />
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  paddingRight: "1%",
                  paddingLeft: ".5%",
                  paddingTop: "2%",
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
                {navOptions.map((item) => (
                  <Tab key={item.text} label={item.text} />
                ))}
              </Tabs>
              <ButtonGroup sx={{ marginLeft: "auto" }}>
                <Button variant='contained'>Login</Button>
                <Button variant='contained'>Signup</Button>
              </ButtonGroup>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.mainlogo}>
        <img
          src='./images/MainLogo.png'
          alt='logo'
          style={{ width: "30%", height: "auto" }}
        />
      </Toolbar>
      <Toolbar className={classes.tagline} sx={{marginBottom:"2.5%"}}>
        OFFBEAT PLACES UNTOLD STORIES
      </Toolbar>
    
    </>
  );
};

export default Header;
