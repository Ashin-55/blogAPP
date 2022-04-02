import {
  Button,
  Card,
  CardActions,
  cardClasses,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { pink, blue } from "@mui/material/colors";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { useStyles } from "./style";
import AuthorDetailsSkeloton from "../../skeleton/AuthorDetailsSkeloton";
import PostDetailsSkeloton from "../../skeleton/PostDetailsSkeloton";

const AuthorDetailsComp = ({ author }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [authProfile, setAuthProfile] = useState([]);
  const [postData, setPostData] = useState([]);
  const { id } = useParams();
  const postDetailHandler = (ID) => {
    author
      ? navigate(`/author/postDetail/${ID}`)
      : navigate(`/postDetail/${ID}`);
  };
  useEffect(() => {
    const fetchData = async (authorid) => {
      const data = await axios.get(`/author/authordetails/${authorid}`);
      setAuthProfile(data.data.authData);
      setPostData(data.data.postData);
      setLoading(false);
      console.log(data);
    };
    fetchData(id);
  }, []);
  return (
    <Container sx={{ boxShadow: 5, borderRadius: "3%" }} maxWidth='lg'>
      {loading ? (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4} sx={{ marginTop: "5%" }}>
            <AuthorDetailsSkeloton />
          </Grid>
          <Grid item xs={12} md={8} sx={{ paddingLeft: "2%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "5% 0 5% 0" }}>
                <PostDetailsSkeloton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid
            align='center'
            sx={{
              padding: "1%",
              fontWeight: "bold",
              fontFamily: "Poppins",
              fontSize: 25,
            }}
          >
            More about {authProfile[0].firstName} {authProfile[0].lastName}
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} sx={{ marginTop: "5%" }}>
              <Card
                variant='outlined'
                sx={{
                  minHeight: "25%",

                  maxWidth: 345,
                  boxShadow: 1,
                  borderRadius: 1,
                  backgroundColor: blue[50],
                }}
                className={classes.posts}
              >
                <div className={classes.outerGrid}>
                  <CardMedia
                    className={classes.images}
                    component='img'
                    alt='profile pic'
                    sx={{ maxWidth: "70%", paddingTop: "10%" }}
                    image='../../images/profile3.png'
                  />
                </div>
                <Grid container>
                  <Grid item xs={8} className={classes.outerGrid}>
                    <div>
                      <Typography align='center'>
                        {authProfile[0].firstName} {authProfile[0].lastName}
                      </Typography>
                      <Typography fontSize={12} align='center'>
                        {authProfile[0].email}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <CardActions>
                      <IconButton>
                        <ForumTwoToneIcon
                          sx={{ paddingTop: "50%", color: blue[200] }}
                        />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
                <CardContent align='center'>
                  {authProfile[0].indroduction}
                </CardContent>
                <div className={classes.outerGrid}>
                  <CardActions>
                    <IconButton>
                      <FacebookTwoToneIcon sx={{ color: blue[700] }} />
                    </IconButton>
                    <IconButton>
                      <InstagramIcon sx={{ color: pink[800] }} />
                    </IconButton>
                    <IconButton>
                      <LinkedInIcon sx={{ color: blue[700] }} />
                    </IconButton>
                  </CardActions>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} md={8} sx={{}}>
              <Typography
                align='center'
                sx={{ fontWeight: "bold", fontFamily: "Poppins", fontSize: 15 }}
              >
                POSTS
              </Typography>{" "}
              <Grid container sx={{ padding: "2%" }} spacing={2}>
                {postData.map((details, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      variant='outlined'
                      sx={{
                        padding: "5%",
                        minHeight: "85%",
                        maxHeight: "95%",
                        maxWidth: "70%",
                        minWidth: "70%",
                        boxShadow: 3,
                        borderRadius: 5,
                      }}
                    >
                      <CardMedia
                        className={classes.images}
                        component='img'
                        height='194'
                        alt='post'
                        image={details.image1}
                      />

                      <Typography sx={{ fontWeight: "light" }}>
                        {details.place}/{moment(details.date).format("LL")}
                      </Typography>

                      <Typography
                        className={classes.title}
                        sx={{ fontWeight: "bold" }}
                      >
                        {details.postTitle.substring(0, 50)}...
                      </Typography>
                      <Typography className={classes.subtitle}>
                        {details.postIndroduction.substring(0, 80)}...
                      </Typography>
                      <Button
                        onClick={() => {
                          postDetailHandler(details._id);
                        }}
                      >
                        {" "}
                        Reed More
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default AuthorDetailsComp;
