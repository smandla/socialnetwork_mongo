const { Thoughts, User } = require("../models");
const getThoughts = (req, res) => {
  Thoughts.find({}, (err, result) => {
    if (result) {
      console.log(result);
      res.status(200).json(result);
    } else {
      res.status(500).json(err);
    }
  });
};
const getSingleThought = (req, res) => {
  Thoughts.findOne({ _id: req.params._id })
    .populate("reactions")
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
};

//TODO: push created thought's id to associated user's thoughts
const createThought = (req, res) => {
  Thoughts.create(req.body)
    .then((thought) => {
      console.log(thought);
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((user) => {
      console.log(user);
      if (user) {
        res.json({ message: "successfully created thought" });
      } else {
        res.status(404).json({ message: "no user with this thought!" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// const createReaction = (req, res) => {
//     Thoughts.
// }
module.exports = { getThoughts, getSingleThought, createThought };
