const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//use local db or production ...
const db = process.env.DATABASE_URL
  ? knex({
      client: "pg",
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      },
    })
  : knex({
      client: "pg",
      connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "postgres",
        database: "smartbrain",
      },
    });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

//windows, set env variable: $env:PORT="2020"
