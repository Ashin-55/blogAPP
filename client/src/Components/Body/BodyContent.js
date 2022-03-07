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
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import { makeStyles } from "@material-ui/styles";

import React from "react";
import { margin, padding } from "@mui/system";

const useStyles = makeStyles({
  title: {
    fontSize: 40,
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins",
  },
  images: {
    padding: "10 10",
    borderRadius: 20,
  },
  posts: {
    padding: 10,
    margin: 25,
  },
});
const BodyContent = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card
          variant='outlined'
          sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 5 }}
          className={classes.posts}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                A
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title='Shrimp and Chorizo Paella'
            subheader='September 14, 2016'
          />
          <CardMedia
            className={classes.images}
            component='img'
            height='194'
            alt='post1'
            image='../../images/trip1.jpg'
          />
          <CardContent>
            <Typography className={classes.title} sx={{ fontWeight: "bold" }}>
              BANSWARA, THE GREENEST CITY OF RAJASTHAN THAT NO ONE KNOWS ABOUT
            </Typography>
            <Typography
              className={classes.subtitle}
              sx={{ fontWeight: "light" }}
            >
              Tired of visiting touristy places and want to explore off the
              beaten track in Rajasthan? Visit Banswara – the greenest city of
              Rajasthan.
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Read More....</Button>
          </CardActions>
        </Card>
      </Grid>   <Grid item xs={12} md={6} lg={4}>
        <Card
          variant='outlined'
          sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 5 }}
          className={classes.posts}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                A
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title='Shrimp and Chorizo Paella'
            subheader='September 14, 2016'
          />
          <CardMedia
            className={classes.images}
            component='img'
            height='194'
            alt='post1'
            image='../../images/trip1.jpg'
          />
          <CardContent>
            <Typography className={classes.title} sx={{ fontWeight: "bold" }}>
              BANSWARA, THE GREENEST CITY OF RAJASTHAN THAT NO ONE KNOWS ABOUT
            </Typography>
            <Typography
              className={classes.subtitle}
              sx={{ fontWeight: "light" }}
            >
              Tired of visiting touristy places and want to explore off the
              beaten track in Rajasthan? Visit Banswara – the greenest city of
              Rajasthan.
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Read More....</Button>
          </CardActions>
        </Card>
      </Grid>   <Grid item xs={12} md={6} lg={4}>
        <Card
          variant='outlined'
          sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 5 }}
          className={classes.posts}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                A
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title='Shrimp and Chorizo Paella'
            subheader='September 14, 2016'
          />
          <CardMedia
            className={classes.images}
            component='img'
            height='194'
            alt='post1'
            image='../../images/trip1.jpg'
          />
          <CardContent>
            <Typography className={classes.title} sx={{ fontWeight: "bold" }}>
              BANSWARA, THE GREENEST CITY OF RAJASTHAN THAT NO ONE KNOWS ABOUT
            </Typography>
            <Typography
              className={classes.subtitle}
              sx={{ fontWeight: "light" }}
            >
              Tired of visiting touristy places and want to explore off the
              beaten track in Rajasthan? Visit Banswara – the greenest city of
              Rajasthan.
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Read More....</Button>
          </CardActions>
        </Card>
      </Grid>   <Grid item xs={12} md={6} lg={4}>
        <Card
          variant='outlined'
          sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 5 }}
          className={classes.posts}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                A
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title='Shrimp and Chorizo Paella'
            subheader='September 14, 2016'
          />
          <CardMedia
            className={classes.images}
            component='img'
            height='194'
            alt='post1'
            image='../../images/trip1.jpg'
          />
          <CardContent>
            <Typography className={classes.title} sx={{ fontWeight: "bold" }}>
              BANSWARA, THE GREENEST CITY OF RAJASTHAN THAT NO ONE KNOWS ABOUT
            </Typography>
            <Typography
              className={classes.subtitle}
              sx={{ fontWeight: "light" }}
            >
              Tired of visiting touristy places and want to explore off the
              beaten track in Rajasthan? Visit Banswara – the greenest city of
              Rajasthan.
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Read More....</Button>
          </CardActions>
        </Card>
      </Grid>   <Grid item xs={12} md={6} lg={4}>
        <Card
          variant='outlined'
          sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 5 }}
          className={classes.posts}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                A
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title='Shrimp and Chorizo Paella'
            subheader='September 14, 2016'
          />
          <CardMedia
            className={classes.images}
            component='img'
            height='194'
            alt='post1'
            image='../../images/trip1.jpg'
          />
          <CardContent>
            <Typography className={classes.title} sx={{ fontWeight: "bold" }}>
              BANSWARA, THE GREENEST CITY OF RAJASTHAN THAT NO ONE KNOWS ABOUT
            </Typography>
            <Typography
              className={classes.subtitle}
              sx={{ fontWeight: "light" }}
            >
              Tired of visiting touristy places and want to explore off the
              beaten track in Rajasthan? Visit Banswara – the greenest city of
              Rajasthan.
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Read More....</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default BodyContent;
