import { Container, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  mainRoot: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INTIAL_FORM_STATE = {};
const FORM_VALIDATION = Yup.object().shape({});

const RegisterComp = () => {
  const classes = useStyle();
  return (
    <div className={classes.mainRoot}>
      <Formik
        initialValues={{ ...INTIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log("the form data is ", values);
        }}
      >
        <Form>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography></Typography>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterComp;
