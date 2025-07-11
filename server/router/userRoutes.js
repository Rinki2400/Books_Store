const express = require("express");
const { signup, signin ,getUser,getUserById,updateById} = require("../controller/userController");
const { addBooks} = require("../controller/booksController");
const authenticateToken = require("./UserAuth");
const router = express.Router();

// create user
router.post("/signup", signup);
// login user
router.post("/signin",signin );
// get all use
router.get("/users",authenticateToken, getUser);
//get all user by id
router.get("/users/:id",authenticateToken, getUserById);
//update address by id
router.put("/users/:id",authenticateToken, updateById);



//create Book
router.post('/addbook/:id',authenticateToken,addBooks);
module.exports = router;
