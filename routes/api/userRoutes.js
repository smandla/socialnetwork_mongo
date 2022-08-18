const router = require("express").Router();

const {
  getSingleUser,
  getUsers,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");
router.route("/").get(getUsers).post(createUser);
router.route("/:_id").get(getSingleUser).delete(deleteUser);
router.route("/:_id/friends/:friendsId").post(addFriend).delete(deleteFriend);
module.exports = router;
