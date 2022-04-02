import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Container,
  CardMedia,
  CardActionArea,
  Grid,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import moment from "moment";

import { useStyles } from "./styles";
import Skeloton from "../../skeleton/Skeloton";

const BodyContent = ({ author }) => {
  toast.configure();
  const classes = useStyles();
  const [allPost, setAllPost] = useState([]);
  const [favPostId, setFavPostId] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);

  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const userId = localStorage.getItem("userId");
  const autherId = localStorage.getItem("authorId");

  const postDetailHandler = (id) => {
    author
      ? navigate(`/author/postDetail/${id}`)
      : navigate(`/postDetail/${id}`);
  };

  const wishlistHaandler = async (postId) => {
    const data = { postId, userId };
    const indexx = favPostId.indexOf(postId);
    if (userId) {
      const wishRes = await axios.post("/wishlist", data);
      console.log(favPostId);
      if (wishRes.data.value == 1) {
        toast(`${wishRes.data.message}`, { type: "success", autoClose: 1000 });
        favPostId.push(postId);
      } else {
        toast(`${wishRes.data.message}`, { type: "success", autoClose: 1000 });
        favPostId.splice(indexx, 1);
      }
    } else {
      toast("Can't add !! login first", { type: "error", autoClose: 1000 });
    }
  };

  const likeHandler = async (postId) => {
    let data;
    author ? (data = { postId, autherId }) : (data = { postId, userId });
    if (author) {
      if (autherId) {
        const likeAuth = await axios.post("/author/likePost", data);
        toast(`${likeAuth.data.message}`, { type: "success", autoClose: 1000 });
      } else {
        toast("Can't add !! login first", { type: "error", autoClose: 1000 });
      }
    } else {
      if (userId) {
        const likeUser = await axios.post("/likePost", data);
        toast(`${likeUser.data.message}`, { type: "success", autoClose: 1000 });
      } else {
        toast("Can't add !! login first", { type: "error", autoClose: 1000 });
      }
    }
  };

  useEffect(() => {
    console.log("fetch data called ");
    const fetchData = async () => {
      let getData = [];
      try {
        author
          ? (getData = await axios.get(`/author/home/${autherId}`))
          : (getData = await axios.get("/home"));

        setAllPost(getData.data.allPost);
        setLoading(false);
      } catch (error) {
        console.log("Error camed", error);
      }
    };
    fetchData();
  }, [flag]);
  //wishlist useEffect
  useEffect(() => { 
    if (userId) {
      (async (id) => {
        const items = await axios.get(`/getWishlist/${id}`);
        setFavPostId(items.data.wishlistIdS);
      })(userId);
    }
  }, []);

  return (
    <>
      {Loading && (
        <>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ padding: "5% 0 5% 0" }}>
            <Skeloton />
          </Grid>
        </>
      )}

      {allPost.map((post, index) => {
        return (
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            className={classes.outerGrid}
            key={index}
            sx={{ minHeight: "20%"}}
          >
            <Card
              variant='outlined'
              sx={{
                minHeight: "85%",
                maxHeight: "85%",
                maxWidth: "70%",
                minWidth: "70%",
                boxShadow: 1,
                "&:hover": {
                  boxShadow: 6,
                },
                borderRadius: 5,
              }}
              className={classes.posts}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                    {post.authorId.firstName.substring(0, 1)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={`${post.authorId.firstName}  ${post.authorId.lastName}`}
                subheader={moment(post.createdAt).fromNow()}
              />
              <CardMedia
                  className={classes.images}
                component='img'
                height='auto' 
                alt='post1'
              
                image={post.image1}
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  sx={{ fontWeight: "bold" }}
                >
                  {post.postTitle.substring(0,60)}..
                </Typography>
                <Typography
                  className={classes.subtitle}
                  sx={{ fontWeight: "light" }}
                >
                  {/* {favPostId.indexOf(post._id)} */}
                  {post.postIndroduction.substring(0, 80)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    postDetailHandler(post._id);
                  }}
                >
                  Read More....
                </Button>
                {author ? null : (
                  <IconButton
                    aria-label='add to favorites'
                    onClick={() => {
                      wishlistHaandler(post._id);
                      setFlag(!flag);
                    }}
                  >
                    <FavoriteIcon
                      style={
                        favPostId.indexOf(post._id) >= 0
                          ? { color: "red" }
                          : { color: "GrayText " }
                      }
                    />
                  </IconButton>
                )}
                <IconButton
                  aria-label='like'
                  onClick={() => {
                    likeHandler(post._id);
                  }}
                >
                  <ThumbUpIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default BodyContent;
