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
module.exports = { getThoughts };
