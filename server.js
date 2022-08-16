const express = require("express");

const db = require("./config/connection");

const { User } = require("./models");

const PORT = 3005;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET all users (DONE)
app.get("/api/users", (req, res) => {
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  });
});

//GET single user
//TODO: populate thoughts and friends
app.get("/api/users/:_id", (req, res) => {
  User.findOne({ _id: req.params._id })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

//POST user
app.post("/api/users", (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
      return res.status(500).json(err);
    });
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("API server running on port ");
  });
});
