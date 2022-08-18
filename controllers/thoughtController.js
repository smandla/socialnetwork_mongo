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

const deleteThought = (req, res) => {
  Thoughts.findOneAndDelete({ _id: req.params._id }).then((thought) => {
    if (!thought) {
      res.status(404).json({ message: "No thought w that id" });
    }
    return User.findOneAndUpdate(
      { thoughts: req.params._id },
      { $pull: { thoughts: req.params._id } },
      { new: true }
    )
      .then((user) => {
        if (user) {
          res.json({ message: "Thought successfully deleted" });
        } else {
          return res.status(404).json({ message: "no user with this id" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};

const createReaction = (req, res) => {
  console.log(req.params._id);
  Thoughts.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        reactions: req.body,
      },
    },
    { runValidators: true, new: true }
  )
    .then((thought) => {
      console.log(thought);
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({ message: "No thought w this id" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const deleteReaction = (req, res) => {
  console.log(req.params._id, req.params.reactionId);
  Thoughts.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with this id!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};
module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  createReaction,
  deleteReaction,
  deleteThought,
};
