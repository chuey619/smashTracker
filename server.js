//libraries
const express = require("express"),
  logger = require("morgan"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  flash = require("connect-flash");

//route handlers
const usersRouter = require("./routes/usersRouter"),
  authRouter = require("./routes/authRouter"),
  matchesRouter = require("./routes/matchesRouter");

// app config
const app = express();
require("dotenv").config();

//use libs
app.use(flash());
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//session stuff
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//set up views and static pages
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

//set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT),
  () => {
    console.log(`server started on port ${PORT}`);
  };

//ROUTES----

//index
app.get("/", (req, res) => {
  res.render("index");
});
//user routes
app.use("/users", usersRouter);

//auth routes
app.use("/auth", authRouter);

//matches routes
app.use("/matches", matchesRouter);

//catch
app.use("*", (req, res) => {
  res.status(404).send({
    error: "youre in the wrong place bud",
  });
});

app.use((err, req, res, next) => {
  res.status(404).send({ err, message: err.message });
});
