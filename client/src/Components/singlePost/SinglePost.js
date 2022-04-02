import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostDetailsSkeloton from "../../skeleton/PostDetailsSkeloton";
import { useStyles } from "./styles.js";
import "./styles";

const userId = localStorage.getItem("userId");

const SinglePost = () => {
  toast.configure();
  const classes = useStyles();
  const [postDetails, setPostDetails] = useState([]);
  const [Loading, setLoading] = useState(true);
  let { id } = useParams();
  const wishlistHaandler = async (postId) => {
    const data = { postId, userId };
    if (userId) {
      console.log(data);
      const wishRes = await axios.post("/wishlist", data);
      toast(`${wishRes.data.message}`, { type: "success" });
    } else {
      toast("Can't add !! login first", { type: "error" });
    }
  };
  useEffect(async () => {
    const postDetail = await axios.get(`/author/postDetail/${id}`);
    console.log("the post details", postDetail);
    setPostDetails(postDetail.data.postDetails);
    setLoading(false);
  }, []);
  return (
    <>
      {Loading && (
        <Container maxWidth='lg'>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ padding: "5% 0 5% 0" }}>
              <PostDetailsSkeloton />
            </Grid>
          </Grid>
        </Container>
      )}
      {postDetails.map((post, index) => {
        return (
          <Container
            maxWidth='lg'
            sx={{
              boxShadow: 3,
              borderRadius: 5,
              padding: "2% 1% 2% 1%",
              backgroundColor: "whitesmoke",
            }}
            key={index}
          >
            <div xs={12} lg={9}>
              <Typography
                className={classes.authDetails}
                sx={{
                  fontSize: 15,
                  fontFamily: "Poppins",
                  fontWeight: "lighter",
                }}
              >
                BY{" "}
                <b>
                  <Link
                    to={`/authorDetails/${post.autherData._id}`}
                    style={{ color: "black" }}
                  >
                    {post.autherData.firstName} {post.autherData.lastName}
                  </Link>
                </b>{" "}
                / {post.place} /{moment(post.date).format("LL")}
              </Typography>

              <Typography
                className={classes.mainTitle}
                sx={{
                  fontSize: "2rem",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  padding: "3%",
                  borderRadius: 5,
                }}
              >
                {post.postTitle}
              </Typography>
              <Typography
                className={classes.likeComments}
                sx={{
                  fontSize: 15,
                  fontFamily: "Poppins",
                  fontWeight: "initial",
                  padding: "3% 0 1% 0",
                }}
              >
                Liked the post? Please show some sharing love.
              </Typography>
              <div>
                <IconButton
                  aria-label='add to favorites'
                  sx={{ margin: "0 3% 0 0 " }}
                  onClick={() => {
                    wishlistHaandler(post._id);
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label='like'>
                  <ThumbUpIcon />
                  <div>
                    {"\u00A0"} {post.likeCount} likes
                  </div>
                </IconButton>
              </div>

              <Grid>
                <Card
                  className={classes.card}
                  sx={{}}
                  sx={{
                    border: "none",
                    boxShadow: "none",
                    height: "auto",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component='img'
                      alt='post1'
                      image={post.image1}
                      className={classes.images}
                      sx={{ width: "70%" }}
                    />
                  </Grid>
                  <CardContent sx={{}}>
                    <Typography
                      className={classes.subtitle}
                      sx={{
                        fontSize: 30,
                        fontFamily: "Poppins",
                        fontWeight: "bolder",
                        textAlign: "center",
                        padding: "3% 0 5% 0",
                      }}
                    >
                      {post.subTitle}
                    </Typography>
                    <Typography
                      className='postContent'
                      sx={{
                        letterSpacing: "-0.03em",
                        lineHeight: "38px",
                        marginTop: "2em",
                        fontStyle: "poppins",
                        wordBreak: "break-word",
                        color: "black",
                        fontWeight: 400,
                        display: "block",
                        marginBlockStart: "1em",
                        marginBlockEnd: "1em",
                        marginInlineStart: "0px",
                        marginInlineEnd: "0px",
                        fontSize: "20px",
                        backgroundColor: "white",
                        borderRadius: 5,
                        padding:"5%"
                      }}
                    >
                      {post.postContent}
                    </Typography>
                  </CardContent>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      fontWeight: "bolder",
                      textAlign: "center",
                      padding: "5% 0 2% 0",
                    }}
                  >
                    More Images
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post2'
                        image={post.image2}
                        className={classes.subimages}
                        sx={{ width: "80%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post3'
                        image={post.image3}
                        className={classes.subimages}
                        sx={{ width: "80%",height:"95%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post4'
                        image={post.image4}
                        className={classes.subimages}
                        sx={{ width: "80%",height:"90%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component='img'
                        alt='post5'
                        image={post.image5}
                        className={classes.subimages}
                        sx={{ width: "80%",height:"90%" }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </div>
          </Container>
        );
      })}
    </>
  );
};

export default SinglePost;
