const { User, Thoughts } = require("../models");
const getUsers = (req, res) => {
  User.find()
    .populate({ path: "thoughts", select: "_id" })
    .populate("friends")
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
    .select("-__v")
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};
const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};
const deleteUser = (req, res) => {
  //   console.log(req.params._id);
  User.findOneAndDelete({ _id: req.params._id })
    .then((user) => {
      console.log(user);
      !user
        ? res.status(404).json({ message: "No user w that id" })
        : Thoughts.deleteMany({
            _id: { $in: user.thoughts },
          });
      res.status(200).json({ message: "Sucessfully deleted" });
    })
    .catch((err) => res.status(500).json(err));
};

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "no user with this id" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
};
const addFriend = (req, res) => {
  console.log("USERID", req.params._id);
  console.log("friendsID", req.params.friendsId);
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $push: { friends: req.params.friendsId } },
    { runValidators: true, new: true }
  )
    .then((user) => {
      console.log("idfvcnief");
      console.log(user);
      if (!user) {
        res.status(404).json({ message: "no user with this id" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(500).json(err));
};

const deleteFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: { friends: req.params.friendsId } },
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.json({ message: "Friend successfully deleted" });
      } else {
        return res.status(404).json({ message: "no user with this id" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
  updateUser,
};
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
