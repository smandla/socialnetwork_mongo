const { User } = require("../models");
const getUsers = (req, res) => {
  User.find({})
    .populate("thoughts")
    .select("-__v")
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const getSingleUser = (req, res) => {
  User.findOne({ _id: req.params._id })
    .populate("thoughts")
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};
module.exports = { getUsers, getSingleUser };
/**
 * app.get("/api/users", (req, res) => {
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
    .populate({ path: "Thoughts" })
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

// app.put("/api/users/:_id", (req, res) => {
//   User.findOneAndUpdate({_id: req.params._id}, );
// });

//TODO: bonus user's associated thoughts are also deleted
app.delete("/api/users/:_id", (req, res) => {
  User.findOneAndDelete({ _id: req.params._id }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  });
});
 */
