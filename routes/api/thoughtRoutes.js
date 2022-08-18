const router = require("express").Router();

const {
  getSingleThought,
  getThoughts,
  createThought,
  createReaction,
  deleteReaction,
  deleteThought,
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts).post(createThought);
router.route("/:_id").get(getSingleThought).delete(deleteThought);
router.route("/:_id/reactions").post(createReaction);
router.route("/:_id/reactions/:reactionId").delete(deleteReaction);
module.exports = router;
