import { Container, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { red } from "@mui/material/colors";

const useStyles = makeStyles({
  footer: {
    width: "100%",
    justifyContent: "Center",
  },
});
const FooterComp = () => {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth='xl' sx={{ backgroundColor: "grey" }}>
          <Typography align='center'>footer</Typography>
        </Container>
      </footer>
    </div>
  );
};

export default FooterComp;
