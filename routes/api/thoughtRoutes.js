const router = require("express").Router();

const {
  getSingleUser,
  getThoughts,
  createUser,
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts);
// router.route("/:_id").get(getSingleUser);
module.exports = router;
