const router = require("express").Router();

const {
  getSingleThought,
  getThoughts,
  createThought,
  createReaction,
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts).post(createThought);
router.route("/:_id").get(getSingleThought);
router.route("/:_id/reactions").post(createReaction);
module.exports = router;
