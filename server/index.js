require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");
const path = require("path");
// PORT
const port = 3001;

const { getUser, logout } = require(`${__dirname}/controllers/usersCtrl`);
const {
  getProducts,
  addToCart
} = require(`${__dirname}/controllers/productsCtrl`);

// CONNECTING DATABASE WITH MASSIVE
massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));

// APP DECLARATION
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(json());

// SESSION MIDDLWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000
    }
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientSecret: process.env.CLIENT_SECRET,
      clientID: process.env.CLIENT_ID,
      callbackURL: "/auth"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      console.log(profile);
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .addUserByAuthId([profile.id, profile.displayName])
              .then(res => done(null, res[0]));
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

// EDIT USER
passport.serializeUser((user, done) => {
  done(null, user);
});

// PUT USER ON REQ OBJECT AS REQ.USER
passport.deserializeUser((user, done) => {
  done(null, user);
});

// ENDPOINTS

app.get("/api/products", getProducts);
app.get("/api/cart");
app.post("/api/cart/:id", addToCart);

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "/auth"
  })
);

// LISTENING ON PORT
app.listen(port, () => {
  console.log(`Listening for da wae on port: ${port}.`);
});
