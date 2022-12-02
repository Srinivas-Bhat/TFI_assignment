const express = require("express");
const httperror = require("http-errors");
const morgan = require("morgan");
const connection = require("./db")
const authRouter = require("./Routes/auth.route");
const volunteerRouter = require("./Routes/volunteer.route");
const cors = require("cors");


const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
// app.use(morgan("dev"));
app.use("/auth", authRouter);
app.use("/volunteer", volunteerRouter);
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use((req, res, next) => {
  next(httperror.NotFound());
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).send(err);
});

app.listen(8000, async () => {
  try {
    await connection;
    console.log(`Connecting to the database is Successfull 8000`);
  } catch (err) {
    console.log(err);
  }
  console.log("server started");
});
