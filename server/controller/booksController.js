const books = require("../model/bookModel");
const userdetail = require("../model/userModel"); // import user model if not already
//add books
const addBooks = async (req, res) => {
  try {
    const { id } = req.params; 

    const user = await userdetail.findById(id);

    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied. Only Admin can add books.",
      });
    }

    const bookData = req.body;
    const newBook = new books(bookData);
    const savedBook = await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: savedBook,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update book
const updateBooks = async (req, res) => {
  try {
    const { id, bookId } = req.params; 
    const updateData = req.body;
    const user = await userdetail.findById(id);
    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied! Only admin can update books.",
      });
    }
    const updatedBook = await books.findByIdAndUpdate(bookId, updateData, {
      new: true, 
      runValidators: true, 
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { addBooks, updateBooks};



