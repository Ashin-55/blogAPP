const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose")

const userRouter = require("./routes/userRouter");
const authorRouter = require("./routes/authorRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/", userRouter);
app.use("/author", authorRouter);
app.use("/admin", adminRouter);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log("create error middleware");
  next(createError(404));
});
//error handler
app.use((err, req, res, next) => {
  console.log("err handler");
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  //render the errorr page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.port || 3500;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
