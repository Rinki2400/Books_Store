const express = require("express");
const authenticateToken = require("./UserAuth");
const {addBooksToFab} = require("../controller/orderController.js")
const router = express.Router();



//add book to favour
router.put('/add/:id/:BookId',authenticateToken, addBooksToFab)

module.exports = router;
