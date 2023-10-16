const express = require("express");
const router = express.Router();

const {
	register,
	login,
	avatar,
	getAllUsers,
	addFriend,
	getAllFriends,
} = require("../controllers/usersController");

router.post("/register", register);
router.post("/login", login);
router.post("/avatar", avatar);
router.get("/allusers/:id", getAllUsers);
router.post("/addfriend", addFriend);
router.get("/getallfriends/:id", getAllFriends);

module.exports = router;
