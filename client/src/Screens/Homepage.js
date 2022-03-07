import React from "react";
import Header from "../Components/navbar/Header";
import BodyContent from "../Components/Body/BodyContent";
import FooterComp from "../Components/Footer/FooterComp";
import { Grid } from "@mui/material";

const Homepage = () => {
  return (
    <div>
      <Header />
      {/* <Grid container spacing={2}>
        <BodyContent />
      </Grid> */}
      <FooterComp/>
    </div>
  );
};

export default Homepage;
