const router = require("express").Router();

const {
  getSingleThought,
  getThoughts,
  createUser,
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts);
router.route("/:_id").get(getSingleThought);
module.exports = router;
