const router = require("express").Router();

const {
  getSingleUser,
  getUsers,
  createUser,
} = require("../../controllers/userController");
router.route("/").get(getUsers);
router.route("/:_id").get(getSingleUser);
module.exports = router;
