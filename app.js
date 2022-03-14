require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const { env } = require("process");
var createError = require("http-errors");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var experiencesRouter = require("./routes/experiences");
var skillsRouter = require("./routes/skills");
var infoRouter = require("./routes/info");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));

mongoose
  .connect(process.env.URL, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully to the Database");
  })
  .catch(console.error);

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/skills", skillsRouter);
app.use("/experiences", experiencesRouter);
app.use("/info", infoRouter);

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

// Undefined routes error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
