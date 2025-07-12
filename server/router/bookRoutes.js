const express = require("express");
const { addBooks,updateBooks,deleteBooks,getAllBooks,getBooklimit,getBookById} = require("../controller/booksController");
const authenticateToken = require("./UserAuth");
const router = express.Router();



//create Book
router.post('/addbook/:id',authenticateToken,addBooks);
router.put('/addbook/:id/:bookId',authenticateToken,updateBooks);
router.delete('/addbook/:id/:bookId',authenticateToken,deleteBooks);
router.get('/addbook',getAllBooks);
router.get('/add',getBooklimit);
router.get('/add/:id',getBookById);
module.exports = router;
