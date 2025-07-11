const express = require("express");
const { signup, signin ,getUser,getUserById,updateById} = require("../controller/userController");
const authenticateToken = require("./UserAuth");
const router = express.Router();

// create user
router.post("/signup", signup);
// login user
router.post("/signin",signin );
// get all use
router.get("/users",authenticateToken, getUser);
router.get("/users/:id",authenticateToken, getUserById);
router.put("/users/:id", updateById);
module.exports = router;
