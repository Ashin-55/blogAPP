import { Container, Grid } from "@mui/material";
import React from "react";
import RegisterComp from "../../Components/Register/RegisterComp";

function UserSignup() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth='md'>
          <RegisterComp />
        </Container>
      </Grid>
    </Grid>
  );
}

export default UserSignup;
