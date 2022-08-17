const { Thoughts } = require("../models");
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
module.exports = { getThoughts, getSingleThought };
