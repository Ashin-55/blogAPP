import {
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { useStyles } from "./styles";
import Skeloton from "../../skeleton/Skeloton";

const Mypost = () => {
  const authorId = localStorage.getItem("authorId");

  const navigate = useNavigate();
  const classes = useStyles();
  const [myPosts, setMyposts] = useState([]);
  const [Loading, setLoading] = useState(true);

  const myPostDetailHandler = (id) => {
    navigate(`/author/mypostDetail/${id}`);
  };

  useEffect(async () => {
    const mypost = await axios.get(`/author/mypost/${authorId}`);
    setMyposts(mypost.data.mypost);
    setLoading(false);
  }, []);

  return (
    <Container
      maxWidth='lg'
      sx={{ borderRadius: 3, backgroundColor: "whitesmoke", padding: "4%",marginBottom:"3%" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            className={classes.superHead}
            sx={{
              fontSize: 40,
              fontFamily: "Poppins",
              paddingLeft: "5%",
              fontWeight: "bold",
            }}
          >
            Your Stories
          </Typography>
        </Grid>
      </Grid>
      {Loading && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 10% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 10% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 10% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 10% 0" }}>
            <Skeloton />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2}>
        {myPosts.map((posts, index) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              className={classes.outerGrid}
              key={index}
            >
              <Card
                variant='outlined'
                sx={{
                  maxWidth: 345,
                  borderRadius: 5,
                  minHeight: "85%",
                  "&:hover": {
                    boxShadow:5,
                  },
                }}
                className={classes.posts}
              >
                <CardHeader
                  titleTypographyProps={{ variant: "headline" }}
                  title={posts.postTitle}
                  subheader={moment(posts.createdAt).fromNow()}
                />

                <CardMedia
                  component='img'
                  height='194'
                  alt='post1'
                  image={posts.image1}
                  className={classes.images}
                />
                <CardContent>
                  <Typography
                    className={classes.subtitle}
                    sx={{ fontWeight: "bold" }}
                  >
                    {posts.subTitle.substring(0, 20)}..
                  </Typography>
                  <Typography>
                    {posts.postIndroduction.substring(0, 75)}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      myPostDetailHandler(posts._id);
                    }}
                  >
                    Post Details
                  </Button>
                  <IconButton aria-label='like'>
                    <ThumbUpIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Mypost;
