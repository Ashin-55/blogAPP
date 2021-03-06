import React, { useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  AppBar,
  Button,
  CardMedia,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";

import FooterComp from "../../Components/Footer/FooterComp";
import Header from "../../Components/navbar/Header";
import { useStyles } from "./styles";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GraphSkell from "../../skeleton/GraphSkell";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const UserExplore = () => {
  toast.configure();
  const classes = useStyles();
  const [allData, setAllData] = React.useState([]);
  const [singleExploreData, setSingleExploreData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [Loading, setLoading] = React.useState(true);

  const handleClickOpen = async (id) => {
    try {
      const { data } = await axios.get(`/getSingleExploreData/${id}`);
      setSingleExploreData(data);
      setOpen(true);
    } catch (error) {
      console.log("the error is", error);
      toast("Something went wrong!! try again", { type: "error" });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchAllData = async () => {
    try {
      const { data } = await axios.get("/allExploreData");
      console.log(data);
      setAllData(data);
      setLoading(false);
    } catch (error) {
      console.log("the eror is ", error);
      toast("Something went wrong!! try again", { type: "error" });
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.centerContent}
            sx={{ paddingBottom: "8%" }}
          >
            <Typography variant='h2'>TRAVEL TIPS</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.centerContent}
            sx={{ paddingBottom: "4%" }}
          >
            <Typography variant='h5'>Destinations</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.centerContent}
            sx={{ paddingY: "5%" }}
          >
            <Typography align='center' sx={{ fontSize: 25 }}>
              If you already know where to go, select your destination below.
              You???ll find some must try destinations,and around the these
              places.
            </Typography>
          </Grid>
          {Loading ? (
            <Grid container spacing={2}>
              <Grid item sm={12} md={12} lg={12} align='center'>
                <GraphSkell />
              </Grid>
            </Grid>
          ) : (
            allData.map((data) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                key={data._id}
                className={classes.centerContent}
              >
                <Box
                  sx={{ paddingY: "5%" }}
                  onClick={() => handleClickOpen(data._id)}
                >
                  <LocationOnOutlinedIcon
                    className={classes.locationIcon}
                    sx={{ fontSize: "600%" }}
                  />
                  <Typography align='center'>{data.destinationName}</Typography>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
        <hr
          style={{
            color: "#3193f5",
            backgroundColor: "#3193f5",
            height: 5,
          }}
        />
      </Container>
      <FooterComp />

      {/* Dailouge */}
      <Dialog
        transitionDuration={{ enter: 800, exit: 500 }}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
              More About {singleExploreData.destinationName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container>
            <Grid
              item
              xs={12}
              className={classes.centerContent}
              sx={{ paddingY: "2%" }}
            >
              <Typography variant='h4' sx={{ fontWeight: 600 }}>
                {singleExploreData.destinationName} Travel Guide
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component='img'
                alt='post1'
                image={singleExploreData.destinationImg}
                sx={{ width: "85%" }}
              />
            </Grid>
            <Grid item xs={12} className={classes.centerContent}>
              {" "}
              <Typography
                variant='h5'
                sx={{ paddingTop: "2%", paddingBottom: "4%" }}
              >
                {singleExploreData.indroduction}
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.centerContent}>
              {" "}
              <Typography
                align='center'
                variant='h5'
                sx={{ paddingTop: "4%", fontWeight: 600 }}
              >
                Best Time to Visit {singleExploreData.destinationName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Typography sx={{ fontSize: 23 }}>
                {singleExploreData.timeForVisit}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centerContent}>
              {" "}
              <Typography
                align='center'
                variant='h5'
                sx={{ paddingTop: "4%", fontWeight: 600 }}
              >
                Accommodation
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Typography sx={{ fontSize: 23 }}>
                {singleExploreData.accommodation}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centerContent}>
              {" "}
              <Typography
                align='center'
                variant='h5'
                sx={{ paddingTop: "4%", fontWeight: 600 }}
              >
                Food
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Typography sx={{ fontSize: 23 }}>
                {singleExploreData.food}
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.centerContent}>
              {" "}
              <Typography
                align='center'
                variant='h5'
                sx={{ paddingTop: "4%", fontWeight: 600 }}
              >
                Transportation
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Typography sx={{ fontSize: 23 }}>
                {singleExploreData.transportation}
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.centerContent}>
              {" "}
              <Typography
                align='center'
                variant='h5'
                sx={{ paddingTop: "4%", fontWeight: 600 }}
              >
                Safety in {singleExploreData.destinationName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Typography sx={{ fontSize: 23 }}>
                {singleExploreData.safety}
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.centerContent}>
              {" "}
              <Typography
                align='center'
                variant='h5'
                sx={{ paddingTop: "4%", fontWeight: 600 }}
              >
                Top 3 places
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Box
                sx={{
                  paddingY: "5%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component='img'
                  alt='post5'
                  image={singleExploreData.place1img}
                  sx={{
                    minWidth: "35vh",
                    minHeight: "auto",
                    maxWidth: "35vh",
                    maxHeight: "auto",
                  }}
                />
                <Typography
                  align='center'
                  sx={{ marginTop: "2%", fontSize: 20, fontWeight: 600 }}
                >
                  {singleExploreData.place1}
                </Typography>
              </Box>
            </Grid>
            {/*  */}
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Box
                sx={{
                  paddingY: "5%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component='img'
                  alt='post5'
                  image={singleExploreData.place2img}
                  sx={{
                    minWidth: "35vh",
                    minHeight: "auto",
                    maxWidth: "35vh",
                    maxHeight: "auto",
                  }}
                />
                <Typography
                  align='center'
                  sx={{ marginTop: "2%", fontSize: 20, fontWeight: 600 }}
                >
                  {singleExploreData.place2}
                </Typography>
              </Box>
            </Grid>
            {/*  */}
            {/*  */}
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              className={classes.centerContent}
              sx={{ paddingY: "5%" }}
            >
              <Box
                sx={{
                  paddingY: "5%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component='img'
                  alt='post5'
                  image={singleExploreData.place3img}
                  sx={{
                    minWidth: "35vh",
                    minHeight: "auto",
                    maxWidth: "35vh",
                    maxHeight: "auto",
                  }}
                />
                <Typography
                  align='center'
                  sx={{ marginTop: "2%", fontSize: 20, fontWeight: 600 }}
                >
                  {singleExploreData.place3}
                </Typography>
              </Box>
            </Grid>
            {/*  */}
          </Grid>
          <hr
            style={{
              color: "#3193f5",
              backgroundColor: "#3193f5",
              height: 5,
            }}
          />
        </Container>
      </Dialog>
    </>
  );
};

export default UserExplore;
